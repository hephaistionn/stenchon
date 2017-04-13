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
        this.recovery = 0.9 * this.recoveryDuration;
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
        this.level = model.level;
        this.actions = model.actions;
        this.actionByLevel = model.actionByLevel;
        this.hpByLevel = model.hpByLevel;

        this.waiting();
        this.atbUI = new ATB(this.recovery, this.recoveryDuration);
        this.dom.appendChild(this.atbUI.dom);
        this.hpUI = new HP(this.hp, this.hpMax);
        this.dom.appendChild(this.hpUI.dom);
        this.menu = new Menu(model);
        this.dom.appendChild(this.menu.dom);
        this.menu.close();
        this.disabled = false;
        this.nameUI = new Name(this.name);
        this.dom.appendChild(this.nameUI.dom);

        this.labelDamage = document.createElement('div');
        this.labelDamage.className = 'damage';
        this.dom.appendChild(this.labelDamage);

        this.labelWeakness = document.createElement('div');
        this.labelWeakness.className = 'weakness';
        this.dom.appendChild(this.labelWeakness);

        this.labelLevel = document.createElement('div');
        this.labelLevel.className = 'level';
        this.labelLevel.textContent = 'N.' + this.level;
        this.dom.appendChild(this.labelLevel);

        this.startAnimationComing();

    }

    updateLevel(level) {
        this.level = level;
        this.labelLevel.textContent = 'N.' + this.level;
        const actions = this.actionByLevel[this.level];
        this.menu.updateContent(actions.map(index=> {
            return this.actions[index];
        }));
        this.hpMax = this.hpByLevel[this.level];
        this.hp = this.hpMax;
        this.hpUI.update(this.hp, this.hpMax);
    }

    startAction(currentAction) {
        if(currentAction)
            this.currentAction = currentAction;
        this.setState(this.states[this.currentAction.state]);
        this.startAnimationAttack();
    }

    affected(action) {
        this.labelDamage.className = 'damage show';
        if(action.type === type.renforcement) {
            this.labelDamage.textContent = '+ ' + action.damage + 'HP';
            this.hp += action.damage;
            this.hp = Math.min(this.hpMax, this.hp);
            this.hpUI.update(this.hp, this.hpMax);
            this.setState(this.states[action.state]);
            this.startAnimationStriken();
        } else {
            const factor = this.weakness[type[action.type]];
            this.labelDamage.textContent = '- ' + (factor * action.damage) + 'HP';
            this.hp -= factor * action.damage;
            if(factor !== 1) {
                this.labelWeakness.className = 'weakness show';
                this.labelWeakness.textContent = factor > 1 ? 'résistance' : 'faiblesse';
            }
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
        this.recovery += dt / 50;
        this.recovery = Math.min(this.recoveryDuration, this.recovery);
        this.atb = this.recovery / this.recoveryDuration;
        this.atbUI.update(this.recovery, this.recoveryDuration);
        if(this.atb === 1 && this.ready === false) {
            this.ready = true;
            ee.emit('play4', 'assets/open.mp3');
            this.menu.open();
        }


    }

    startAnimationStriken() {
        this.sprite.className = this.sprite.className.replace(' stricken', '');
        this.sprite.className += ' stricken';
        this.timerStriken = setTimeout(()=> {
            this.labelDamage.className = 'damage';
            this.labelWeakness.className = 'weakness';
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