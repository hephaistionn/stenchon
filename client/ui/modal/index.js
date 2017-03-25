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


        const button = document.createElement('div');
        button.className = buttonLabel2 ? 'modal_button right' : 'modal_button center';
        button.textContent = buttonLabel1;
        button.onclick = cb1;
        container.appendChild(button);

        if(buttonLabel2) {
            const button2 = document.createElement('div');
            button2.className = 'modal_button left ';
            button2.textContent = buttonLabel2;
            button2.onclick = cb2;
            container.appendChild(button2);
        }

    }

};