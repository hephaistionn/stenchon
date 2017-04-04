const Player = require('../entities/player');
const Decor = require('../entities/decor');
const Mob = require('../entities/mob');
const Home = require('../ui/home');
const Modal = require('../ui/modal');
const Action = require('../ui/action');
const modelMobs = require('../model/mobs');
const modelUi = require('../model/ui');
const type = require('../model/actionType');
const modelPlayer = require('../model/player');
const ee = require('./eventEmitter');
const IA = require('./ia');
const Audio = require('./audio');

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
        this.pause = false;
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

        this.audio = new Audio();
        this.add(this.audio);
        ee.emit('play2','assets/music2.mp3')
    }

    goHome() {
        this.clear();
        this.home = new Home(this.startGame.bind(this));
        this.add(this.home);
    }

    startGame() {
        ee.emit('play3','assets/begin.wav');
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
        if(this.decor)
            this.remove(this.decor);
        if(this.action_ui)
            this.remove(this.action_ui);
        this.home = null;
        this.decor = null;
        this.action_ui = null;
    }

    loop(dt) {
        if(this.pause) return;
        this.spawner();
        for(let i = 0; i < this.entities.length; i++) {
            this.entities[i].update(dt);
        }
        this.unwrapActions();
    }

    spawner() {
        if(this.entities.length === 1 && this.entities[0].isPlayer) {
            const mobs = modelMobs.timeline[this.level];
            this.level++;
            if(mobs && mobs.length) {
                let modelMob = [];
                let ctn = 0;
                mobs.forEach(index => {
                    this.newMob(modelMobs.mobs[index], ctn, mobs.length);
                    ctn++;
                    modelMob.push(modelMobs.mobs[index]);
                });
                this.pause = true;
                this.decor.startBattle(modelMob, modelPlayer, ()=> {
                    this.pause = false;
                });
            } else {
                this.win();
            }
        }
    }

    newPlayer() {
        this.decor = new Decor();
        this.action_ui = new Action();
        this.add(this.decor);
        this.add(this.action_ui);
        this.player = new Player(modelPlayer);
        this.entities.push(this.player);
        this.add(this.player);
        this.ia.setPlayer(this.player);


    }

    newMob(model, index, nbMob) {
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
        this.pause = true;
        this.stopLoop();
        const modal = new Modal(modelUi.lose.title, modelUi.lose.desc, 'retry', ()=> {
            this.remove(modal);
            this.startGame();
        });
        this.add(modal);
    }

    win() {
        this.pause = true;
        this.stopLoop();
        const modal = new Modal(
            modelUi.victory.title, modelUi.victory.desc,
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

        this._onSelectAction = action=> {
            if(action.type === type.renforcement || action.type === type.defense) return;
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
            this.pause = true;
            const instruction = this.queue.shift();
            instruction.onStart(instruction.target, instruction.action);
            this.decor.startAtttack();
            this.busy = true;
            this.action_ui.displayAction(instruction.action, instruction.source);
            this.timer = setTimeout(()=> {
                instruction.onFinish();
                this.busy = false;
                this.pause = false;
            }, instruction.action.duration)
        }
    }

    onDestroy(entity) {
        this.currentFocus = 0;
        const index = this.entities.indexOf(entity);
        if(entity === -1) return;
        this.remove(entity);
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

