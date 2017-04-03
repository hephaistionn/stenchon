const type = require('./actionType');

module.exports = {
    hp: 400,
    power:100,
    name: 'Dark Juncker',
    slogan: 'Imperator de l\'empire liberal',
    states: [
        {
            name: 'wait',
            url: 'assets/juncker/wait.png',
            size: 100,
            rotation: 0,
            duration: 2500
        },
        {
            name: 'attack0',
            url: 'assets/juncker/attack0.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'attack1',
            url: 'assets/juncker/attack1.png',
            size: 100,
            rotation: 10,
            duration: 200
        },
        {
            name: 'hurted',
            url: 'assets/juncker/hurted.png',
            size: 100,
            rotation: 0,
            duration: 200
        }
    ],
    actions: [
        {
            name: 'Pénurie financière',
            type: type.physique,
            cost: 100,
            desc: 'Attaque de type physique',
            damage: 32,
            state: 2,
            probability: 0.8,
            duration: 2000
        },
        {
            name: 'Lobbycratie et influence',
            type: type.politique,
            cost: 50,
            desc: 'Attaque de type politique',
            damage: 20,
            state: 1,
            probability: 0.45,
            duration: 2000
        },
        {
            name: 'Déstabilisation',
            type: type.personnel,
            cost: 75,
            desc: 'Attaque de type personnel',
            damage: 15,
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
    hurted:3,
    focus: 0,
    start: 0,
    weakness: {
        personnel: 1,
        conviction: 1.2,
        politique: 1,
        marketing: 1
    }
};