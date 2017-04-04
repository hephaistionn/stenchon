const ee = require('../../manager/eventEmitter');

module.exports = class Action {

    constructor() {
        this.dom = document.createElement('div');
        this.dom.className = 'action_ui';

        this.actionName = document.createElement('div');
        this.actionName.className = 'action_name';
        this.dom.appendChild(this.actionName);

        this.actionDesc = document.createElement('div');
        this.actionDesc.className = 'action_desc';
        this.dom.appendChild(this.actionDesc);
    }

    displayAction(action, entity) {
        this.actionName.textContent = action.name;
        this.actionDesc.textContent = action.desc;
        this.dom.className += ' show';
        if(action.sound)
        ee.emit('play1',action.sound);

        this.timerStriken = setTimeout(()=> {
            this.dom.className = 'action_ui';
        }, action.duration - 200);
    }

};