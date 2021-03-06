const type = require('./actionType');

module.exports = {
    hp: 120,
    power:100,
    level: 4,
    name: 'Marine Serpentard',
    slogan: 'Au nom des sang-pur',
    sound:'assets/start9.wav',
    soundDead:'assets/kill2.wav',
    states: [
        {
            name: 'wait',
            url: 'assets/lepen/wait.png',
            size: 100,
            rotation: 0,
            duration: 2500
        },
        {
            name: 'attack0',
            url: 'assets/lepen/attack0.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'attack1',
            url: 'assets/lepen/attack1.png',
            size: 100,
            rotation: 10,
            duration: 200
        },
        {
            name: 'hurted',
            url: 'assets/lepen/hurted.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'healer',
            url: 'assets/lepen/healer.png',
            size: 100,
            rotation: 10,
            duration: 200
        },
        {
            name: 'start',
            url: 'assets/lepen/start.png',
            size: 100,
            rotation: 10,
            duration: 200
        }
    ],
    actions: [
        {
            name: 'Victimisation',
            type: type.renforcement,
            cost: 50,
            desc: 'Régénération',
            damage: 40,
            state: 1,
            probability: 0.8,
            duration: 3000,
            sound:'assets/start2.wav'
        },
        {
            name: 'Immigration Massive',
            type: type.manipulation,
            cost: 75,
            desc: 'Attaque de type manipulation',
            damage: 35,
            state: 2,
            probability: 0.6,
            duration: 3000,
            sound:'assets/kick1.wav'
        },
        {
            name: 'Virage à gauche ',
            type: type.marketing,
            cost: 60,
            desc: 'Attaque de type marketing',
            damage: 30,
            state: 1,
            probability: 0.4,
            duration: 3000,
            sound:'assets/kick2.wav'
        },
        {
            name: 'Annonce apocalyptique',
            type: type.conviction,
            cost: 50,
            desc: 'Attaque de type conviction',
            damage: 30,
            state: 2,
            probability: 0,
            duration: 3000,
            sound:'assets/kick2.wav'
        }
    ],
    waiting: [
        {
            probability: 1,
            state: 0
        }
    ],
    hurted:3,
    focus: 0,
    start: 4,
    weakness: {
        personnel: 1,
        conviction: 1,
        politique: 1.2,
        marketing: 1
    }
};