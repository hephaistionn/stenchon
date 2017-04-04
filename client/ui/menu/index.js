const ee = require('../../manager/eventEmitter');

module.exports = class Menu {

    constructor(model) {
        this.dom = document.createElement('div');
        this.dom.className = 'menu';

        this.container = document.createElement('div');
        this.container.className = 'menu_container';
        this.dom.appendChild(this.container);

        this.opened = false;

        this.actions = model.actions;

        this.actions.forEach(action => {
            const button = document.createElement('div');
            button.className = 'menu_button';
            button.textContent = action.name + ' '+action.cost+ 'MP' ;
            button.onclick = ()=> {
                ee.emit('selectAction', action);
            };

            button.onmouseover = () => {
                this.container.childNodes.forEach(node=> {
                    node.className = 'menu_button';
                });
                button.className = 'menu_button focus';
            };

            const pointer = document.createElement('div');
            pointer.className = 'pointer';
            button.appendChild(pointer);

            this.container.appendChild(button);
        });
    }

    close() {
        if(this.opened) {
            this.opened = false;
            this.container.className = 'menu_container';
            this.cleanEvents();
        }
    }

    open() {
        if(this.opened === false) {
            this.opened = true;
            this.currentfocus = 0;
            this.container.className = 'menu_container opened';
            this.initEvents();
            this.updateFocus();
        }
    }

    updateFocus() {
        this.container.childNodes.forEach(node=> {
            node.className = 'menu_button';
        });
        ee.emit('play1','assets/bip.wav');
        this.container.childNodes[this.currentfocus].className = 'menu_button  focus';
    }

    initEvents() {
        this.currentfocus = 0;
        this._down = (event)=> {
            if(event.keyCode === 38) {
                this.currentfocus--;
                this.currentfocus = Math.max(0, this.currentfocus);
                event.preventDefault();
            } else if(event.keyCode === 40) {
                this.currentfocus++;
                this.currentfocus = Math.min(this.currentfocus, this.actions.length - 1);
                event.preventDefault();
            } else if(event.keyCode === 13) {
                ee.emit('selectAction', this.actions[this.currentfocus]);
                event.preventDefault();
            }
            this.updateFocus();
        };
        document.addEventListener('keydown', this._down);
    }

    cleanEvents() {
        document.removeEventListener('keydown', this._down);
    }

    onRemoved() {
        this.cleanEvents();
    }


};