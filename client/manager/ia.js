const ee = require('./eventEmitter');
const type = require('../model/actionType');

module.exports = class IA {

    constructor() {
        ee.on('entityReady', entity=> {
            const randomValue = Math.random();
            const action = entity.actions.filter((state)=> {
                return randomValue >= state.probability;
            })[0];
            const target = action.type === type.defense || action.type === type.renforcement ? entity : this.player;
            if(this.player.hp > 0)
            entity.selectAction(action, target);
        });

    }

    setPlayer(player) {
        this.player = player;
    }

};