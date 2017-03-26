const ee = require('../../manager/eventEmitter');

module.exports = class Menu {

    constructor(model) {
        this.dom = document.createElement('div');
        this.dom.className = 'menu';

        this.container = document.createElement('div');
        this.container.className = 'menu_container';
        this.dom.appendChild(this.container);

        this.opened = false;

        model.actions.forEach(action => {
            const button = document.createElement('div');
            button.className = 'menu_button';
            button.textContent = action.name;
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
        }
    }

    open() {
        if(this.opened === false) {
            this.opened = true;
            this.container.className = 'menu_container opened';
        }
    }

};