const type = require('./actionType');

module.exports = {
    hp: 20,
    power: 100,
    name: 'Dany le Rouge',
    slogan: 'Trotskiste Libéral',
    states: [
        {
            name: 'wait',
            url: 'assets/combendite/wait.png',
            size: 100,
            rotation: 0,
            duration: 2500
        },
        {
            name: 'attack',
            url: 'assets/combendite/attack.png',
            size: 110,
            rotation: 20,
            duration: 200
        },
        {
            name: 'hured',
            url: 'assets/combendite/hured.png',
            size: 100,
            rotation: -20,
            duration: 200
        }
    ],
    actions: [
        {
            name: 'Grosse Colère',
            type: type.personnel,
            cost: 80,
            desc: 'Attaque de type personnel',
            damage: 5,
            state: 1,
            probability: 0.4,
            duration: 2000
        },
        {
            name: 'Jean-Luc',
            type: type.manipulation,
            cost: 80,
            desc: 'Attaque de type manipulation',
            damage: 10,
            state: 1,
            probability: 0,
            duration: 20000
        }
    ],
    waiting: [
        {
            probability: 1,
            state: 0
        }
    ],
    hurted: 2,
    focus: 0,
    start: 0,
    weakness: {
        personnel: 1.5,
        conviction: 0.8,
        politique: 0.8,
        marketing: 1.5
    }
};