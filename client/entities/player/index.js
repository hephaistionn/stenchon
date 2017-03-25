const Menu = require('../../ui/menu/index.js');
const HP = require('../../ui/hp/index.js');
const ATB = require('../../ui/atb/index.js');

module.exports = class Player {

    constructor(model) {

        this.dom = document.createElement('div');
        this.dom.className = 'player';

        this.sprite = document.createElement('div');
        this.sprite.className = 'sprite';
        this.dom.appendChild(this.sprite);

        this.attackCB = null;
        this.selectCB = null;
        this.destroyCB = null;

        this.currentState = null;
        this.currentTarget = 0;
        this.currentAction = null;

        this.timer = 0;
        this.recoveryDuration = 5000;
        this.recovery = Math.random() * this.recoveryDuration;
        this.hp = model.hp;
        this.atb = this.recovery / this.recoveryDuration;
        this.hpMax = model.hp;
        this.willpower = model.willpower;
        this.focusState = model.focus;
        this.states = model.states;
        this.weakness = model.weakness;
        this.hurtedState = model.hurted;
        this.regenerationState = model.regeneration;
        this.waitingStates = model.waiting;

        this.waiting();

        this.atbUI = new ATB(this.atb);
        this.dom.appendChild(this.atbUI.dom);
        this.hpUI = new HP(this.hp);
        this.dom.appendChild(this.hpUI.dom);
        this.menu = new Menu(this.setAction.bind(this), model);
        this.dom.appendChild(this.menu.dom);


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

    setAction(action) {
        if(this.willpower >= action.cost) {
            this.currentAction = action;
            this.currentTarget = 0;
            this.setState(this.states[this.focusState]);
            this.selectCB(action);
        }
    }

    setTarget(index) {
        this.currentTarget = index;
    }

    attack() {
        this.willpower -= this.currentAction.cost;
        this.setState(this.states[this.currentAction.state]);
        this.attackCB(this.currentAction.damage, this.currentAction.type, this.currentTarget);
        this.recovery = 0;
        this.startAnimationAttack();
    }

    hurted(damage, type) {
        const factor = this.weakness[type];
        this.hp -= factor * damage;
        this.hp = Math.max(this.hp, 0);
        this.hpUI.update(this.hp / this.hpMax);
        this.startAnimationStriken();
        this.setState(this.states[this.hurtedState]);
        if(this.hp < 1) {
            this.destroyCB()
        }
    }

    regeneration(action) {
        this.willpower += action.value;
        this.setState(this.states[this.regenerationState]);
        this.currentAction = action;
        this.recovery = 0;
    }

    setState(state) {
        const style = 'url(%1)';
        this.sprite.style.backgroundImage = style.replace('%1', state.url);
        this.sprite.style.size = state.size + '%';
        this.currentState = state;
        this.timer = 0;
    }

    waiting() {
        this.currentAction = null;
        const randomValue = Math.random() * this.waitingStates.length;
        const waitingTarget = this.waitingStates.filter((state)=> {
            return state.probability >= randomValue;
        })[0];
        this.setState(this.states[waitingTarget.state]);
    }

    update(dt) {

        if(this.timer > this.currentState.duration) {
            this.waiting();
        }
        this.timer += dt;
        if(this.currentAction) return;
        this.recovery += dt;
        this.recovery = Math.min(this.recoveryDuration, this.recovery);
        this.atb = this.recovery / this.recoveryDuration;
        this.atb === 1 ? this.menu.open() : this.menu.close();
        this.atbUI.update(this.atb);
    }

    startAnimationStriken() {
        this.sprite.className = this.sprite.className.replace(' stricken', '');
        this.sprite.className += ' stricken';
        this.timerStriken = setTimeout(()=> {
            this.sprite.className = this.sprite.className.replace(' stricken', '');
        }, 1000)
    }

    startAnimationAttack() {
        this.dom.className = this.dom.className.replace(' attack', '');
        this.dom.className += ' attack';
        this.timerStriken = setTimeout(()=> {
            this.dom.className = this.dom.className.replace(' attack', '');
        }, 1000)
    }

    onRemoved() {
        clearTimeout(this.timerStriken);
    }

};