const type = require('./actionType');

module.exports = {
    hp: 120,
    power:100,
    name: 'Marine Serpentard',
    slogan: 'Au nom des sang-pur',
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
            desc: 'Renforcement',
            damage: 20,
            state: 1,
            probability: 0.8,
            duration: 2000
        },
        {
            name: 'Immigration Massive',
            type: type.manipulation,
            cost: 75,
            desc: 'Attaque de type manipulation',
            damage: 20,
            state: 2,
            probability: 0.6,
            duration: 2000
        },
        {
            name: 'Virage à gauche ',
            type: type.marketing,
            cost: 60,
            desc: 'Attaque de type marketing',
            damage: 20,
            state: 1,
            probability: 0.4,
            duration: 2000
        },
        {
            name: 'Annonce apocalyptique',
            type: type.conviction,
            cost: 50,
            desc: 'Attaque de type conviction',
            damage: 15,
            state: 2,
            probability: 0,
            duration: 2000
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