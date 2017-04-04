const type = require('./actionType');
module.exports = {
    hp: 100,
    power: 80,
    name: 'Mélenchon',
    slogan: 'Can\'t stenchon stop Melenchon',
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
            duration: 2000
        }
    ],
    actions: [
        {
            name: 'Eveil des consciences',
            type: type.conviction,
            desc: 'attaque de type politique',
            damage: 20,
            cost: 35,
            state: 2,
            duration: 2000
        },
        {
            name: 'VIeme République',
            type: type.politique,
            desc: 'attaque de type politique',
            damage: 30,
            cost: 45,
            state: 3,
            duration: 2000
        },
        {
            name: 'Punchline',
            type: type.personnel,
            desc: 'attaque de type politique',
            damage: 20,
            cost: 50,
            state: 4,
            duration: 2000
        },
        {
            name: 'Régle verte',
            type: type.politique,
            desc: 'attaque de type politique',
            damage: 30,
            cost: 60,
            state: 2,
            duration: 2000
        },
        {
            name: 'Indignation',
            type: type.conviction,
            desc: 'attaque de type politique',
            damage: 35,
            cost: 65,
            state: 3,
            duration: 2000
        },
        {
            name: 'Culture et Géopolitique',
            type: type.politique,
            desc: 'attaque de type politique',
            damage: 40,
            cost: 65,
            state: 4,
            duration: 2000
        },
        {
            name: 'soutien du peuple',
            type: type.renforcement,
            desc: 'Renforcement',
            damage: 100,
            cost: 80,
            state: 5,
            duration: 2000
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