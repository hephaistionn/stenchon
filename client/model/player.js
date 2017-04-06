const type = require('./actionType');
module.exports = {
    hp: 100,
    power: 100,
    name: 'Mélenchon',
    slogan: 'Can\'t stenchon the Melenchon',
    states: [
        {
            name: 'wait',
            url: 'assets/melenchon/wait.png',
            size: 100,
            rotation: 0,
            duration: 2000
        },
        {
            name: 'focus',
            url: 'assets/melenchon/focus.png',
            size: 100,
            rotation: 0,
            duration: 1000000
        },
        {
            name: 'attack0',
            url: 'assets/melenchon/attack0.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'attack1',
            url: 'assets/melenchon/attack1.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'attack2',
            url: 'assets/melenchon/attack2.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'hurted',
            url: 'assets/melenchon/hurted.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'healer',
            url: 'assets/melenchon/healer.png',
            size: 100,
            rotation: 0,
            duration: 200
        }
    ],
    actions: [
        {
            name: 'Eveil des consciences',
            type: type.conviction,
            desc: 'Attaque de type politique',
            damage: 15,
            cost: 33,
            state: 2,
            duration: 3000,
            sound:'assets/kick0.wav'
        },
        {
            name: 'VIeme République',
            type: type.politique,
            desc: 'Attaque de type politique',
            damage: 30,
            cost: 50,
            state: 3,
            duration: 3000,
            sound:'assets/kick1.wav'
        },
        {
            name: 'Punchline',
            type: type.personnel,
            desc: 'Attaque de type lyrique',
            damage: 30,
            cost: 50,
            state: 4,
            duration: 3000,
            sound:'assets/kick2.wav'
        },
        {
            name: 'Pudeur de gazelle',
            type: type.politique,
            desc: 'Attaque de type lyrique',
            damage: 35,
            cost: 66,
            state: 2,
            duration: 3000,
            sound:'assets/special2.wav',
            sound2:'assets/debat-pudeur-de-gazelle.mp3'
        },
        {
            name: 'Indignation',
            type: type.conviction,
            desc: 'Attaque de type politique',
            damage: 35,
            cost: 66,
            state: 3,
            duration: 3000,
            sound:'assets/kick1.wav'
        },
        {
            name: 'Culture et Géopolitique',
            type: type.politique,
            desc: 'Attaque de type politique',
            damage: 40,
            cost: 75,
            state: 4,
            duration: 3000,
            sound:'assets/kick3.wav'
        },
        {
            name: 'Soutien du peuple',
            type: type.renforcement,
            desc: 'Régénération',
            damage: 100,
            cost: 100,
            state: 6,
            duration: 3000,
            sound:'assets/start7.wav'
        }
    ],
    waiting: [
        {
            probability: 1,
            state: 0
        }
    ],
    focus: 1,
    hurted: 5,
    weakness: {
        manipulation: 1,
        personnel: 1,
        conviction: 1,
        marketing: 1,
        physique: 1,
        politique: 1,
        hysterie: 0.8,
        ps: 1.2,
        renforcement:100
    }
};