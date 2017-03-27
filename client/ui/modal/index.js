module.exports = class Modal {

    constructor(text, buttonLabel1, cb1, buttonLabel2, cb2) {
        this.dom = document.createElement('div');
        this.dom.className = 'modal_background';

        const container = document.createElement('div');
        container.className = 'modal_container';
        this.dom.appendChild(container);


        const header = document.createElement('div');
        header.className = 'modal_header';
        container.appendChild(header);

        const desc = document.createElement('div');
        desc.className = 'modal_desc';
        desc.textContent = text;
        container.appendChild(desc);


        const button1 = document.createElement('div');
        button1.className = buttonLabel2 ? 'modal_button right' : 'modal_button center';
        button1.textContent = buttonLabel1;
        button1.onclick = cb1;
        button1.className += ' focus';
        container.appendChild(button1);

        let button2;
        if(buttonLabel2) {
            button2 = document.createElement('div');
            button2.className = 'modal_button left ';
            button2.textContent = buttonLabel2;
            button2.onclick = cb2;
            container.appendChild(button2);
        }

        this.currentButton = 0;

        this._down = (event)=> {
            button1.className = button1.className.replace(' focus', '');
            button2.className = button2.className.replace(' focus', '');
            if(event.keyCode === 13) {
                this.currentButton ? cb2() : cb1();
            } else if(event.keyCode === 37) {
                this.currentButton = 0;
                button1.className += ' focus';
            } else if(event.keyCode === 39 && button2) {
                this.currentButton = 1;
                button2.className += ' focus';
            }
        };
        document.addEventListener('keydown', this._down)
    }

    onRemoved() {
        document.removeEventListener('keydown', this._down);
    }

};