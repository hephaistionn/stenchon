const type = require('./actionType');

module.exports = {
    hp: 100,
    power:100,
    level: 2,
    name: 'Lieutenant Macron',
    slogan: 'Marche ou crève',
    sound:'assets/start8.wav',
    soundDead:'assets/kill2.wav',
    states: [
        {
            name: 'wait',
            url: 'assets/macron/wait.png',
            size: 100,
            rotation: 0,
            duration: 2500
        },
        {
            name: 'attack0',
            url: 'assets/macron/attack0.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'attack1',
            url: 'assets/macron/attack1.png',
            size: 100,
            rotation: 10,
            duration: 200
        },
        {
            name: 'hurted',
            url: 'assets/macron/hurted.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'start',
            url: 'assets/macron/start.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'healer',
            url: 'assets/macron/healer.png',
            size: 100,
            rotation: 0,
            duration: 200
        }
    ],
    actions: [
        {
            name: 'Sondage',
            type: type.marketing,
            cost: 80,
            desc: 'Attaque de type marketing',
            damage: 20,
            state: 2,
            probability: 0.65,
            duration: 3000,
            sound:'assets/sepcial1.wav'
        },
        {
            name: 'Je suis d\'accord',
            type: type.marketing,
            cost: 65,
            desc: 'Attaque de type marketing',
            damage: 15,
            state: 1,
            probability: 0.5,
            duration: 3000,
            sound:'assets/kick1.wav'
        },
        {
            name: 'C\'est notre projet !!!',
            type: type.hysterie,
            cost: 70,
            desc: 'Attaque de type hysterie',
            damage: 15,
            state: 2,
            probability: 0.3,
            duration: 3000,
            sound:'assets/kick1.wav'
        },
        {
            name: 'Ni droite, ni gauche, juste libéral',
            type: type.renforcement,
            cost: 80,
            desc: 'Attaque de type renforcement',
            damage: 30,
            state: 1,
            probability: 0,
            duration: 3000,
            sound:'assets/kick1.wav'
        }
    ],
    waiting: [
        {
            probability: 1,
            state: 0
        }
    ],
    hurted: 3,
    focus: 0,
    start: 4,
    weakness: {
        personnel: 1,
        conviction: 1,
        politique: 1.2,
        marketing: 0.8
    }
};