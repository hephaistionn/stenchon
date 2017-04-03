const type = require('./actionType');

module.exports = {
    hp: 50,
    power:100,
    name: 'Lieutenant Macron',
    slogan: 'Marche ou crève',
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
            cost: 60,
            desc: 'attaque de type marketing',
            damage: 4,
            state: 20,
            probability: 0.65,
            duration: 2000
        },
        {
            name: 'Je suis d\'accord',
            type: type.marketing,
            cost: 65,
            desc: 'attaque de type marketing',
            damage: 10,
            state: 1,
            probability: 0.5,
            duration: 2000
        },
        {
            name: 'C\'est notre projet !!!',
            type: type.hysterie,
            cost: 60,
            desc: 'attaque de type hysterie',
            damage: 10,
            state: 2,
            probability: 0.3,
            duration: 2000
        },
        {
            name: 'Ni droite, ni gauche, juste libéral',
            type: type.renforcement,
            cost: 80,
            desc: 'attaque de type renforcement',
            damage: 20,
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