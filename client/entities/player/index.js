const Menu = require('../../ui/menu/index.js');


module.exports = class Player {

    constructor(model) {
        this.dom = document.createElement('div');
        this.dom.className = 'player';

        this.menu = new Menu(this.setAttack.bind(this), model);
        this.dom.appendChild(this.menu.dom);

        const spriteContainer = document.createElement('div');
        spriteContainer.className = 'player_sprite_container';
        this.dom.appendChild(spriteContainer);

        this.sprite = document.createElement('div');
        this.sprite.className = 'player_sprite';
        spriteContainer.appendChild(this.sprite);

        this.attackCB = null;
        this.selectCB = null;
        this.destroyCB = null;

        this.currentState = null;
        this.currentTarget = 0;
        this.currentAttack = null;

        this.timer = 0;
        this.recoveryDuration = 5000;
        this.recovery = Math.random() * this.recoveryDuration;
        this.hp = model.hp;
        this.willpower = model.willpower;
        this.focusState = model.focus;
        this.states = model.states;
        this.weakness = model.weakness;
        this.hurtedState = model.hurted;
        this.regenerationState = model.regeneration;
        this.waitingStates = model.waiting;

        this.waiting();


    }

    onAttack(cb) {
        this.attackCB = cb;
    }

    onSelect(cb) {
        this.selectCB = cb;
    }

    onDestroy(cb) {
        this.destroyCB = cb;
    }

    setAttack(attack) {
        if (this.willpower >= attack.cost) {
            this.currentAttack = attack;
            this.currentTarget = 0;
            this.setState(this.states[this.focusState]);
            this.selectCB(attack);
            this.menu.updateAtbStatus(false);
        }
    }

    setTarget(index) {
        this.currentTarget = index;
    }

    attack() {
        this.willpower -= this.currentAttack.cost;
        this.setState(this.states[this.currentAttack.state]);
        this.attackCB(this.currentAttack.damage, this.currentAttack.type, this.currentTarget);
        this.currentAttack = null;
        this.recovery = 0;
    }

    hurted(damage, type) {
        const factor = this.weakness[type];
        this.hp -= factor * damage;
        this.setState(this.states[this.hurtedState]);
        if (this.hp < 1) {
            this.destroyCB()
        }
    }

    regeneration(value) {
        this.willpower += value;
        this.setState(this.states[this.regenerationState]);
        this.currentAttack = null;
        this.recovery = 0;
        this.menu.updateAtbStatus(false);
    }

    setState(state) {
        const style = 'url(%1)';
        this.sprite.style.backgroundImage = style.replace('%1', state.picture);
        this.sprite.style.size = state.size + '%';
        this.currentState = state;
        this.timer = 0;
    }

    waiting() {
        const randomValue = Math.random() * this.waitingStates.length;
        const waitingTarget = this.waitingStates.filter((state)=> {
            return state.probability >= randomValue;
        })[0];
        this.setState(this.states[waitingTarget.state]);
    }

    update(dt) {

        if (this.timer > this.currentState.duration) {
            this.waiting();
        }
        this.timer += dt;
        this.recovery += dt;
        this.recovery = Math.min(this.recoveryDuration, this.recovery);
        this.menu.updateAtb(this.recovery / this.recoveryDuration);
        if (this.recovery === this.recoveryDuration && !this.currentAttack) {
            this.menu.updateAtbStatus(true);
        }
    }

};