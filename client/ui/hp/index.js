const model = require('../../model/ui');

module.exports = class HP {

    constructor(value, max) {
        this.dom = document.createElement('div');
        this.dom.className = 'hp_container';
        this.hpValue = document.createElement('div');
        this.hpValue.className = 'hp_value';
        this.dom.appendChild(this.hpValue);
        this.value = 0;

        const label = document.createElement('div');
        label.className = 'label';
        this.label = label;
        this.dom.appendChild(label);
        this.update(value, max );


    }

    update(value, max) {
        value = Math.min(max, value);
        if(this.value !== value) {
            this.value = value;
            this.hpValue.style.width = this.value/max * 100 + '%';
            this.label.textContent = 'HP : ' +this.value;
        }
    }

};