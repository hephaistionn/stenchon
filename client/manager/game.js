const Player = require('../entities/player');
const Mob = require('../entities/mob');
const Home = require('../ui/home');
const Modal = require('../ui/modal');
const modelMobs = require('../model/mobs');
const modelPlayer = require('../model/player');


module.exports = class Manager {

    constructor() {
        this.dom = document.getElementById('game');
        this.mobs = [];
        this.goHome();
        this.level = 0;
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
    }

    clear() {
        for(let i = 0; i < this.mobs.length; i++) {
            this.remove(this.mobs[i]);
        }
        this.remove(this.home);
        this.remove(this.player);
    }

    loop(dt) {
        this.player.update(dt);
        for(let i = 0; i < this.mobs.length; i++) {
            this.mobs[i].update(dt);
        }
        this.spanwner();
    }


    spanwner() {
        if(!this.mobs.length) {
            const mobs = modelMobs.timeline[this.level];
            this.level++;
            if(mobs.length) {
                mobs.forEach(index => {
                    this.newMob(modelMobs.mobs[index]);
                });
            } else {
                this.win();
            }
        }
    }

    newPlayer() {
        this.player = new Player(modelPlayer);
        this.player.onDestroy(()=> {
            this.player.onRemoved();
            this.remove(this.player);
            this.lose();
        });
        this.player.onSelect((action)=> {
            if(action.type === 'conviction') {
                this.player.regeneration(action);
            }
            for(let i = 0; i < this.mobs.length; i++) {
                this.mobs[i].clickable(true);
            }
        });
        this.player.onAttack((damage, type, index)=> {
            this.mobs[index].hurted(damage, type);
            for(let i = 0; i < this.mobs.length; i++) {
                this.mobs[i].clickable(false);
            }
        });
        this.add(this.player);
    }

    newMob(model) {
        const mob = new Mob(model);
        mob.onDestroy(()=> {
            const index = this.mobs.indexOf(mob);
            this.mobs.splice(index, 1);
            mob.onRemoved();
            this.remove(mob);
            this.stopLoop();
        });
        mob.onAttack((damage, type)=> {
            this.player.hurted(damage, type);
        });
        mob.onSelected(()=> {
            const index = this.mobs.indexOf(mob);
            this.player.setTarget(index);
            this.player.attack();
        });

        this.mobs.push(mob);
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
        };
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


    add(componant) {
        if(!componant) return;
        this.dom.appendChild(componant.dom);
    }

    remove(componant) {
        if(!componant) return;
        this.dom.removeChild(componant.dom);
    }

};

