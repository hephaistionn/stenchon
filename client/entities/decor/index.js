module.exports = class Decor {

    constructor() {
        this.dom = document.createElement('div');
        this.dom.className = 'decor';
        const dom = this.dom;


        this.bastille = document.createElement('div');
        this.bastille.className = 'bastille';
        this.dom.appendChild(this.bastille);

        this.citoyen = document.createElement('div');
        this.citoyen.className = 'citoyen';
        this.dom.appendChild(this.citoyen);

        this.fx1 = document.createElement('div');
        this.fx1.className = 'fx1';
        this.dom.appendChild(this.fx1);

        this.fx2 = document.createElement('div');
        this.fx2.className = 'fx2';
        this.dom.appendChild(this.fx2);

        this.tagPlayer = prepareTag('tagPlayer');
        this.tagMob0 = prepareTag('tagMob v0');
        this.tagMob1 = prepareTag('tagMob v1');

        function prepareTag(className) {
            const container = document.createElement('div');
            container.className = className;
            const name = document.createElement('div');
            name.className = 'name';
            container.appendChild(name);
            const tag = document.createElement('div');
            tag.className = 'tag';
            container.appendChild(tag);
            dom.appendChild(container);
            return container;
        }
    }

    startBattle(mobs, modelPlayer, cb) {
        this.fx1.className = 'fx1 anim';
        this.tagPlayer.children[0].textContent = modelPlayer.name;
        this.tagPlayer.children[1].textContent = modelPlayer.slogan;
        this.tagPlayer.className = this.tagPlayer.className.replace(' show', '');

        this.tagMob0.children[0].textContent = mobs[0].name;
        this.tagMob0.children[1].textContent = mobs[0].slogan;
        this.tagMob0.className = this.tagMob0.className.replace(' show', '');

        if(mobs[1]) {
            this.tagMob1.children[0].textContent = mobs[1].name;
            this.tagMob1.children[1].textContent = mobs[1].slogan;
            this.tagMob1.className = this.tagMob1.className.replace(' show', '');

        }

        this.timerStriken = setTimeout(()=> {
            this.tagPlayer.className += ' show';
            this.tagMob0.className += ' show';
            if(mobs[1]) {
                this.tagMob1.className += ' show';
            }
        }, 100);

        this.timerStriken = setTimeout(()=> {
            this.fx1.className = this.fx1.className.replace(' anim', '');
            this.tagPlayer.className = this.tagPlayer.className.replace(' show', '');
            this.tagMob0.className = this.tagMob0.className.replace(' show', '');
            this.tagMob1.className = this.tagMob1.className.replace(' show', '');
            cb();
        }, 3500);
    }

    startAtttack() {
        this.fx2.className = 'fx2 anim';
        this.timerStriken = setTimeout(()=> {
            this.fx2.className = this.fx2.className.replace(' anim', '');
        }, 1000);
    }

};