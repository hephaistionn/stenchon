const ee = require('../../manager/eventEmitter');

module.exports = class Menu {

    constructor(model) {
        this.dom = document.createElement('div');
        this.dom.className = 'menu';

        this.container = document.createElement('div');
        this.container.className = 'menu_container';
        this.dom.appendChild(this.container);
        this.limit = 0;
        this.opened = false;

    }


    updateContent(actions) {
        this.actions = actions;
        while(this.container.firstChild) {
            this.container.removeChild(this.container.firstChild);
        }
        this.actions.forEach(action => {
            const button = document.createElement('div');
            button.className = 'menu_button';
            if(action.limit){
                button.onclick = ()=> {
                    if(button.limit > 0){
                        button.limit--;
                        button.firstChild.textContent = action.name + ' ('+button.limit+')';
                        ee.emit('play4', 'assets/bip.wav');
                        ee.emit('selectAction', action);
                        if(button.limit ===0){
                            button.className += ' disabled';
                        }
                    }
                };
            }else{
                button.onclick = ()=> {
                    ee.emit('play4', 'assets/bip.wav');
                    ee.emit('selectAction', action);
                };
            }

            const buttonContent1 = document.createElement('div');
            buttonContent1.className = 'button_content1';
            if(action.limit){
                button.limit = action.limit;
                buttonContent1.textContent = action.name + ' ('+action.limit+')';
            }else{
                buttonContent1.textContent = action.name;
            }


            button.appendChild(buttonContent1);

            const buttonContent2 = document.createElement('div');
            buttonContent2.className = 'button_content2';
            buttonContent2.textContent = action.cost + 'MP/' + action.damage + 'DEG';
            button.appendChild(buttonContent2);

            button.onmouseover = () => {
                this.container.childNodes.forEach(node=> {
                    node.className = node.className.replace(' focus', '');
                });
                button.className += ' focus';
                ee.emit('play1', 'assets/bip.wav');
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
            node.className = node.className.replace(' focus', '');
        });
        this.container.childNodes[this.currentfocus].className += ' focus';
    }

    initEvents() {
        this.currentfocus = 0;
        this._down = (event)=> {
            if(event.keyCode === 38) {
                if(this.currentfocus !== 0) {
                    ee.emit('play4', 'assets/bip.wav');
                }
                this.currentfocus--;
                this.currentfocus = Math.max(0, this.currentfocus);
                event.preventDefault();
                this.updateFocus();
            } else if(event.keyCode === 40) {
                if(this.currentfocus !== this.actions.length - 1) {
                    ee.emit('play4', 'assets/bip.wav');
                }
                this.currentfocus++;
                this.currentfocus = Math.min(this.currentfocus, this.actions.length - 1);
                event.preventDefault();
                this.updateFocus();
            } else if(event.keyCode === 13 || event.keyCode === 32) {
                event.preventDefault();
                this.container.childNodes[this.currentfocus].onclick();
            }
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