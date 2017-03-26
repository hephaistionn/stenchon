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
        this.ia = new IA();
        this._onPushAction = ()=> {
        };
        this._onDestroy = ()=> {
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
        this.remove(this.home);
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
    }

    cleanEvents() {
        ee.off('pushAction', this._onPushAction);
        ee.off('destroy', this._onDestroy);
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

