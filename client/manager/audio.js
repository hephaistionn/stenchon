const ee = require('./eventEmitter');
module.exports = class AudioPlayer {

    constructor(){

        this.dom = document.createElement('div');
        this.dom.className = 'audio';

        const button = document.createElement('div');
        button.className = 'sound_button';
        button.onclick = () => {
            if(this.player2.paused){
                this.player2.play();
                button.className = 'sound_button';
            }else{
                this.player2.pause();
                button.className = 'sound_button active';
            }
        };
        this.dom.appendChild(button);

        this.player1 = new Audio();

        this.player2 = new Audio();

        this.player3 = new Audio();

        this.player4 = new Audio();

        ee.on('play1', url=> {
            this.player1.src = url;
            this.player1.play();
            //this.player1.volume = 0;
        });
        ee.on('play2', (url, loop)=> {
            this.player2.src = url;
            this.player2.loop = loop;
            this.player2.volume = 0.2;
            this.player2.play();
            //this.player2.volume = 0;
        });

        ee.on('play3', url=> {
            this.player3.src = url;
            this.player3.play();
            //this.player3.volume = 0;
        });

        ee.on('play4', url=> {
            this.player4.src = url;
            this.player4.play();
            //this.player4.volume = 0;
        });

    }

}
