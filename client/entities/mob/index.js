const HP = require('../../ui/hp/index.js');
const ATB = require('../../ui/atb/index.js');
const Name = require('../../ui/name/index.js');
const type = require('../../model/actionType');
const ee = require('../../manager/eventEmitter');

module.exports = class Mob {

    constructor(model, index, nbMob) {

        this.dom = document.createElement('div');

        this.dom.className = 'mob n' + index + '  m' + nbMob;

        this.sprite = document.createElement('div');
        this.sprite.className = 'sprite';
        this.dom.appendChild(this.sprite);
        this.dom.onclick = () => {
            if(this.selectable) {
                ee.emit('selectTarget', this);
            }
        };

        this.dom.onmouseover = () => {
            if(this.selectable) {
                ee.emit('onFocus', this);
            }
        };

        const pointer = document.createElement('div');
        pointer.className = 'pointer';
        this.dom.appendChild(pointer);

        this.initEvents();

        this.currentState = null;
        this.timer = 0;
        this.recoveryDuration = model.power;
        this.recovery = Math.random() * 0.5 * this.recoveryDuration;
        this.atb = this.recovery / this.recoveryDuration;
        this.hp = model.hp;
        this.hpMax = model.hp;
        this.states = model.states;
        this.weakness = model.weakness;
        this.hurtedState = model.hurted;
        this.startState = model.start;
        this.focusState = model.focus;
        this.waitingStates = model.waiting;
        this.actions = model.actions;
        this.currentAction = null;
        this.currentTarget = null;
        this.selectable = false;
        this.disabled = false;
        this.name = model.name;

        this.waiting();

        this.atbUI = new ATB(this.atb, true);
        this.dom.appendChild(this.atbUI.dom);
        this.hpUI = new HP(this.hp);
        this.dom.appendChild(this.hpUI.dom);
        const nameUI = new Name(this.name);
        this.dom.appendChild(nameUI.dom);


        this.startAnimationComing();
    }

    focus() {
        if(!this.selectable) return;
        this.dom.className = this.dom.className.replace(' focus', '');
        this.dom.className += ' focus';
    }

    blur() {
        this.dom.className = this.dom.className.replace(' focus', '');
    }

    startAction(currentAction) {
        if(currentAction)
            this.currentAction = currentAction;
        this.recovery -= this.currentAction.cost;
        this.recovery = Math.max(0, this.recovery);
        this.setState(this.states[this.currentAction.state]);
        this.startAnimationAttack();
    }

    affected(action) {
        if(action.type === type.renforcement) {
            this.hp += action.value;
            this.setState(this.states[action.state]);
            this.startAnimationStriken();
        } else if(action.type === type.defense) {
            if(!this.weakness.updated)
                Object.keys(this.weakness).map((objectKey) => {
                    this.weakness[objectKey] = this.weakness[objectKey] + 0.2;
                });

            this.weakness.updated = true;
            this.setState(this.states[action.state]);
            this.startAnimationStriken();
        } else {
            const factor = this.weakness[type[action.type]];
            this.hp -= factor * action.damage;
            this.hp = Math.max(this.hp, 0);
            this.hpUI.update(this.hp / this.hpMax);
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
        if(this.timer > this.currentState.duration) {
            this.waiting();
        }
        this.timer += dt;
        if(this.currentAction) return;
        this.recovery += dt / 100;
        this.recovery = Math.min(this.recoveryDuration, this.recovery);
        this.atb = this.recovery / this.recoveryDuration;
        this.atbUI.update(this.atb);

        if(this.atb === 1) {
            ee.emit('entityReady', this);
        }
    }

    startAnimationStriken() {
        this.sprite.className = this.sprite.className.replace(' stricken', '');
        this.sprite.className += ' stricken';
        this.timerAnimation = setTimeout(()=> {
            this.sprite.className = this.sprite.className.replace(' stricken', '');
        }, 1000)
    }

    startAnimationAttack() {
        this.dom.className = this.dom.className.replace(' attack', '');
        this.dom.className += ' attack';
        this.timerAnimation = setTimeout(()=> {
            this.dom.className = this.dom.className.replace(' attack', '');
        }, 1000)
    }

    startAnimationComing() {
        this.setState(this.states[this.startState]);
        this.dom.className = this.dom.className.replace(' coming', '');
        this.dom.className += ' coming';
        this.timerAnimation = setTimeout(()=> {
            this.dom.className = this.dom.className.replace(' coming', '');
        }, 100);
    }

    startAnimationDestroy(cb) {
        this.dom.className = this.dom.className.replace(' destroyed', '');
        this.dom.className += ' destroyed';
        this.timerAnimation = setTimeout(()=> {
            this.dom.className = this.dom.className.replace(' destroyed', '');
            cb();
        }, 1000)
    }

    destroy() {
        this.disabled = true;
        this.timerAnimation = setTimeout(()=> {
            this.startAnimationDestroy(()=> {
                ee.emit('destroy', this);
            });
        }, 1000);
    }

    selectAction(action, target) {
        this.currentAction = action;
        this.currentTarget = target;
        this.pushAction();
    }

    initEvents() {
        this._onSelectAction = (action) => {
            if(action.type === type.renforcement || action.type === type.defense) return;
            this.dom.className = this.dom.className.replace(' selectable', '');
            this.dom.className += ' selectable';
            this.selectable = true;
        };
        this._onSelectTarget = () => {
            this.dom.className = this.dom.className.replace(' selectable', '');
            this.selectable = false;
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
                }
            });
        }
    }

    onRemoved() {
        clearTimeout(this.timerAnimation);
        ee.off('selectAction', this._onSelectAction);
        ee.off('selectTarget', this._onSelectTarget);
    }

};