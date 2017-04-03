const type = require('./actionType');

module.exports = {
    hp: 50,
    power:50,
    name: 'Benois Pignon',
    slogan: 'Le dîner de cons',
    states: [
        {
            name: 'wait',
            url: 'assets/hamon/wait.png',
            size: 100,
            rotation: 0,
            duration: 2500
        },
        {
            name: 'attack',
            url: 'assets/hamon/attack0.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'hurted',
            url: 'assets/hamon/hurted.png',
            size: 100,
            rotation: 0,
            duration: 200
        }
    ],
    actions: [
        {
            name: 'photocopie de programme',
            type: type.marketing,
            cost: 45,
            desc: 'Attaque de type marketing',
            damage: 10,
            state: 1,
            probability: 0.5,
            duration: 2000
        },
        {
            name: 'Revenu Universel',
            type: type.marketing,
            cost: 40,
            desc: 'Attaque de type marketing',
            damage: 10,
            state: 1,
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
    hurted:2,
    focus: 0,
    start:0,
    weakness: {
        personnel: 0.8,
        conviction: 1,
        politique: 1.2,
        marketing: 1
    }
};