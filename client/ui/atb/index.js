const model = require('../../model/ui');

module.exports = class ATB {

    constructor(value, direction) {
        this.dom = document.createElement('div');
        this.dom.className = 'atb_container';

        this.progress = document.createElement('div');
        this.progress.className = 'atb_value';
        this.progress.style.width = '100%';
        this.dom.appendChild(this.progress);
        this.value = 0;
        this.direction = direction;

        this.update(value);
    }

    update(value) {
        value = Math.min(1, value);
        if(this.value !== value) {
            this.value = value;
            const offset = this.direction ? (100 - this.value * 100) : (this.value * 100 - 100);
            this.progress.style.transform = 'translateX(' + offset + '% )';
            this.progress.className = this.value === 1 ? 'atb_value ready' : 'atb_value';
        }
    }

};