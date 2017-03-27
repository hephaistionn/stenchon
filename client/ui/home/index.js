const model = require('../../model/ui');

module.exports = class Home {

    constructor(cb) {
        this.dom = document.createElement('div');
        this.dom.className = 'home_background';

        const container = document.createElement('div');
        container.className = 'home_container';
        this.dom.appendChild(container);

        const title = document.createElement('div');
        title.className = 'home_title';
        title.textContent = model.home.title;
        container.appendChild(title);

        const desc = document.createElement('div');
        desc.className = 'home_desc';
        desc.textContent = model.home.description;
        container.appendChild(desc);

        const picture = document.createElement('div');
        picture.className = 'home_picture';
        container.appendChild(picture);

        const button = document.createElement('div');
        button.className = 'home_button';
        button.textContent = model.home.buttonLabel;
        button.onclick = cb;
        container.appendChild(button);

        this._down = (event)=> {
            if(event.keyCode === 13) {
                cb();
            }
        };
        document.addEventListener('keydown', this._down)
    }

    onRemoved() {
        document.removeEventListener('keydown', this._down);
    }

};