module.exports = class Mob {

    constructor(model) {
        this.dom = document.createElement('div');
        this.dom.className = 'mob';

        const spriteContainer = document.createElement('div');
        spriteContainer.className = 'mob_sprite_container';
        this.dom.appendChild(spriteContainer);

        this.sprite = document.createElement('div');
        this.sprite.className = 'mob_sprite';
        spriteContainer.appendChild(this.sprite);
        spriteContainer.onclick = () => {
            this.selectedCB();
        };

        this.attackCB = null;
        this.selectedCB = null;
        this.destroyCB = null;

        this.currentState = null;
        this.currentTarget = 0;

        this.timer = 0;
        this.recoveryDuration = 5000;
        this.recovery = Math.random() * this.recoveryDuration;
        this.hp = model.hp;
        this.willpower = model.willpower;
        this.states = model.states;
        this.weakness = model.weakness;
        this.hurtedState = model.hurted;
        this.regenerationState = model.regeneration;
        this.waitingStates = model.waiting;
        this.actions = model.actions;

        this.waiting();
    }

    onAttack(cb) {
        this.attackCB = cb;
    }

    onSelected(cb) {
        this.selectedCB = cb;
    }

    onDestroy(cb) {
        this.destroyCB = cb;
    }

    setAttack(attack) {
        if (this.willpower >= attack.cost) {
            this.willpower -= attack.cost;
            this.setState(this.states[attack.state]);
            this.attackCB(attack.damage, attack.type);
            this.recovery = 0;
        }
    }

    hurted(damage, type) {
        const factor = model.weakness[type];
        this.hp -= factor * damage;
        this.setState(this.states[this.hurtedState]);
        if (this.hp < 1) {
            this.destroyCB()
        }
    }

    regeneration(value) {
        this.willpower += value;
        this.setState(this.states[this.regenerationState]);
        this.recovery = 0;
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
        if (this.recovery === this.recoveryDuration) {
            const randomValue = Math.random() * this.actions.length;
            const action = this.actions.filter((state)=> {
                return state.probability >= randomValue;
            })[0];
            this.setAttack(action);
        }

    }

    clickable(enabled) {
        this.dom.className.replace(' selectable', '');
        if (enabled) {
            this.dom.className += ' selectable';
        }
    }

};