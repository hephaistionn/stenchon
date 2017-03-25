const model = require('../../model/ui');

module.exports = class ATB {

    constructor(value) {
        this.dom = document.createElement('div');
        this.dom.className = 'atb_container';

        this.progress = document.createElement('div');
        this.progress.className = 'atb_value';
        this.dom.appendChild(this.progress);
        this.value = 0;

        this.update(value);
    }

    update(value) {
        value = Math.min(1, value);
        if(this.value !== value) {
            this.value = value;
            this.progress.style.width = this.value * 100 + '%';
            this.progress.className = this.value === 1 ? 'atb_value ready' : 'atb_value';
        }
    }

};