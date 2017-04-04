const ee = require('./eventEmitter');
module.exports = class AudioPlayer {

    constructor(){

        this.dom = document.createElement('div');
        this.dom.className = 'audio';

        this.player1 = new Audio();

        this.player2 = new Audio();

        window.pp = this.player1;

        ee.on('play1', url=> {
            this.player1.src = url;
            this.player1.play();
        });
        ee.on('play2', url=> {
            this.player2.src = url;
            this.loop = true;
            this.player1.play();
        });

    }

}
