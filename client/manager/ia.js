const ee = require('./eventEmitter');

module.exports = class IA {

    constructor() {
        ee.on('entityReady', entity=> {
            const randomValue = Math.random() * entity.actions.length;
            const action = entity.actions.filter((state)=> {
                return state.probability >= randomValue;
            })[0];
            entity.selectAction(action, this.player);
        })

    }

    setPlayer(player) {
        this.player = player;
    }

};