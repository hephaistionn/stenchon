module.exports = class Name {

    constructor(label) {
        this.dom = document.createElement('div');
        this.dom.className = 'name_ui';
        this.dom.textContent = label;
    }

};