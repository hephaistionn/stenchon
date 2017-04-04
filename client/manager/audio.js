const ee = require('./eventEmitter');
module.exports = class AudioPlayer {

    constructor(){

        this.dom = document.createElement('div');
        this.dom.className = 'audio';

        this.player1 = new Audio();

        this.player2 = new Audio();

        this.player3 = new Audio();

        ee.on('play1', url=> {
            this.player1.src = url;
            this.player1.play();
        });
        ee.on('play2', url=> {
            this.player2.src = url;
            this.player2.loop = true;
            this.player2.volume = 0.5;
            this.player2.play();
        });

        ee.on('play3', url=> {
            this.player3.src = url;
            this.player3.play();
        });

    }

}
