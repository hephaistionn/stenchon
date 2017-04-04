const Menu = require('../../ui/menu/index.js');
const HP = require('../../ui/hp/index.js');
const ATB = require('../../ui/atb/index.js');
const Name = require('../../ui/name/index.js');
const type = require('../../model/actionType');
const ee = require('../../manager/eventEmitter');

module.exports = class Player {

    constructor(model) {

        this.isPlayer = true;

        this.dom = document.createElement('div');
        this.dom.className = 'player';

        this.sprite = document.createElement('div');
        this.sprite.className = 'sprite';
        this.dom.appendChild(this.sprite);

        this.currentAction = null;
        this.currentTarget = null;
        this.currentState = null;
        this.initEvents();

        this.timer = 0;
        this.recoveryDuration = model.power;
        this.recovery = Math.random() * this.recoveryDuration;
        this.hp = model.hp;
        this.atb = this.recovery / this.recoveryDuration;
        this.hpMax = model.hp;
        this.focusState = model.focus;
        this.states = model.states;
        this.weakness = model.weakness;
        this.hurtedState = model.hurted;
        this.waitingStates = model.waiting;
        this.ready = false;
        this.name = model.name;

        this.waiting();

        this.atbUI = new ATB(this.atb);
        this.dom.appendChild(this.atbUI.dom);
        this.hpUI = new HP(this.hp, this.hpMax);
        this.dom.appendChild(this.hpUI.dom);
        this.menu = new Menu(model);
        this.dom.appendChild(this.menu.dom);
        this.menu.close();
        this.disabled = false;
        const nameUI = new Name(this.name);
        this.dom.appendChild(nameUI.dom);

        this.startAnimationComing();

    }

    startAction(currentAction) {
        if(currentAction)
            this.currentAction = currentAction;
        this.setState(this.states[this.currentAction.state]);
        this.startAnimationAttack();
    }

    affected(action) {
        if(action.type === type.renforcement) {
            this.hp += action.damage;
            this.hp = Math.min(this.hpMax, this.hp);
            this.hpUI.update(this.hp, this.hpMax);
            this.setState(this.states[action.state]);
            this.startAnimationStriken();
        } else {
            const factor = this.weakness[type[action.type]];
            this.hp -= factor * action.damage;
            this.hp = Math.max(this.hp, 0);
            this.hpUI.update(this.hp, this.hpMax);
            this.startAnimationStriken();
            this.setState(this.states[this.hurtedState]);
            if(this.hp < 1) {
                this.destroy();
            }
        }
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
        if(this.disabled)return;
        if(this.currentAction) return;
        if(this.timer > this.currentState.duration) {
            this.waiting();
        }
        this.timer += dt;
        if(this.currentAction) return;
        this.recovery += dt / 65;
        this.recovery = Math.min(this.recoveryDuration, this.recovery);
        this.atb = this.recovery / this.recoveryDuration;
        this.atbUI.update(this.atb);
        if(this.atb === 1 && this.ready === false) {
            this.ready = true;
            this.menu.open();
        }


    }

    startAnimationStriken() {
        this.sprite.className = this.sprite.className.replace(' stricken', '');
        this.sprite.className += ' stricken';
        this.timerStriken = setTimeout(()=> {
            this.sprite.className = this.sprite.className.replace(' stricken', '');
        }, 1000);
    }

    startAnimationAttack() {
        this.dom.className = this.dom.className.replace(' attack', '');
        this.dom.className += ' attack';
        this.timerStriken = setTimeout(()=> {
            this.dom.className = this.dom.className.replace(' attack', '');
        }, 1000);
    }

    startAnimationComing() {
        this.dom.className = this.dom.className.replace(' comingRight', '');
        this.dom.className += ' comingRight';
        this.timerAnimation = setTimeout(()=> {
            this.dom.className = this.dom.className.replace(' comingRight', '');
        }, 2500);
    }

    startAnimationDestroy(cb) {
        this.dom.className = this.dom.className.replace(' destroyed', '');
        this.dom.className += ' destroyed';
        this.timerAnimation = setTimeout(()=> {
            this.dom.className = this.dom.className.replace(' destroyed', '');
            cb();
        }, 1000);
    }

    destroy() {
        this.disabled = true;
        this.startAnimationDestroy(()=> {
            ee.emit('destroy', this);
        });
    }

    initEvents() {
        this._onSelectAction = action  => {
            this.currentAction = action;
            this.recovery -= this.currentAction.cost;
            this.recovery = Math.max(0, this.recovery);
            if(this.currentAction.type === type.renforcement || this.currentAction.type === type.defense) {
                this.currentTarget = this;
            }
            this.menu.close();
            this.pushAction();
        };
        this._onSelectTarget = target  => {
            this.currentTarget = target;
            this.pushAction();
        };
        ee.on('selectAction', this._onSelectAction);
        ee.on('selectTarget', this._onSelectTarget);
    }

    pushAction() {
        if(this.currentAction && this.currentTarget) {
            ee.emit('pushAction', {
                action: this.currentAction,
                target: this.currentTarget,
                source: this,
                onPrepare: () => {
                    this.setState(this.states[this.focusState]);
                },
                onStart: (target, action) => {
                    this.startAction(action);
                    target.affected(action);
                },
                onFinish: ()=> {
                    this.currentAction = null;
                    this.currentTarget = null;
                    this.ready = false;
                }
            });
        }
    }

    onRemoved() {
        clearTimeout(this.timerStriken);
        ee.off('selectAction', this._onSelectAction);
        ee.off('selectTarget', this._onSelectTarget);
        this.menu.onRemoved();
    }

};