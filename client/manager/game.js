const Player = require('../entities/player');
const Mob = require('../entities/mob');
const Home = require('../ui/home');
const Modal = require('../ui/modal');
const modelMobs = require('../model/mobs');
const modelPlayer = require('../model/player');
const ee = require('./eventEmitter');
const IA = require('./IA');

module.exports = class Manager {

    constructor() {
        this.dom = document.getElementById('game');
        this.entities = [];
        this.level = 0;
        this.queue = [];
        this.busy = false;
        this.currentFocus = 0;
        this.selectMob = false;
        this.ia = new IA();
        this._onPushAction = ()=> {
        };
        this._onDestroy = ()=> {
        };
        this._onFocus = ()=> {
        };
        this._down = ()=> {
        };
        this._onSelectAction = ()=> {
        };
        this.goHome();
    }

    goHome() {
        this.clear();
        this.home = new Home(this.startGame.bind(this));
        this.add(this.home);
    }

    startGame() {
        this.clear();
        this.newPlayer();
        this.startLoop();
        this.initEvents();
    }

    clear() {
        this.cleanEvents();
        for(let i = 0; i < this.entities.length; i++) {
            this.remove(this.entities[i]);
        }
        this.entities = [];
        this.level = 0;
        this.queue = [];
        this.busy = false;
        this.currentFocus = 0;
        if(this.home)
            this.remove(this.home);
        this.home = null;
    }

    loop(dt) {
        for(let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(dt);
        }
        this.spawner();
        this.unwrapActions();
    }

    spawner() {
        if(this.entities.length === 1 && this.entities[0].isPlayer) {
            const mobs = modelMobs.timeline[this.level];
            this.level++;
            if(mobs && mobs.length) {
                mobs.forEach(index => {
                    this.newMob(modelMobs.mobs[index], index, mobs.length);
                });
            } else {
                this.win();
            }
        }
    }

    newPlayer() {
        this.player = new Player(modelPlayer);
        this.entities.push(this.player);
        this.add(this.player);
        this.ia.setPlayer(this.player);
    }

    newMob(model, nbMob, index) {
        const mob = new Mob(model, index, nbMob);
        this.entities.push(mob);
        this.add(mob);
    }

    startLoop() {
        let time;
        let that = this;

        function update() {
            that.requestAnimation = requestAnimationFrame(update);
            const now = new Date().getTime();
            const dt = now - (time || now);
            time = now;
            Math.min(dt, 500);
            that.loop(dt);
        }

        update();
    }

    stopLoop() {
        cancelAnimationFrame(this.requestAnimation);
    }

    lose() {
        this.stopLoop();
        debugger;
        const modal = new Modal('game is loosed', 'retry', ()=> {
            this.remove(modal);
            this.startGame();
        });
        this.add(modal);
    }

    win() {
        this.stopLoop();
        const modal = new Modal(
            'game is won',
            'retry', ()=> {
                this.remove(modal);
                this.startGame();
            }, 'back',
            ()=> {
                this.remove(modal);
                this.goHome();
            }
        );

        this.add(modal);
    }

    updateFocus() {
        this.entities.forEach(entity=> {
            if(entity.blur)entity.blur()
        });
        this.entities[this.currentFocus + 1].focus();
    }

    blurAll() {
        this.entities.forEach(entity=> {
            if(entity.blur)entity.blur()
        });
    }

    initEvents() {
        this._onPushAction = instruction => {
            this.addInQueue(instruction);
        };
        this._onDestroy = entity => {
            this.onDestroy(entity);
        };
        ee.on('pushAction', this._onPushAction);
        ee.on('destroy', this._onDestroy);
        this.queue = [];


        this._onFocus = entity => {
            this.entities.forEach(entityz=> {
                if(entityz.blur)entityz.blur();
            });
            entity.focus();
        };
        ee.on('onFocus', this._onFocus);

        this._down = (event)=> {
            if(!this.selectMob)return;
            if(event.keyCode === 38) {
                this.currentFocus--;
                this.currentFocus = Math.max(0, this.currentFocus);
                this.updateFocus();
                event.preventDefault();
            } else if(event.keyCode === 40) {
                this.currentFocus++;
                this.currentFocus = Math.min(this.currentFocus, this.entities.length - 2);
                this.updateFocus();
                event.preventDefault();
            } else if(event.keyCode === 13) {
                ee.emit('selectTarget', this.entities[this.currentFocus + 1]);
                this.selectMob = false;
                this.blurAll();
                event.preventDefault();
            }

        };

        document.addEventListener('keydown', this._down);

        this._onSelectAction = ()=> {
            this.selectMob = true;
            this.currentFocus = 0;
            this.updateFocus();
        };
        ee.on('selectAction', this._onSelectAction);
    }

    cleanEvents() {
        ee.off('pushAction', this._onPushAction);
        ee.off('destroy', this._onDestroy);
        ee.off('onFocus', this._onFocus);
        ee.off('selectAction', this._onSelectAction);
        document.removeEventListener('keydown', this._down);
        clearTimeout(this.timer);
    }

    addInQueue(instruction) {
        this.queue.push(instruction);
        instruction.onPrepare();
    }

    unwrapActions() {
        if(this.queue.length && this.busy === false) {
            const instruction = this.queue.shift();
            instruction.onStart(instruction.target, instruction.action);
            this.busy = true;
            this.timer = setTimeout(()=> {
                instruction.onFinish();
                this.busy = false;
            }, instruction.action.duration)
        }
    }

    onDestroy(entity) {
        this.currentFocus = 0;
        this.remove(entity);
        const index = this.entities.indexOf(entity);
        this.entities.splice(index, 1);
        if(entity.isPlayer) {
            this.stopLoop();
            this.lose();
        }
    }

    add(componant) {
        if(!componant) return;
        this.dom.appendChild(componant.dom);
    }

    remove(componant) {
        if(!componant) return;
        if(componant.onRemoved)componant.onRemoved();
        this.dom.removeChild(componant.dom);
    }

};

