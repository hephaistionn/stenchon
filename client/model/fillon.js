const type = require('./actionType');

module.exports = {
    hp: 100,
    power:100,
    name: 'Jean François Fripon',
    slogan: 'The White Walker',
    sound:'assets/start10.wav',
    soundDead:'assets/kill1.wav',
    states: [
        {
            name: 'waiting',
            url: 'assets/fillon/wait.png',
            size: 100,
            rotation: 0,
            duration: 2500
        },
        {
            name: 'attack0',
            url: 'assets/fillon/attack0.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'attack1',
            url: 'assets/fillon/attack1.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'attack2',
            url: 'assets/fillon/attack2.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'hurted',
            url: 'assets/fillon/hurted.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'start',
            url: 'assets/fillon/start.png',
            size: 100,
            rotation: 0,
            duration: 2000
        }
    ],
    actions: [
        {
            name: 'Trocadero',
            type: type.renforcement,
            cost: 100,
            desc: 'Renforcement' ,
            damage: 15,
            state: 3,
            probability: 0.8,
            duration: 2000,
            sound:'assets/troca.wav'
        },
        {
            name: 'Victimisation',
            type: type.defense,
            cost: 100,
            desc: 'Augmentation de la défense',
            damage: 1.3,
            state: 1,
            probability: 0.75,
            duration: 3000,
            sound:'assets/star4.wav'
        },
        {
            name: 'Annonce apocalyptique',
            type: type.conviction,
            cost: 50,
            desc: 'Attaque de type conviction',
            damage: 15,
            state: 2,
            probability: 0.5,
            duration: 3000,
            sound:'assets/kick0.wav'
        },
        {
            name: 'Cupabilisation du peuple',
            type: type.manipulation,
            cost: 50,
            desc: 'Attaque de type manipulation',
            damage: 20,
            state: 2,
            probability: 0,
            duration: 3000,
            sound:'assets/kick0.wav'
        }
    ],
    waiting: [
        {
            probability: 1,
            state: 0
        }
    ],
    hurted: 4,
    focus: 3,
    start: 5,
    weakness: {
        personnel: 0.8,
        conviction: 1,
        politique: 1,
        marketing: 1
    }
};