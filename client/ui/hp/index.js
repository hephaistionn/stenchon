const model = require('../../model/ui');

module.exports = class HP {

    constructor(value) {
        this.dom = document.createElement('div');
        this.dom.className = 'hp_container';
        this.hpValue = document.createElement('div');
        this.hpValue.className = 'hp_value';
        this.dom.appendChild(this.hpValue);
        this.value = 0;
        this.update(value);

        const label = document.createElement('div');
        label.className = 'label';
        label.textContent = model.hp;
        this.dom.appendChild(label);
    }

    update(value) {
        value = Math.min(1, value);
        if(this.value !== value) {
            this.value = value;
            this.hpValue.style.width = this.value * 100 + '%';
        }
    }

};