const type = require('./actionType');

module.exports = {
    hp: 100,
    power:100,
    name: 'Président Général Valls',
    slogan: 'Rassemblement des pouvoirs, exécutif, législatif et judiciaire',
    soundDead:'assets/kill0.wav',
    states: [
        {
            name: 'wait',
            url: 'assets/valls/wait.png',
            size: 100,
            rotation: 0,
            duration: 2500
        },
        {
            name: 'attack0',
            url: 'assets/valls/attack0.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'attack1',
            url: 'assets/valls/attack1.png',
            size: 100,
            rotation: 10,
            duration: 200
        },
        {
            name: 'hurted',
            url: 'assets/valls/hurted.png',
            size: 100,
            rotation: 0,
            duration: 200
        }
    ],
    actions: [
        {
            name: 'Attaque de la justice',
            type: type.politique,
            cost: 80,
            desc: 'Attaque de type politique',
            damage: 20,
            state: 1,
            probability: 0.8,
            duration: 3000,
            sound:'assets/kick1.wav'
        },
        {
            name: 'Trahison',
            type: type.ps,
            cost: 3000,
            desc: 'Attaque de type PS',
            damage: 22,
            state: 2,
            probability: 0.5,
            duration: 3000,
            sound:'assets/kick1.wav'
        },
        {
            name: '49.3',
            type: type.politique,
            cost: 70,
            desc: 'Attaque de type politique',
            damage: 15,
            state: 2,
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
    start: 0,
    weakness: {
        personnel: 1,
        conviction: 1.2,
        politique: 1,
        marketing: 1
    }
};