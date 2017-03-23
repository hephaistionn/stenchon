module.exports = class Menu {

    constructor(cb, model) {
        this.dom = document.createElement('div');
        this.dom.className = 'menu';

        this.container = document.createElement('div');
        this.container.className = 'menu_container';
        this.dom.appendChild(this.container);

        model.actions.forEach(action => {
            const button = document.createElement('div');
            button.className = 'menu_button';
            button.textContent = action.name;
            button.onclick = ()=> {
                cb(action)
            };
            this.container.appendChild(button);
        });

        this.atb = document.createElement('div');
        this.atb.className = 'menu_atb';
        this.dom.appendChild(this.atb);

        this.progress = document.createElement('div');
        this.progress.className = 'menu_atb_progress';
        this.atb.appendChild(this.progress);

        this.ready = false;
    }

    updateAtb(value) {
        this.progress.style.width = value * 100 + '%';
    }

    updateAtbStatus(ready) {
        if (this.ready !== ready) {
            this.atb.className = ready ? 'menu_atb ready' : 'menu_atb';
            this.container.className = ready ? 'menu_container ready' : 'menu_container';
            this.ready = ready;
        }

    }

};