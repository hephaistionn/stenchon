const type = require('./actionType');

module.exports = {
    hp: 320,
    power: 100,
    level: 10,
    name: 'Dark Juncker',
    slogan: 'Imperator de l\'empire liberal',
    sound: 'assets/start6.wav',
    soundDead: 'assets/fatal.wav',
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
            damage: 45,
            state: 2,
            probability: 0.90,
            duration: 3000,
            sound: 'assets/kick3.wav'
        },
        {
            name: 'Lobbycratie et influence',
            type: type.politique,
            cost: 50,
            desc: 'Attaque de type politique',
            damage: 40,
            state: 1,
            probability: 0.66,
            duration: 3000,
            sound: 'assets/kick3.wav'
        },
        {
            name: 'Evasion fiscale',
            type: type.physique,
            cost: 50,
            desc: 'Attaque de type physique',
            damage: 35,
            state: 1,
            probability: 0.33,
            duration: 3000,
            sound: 'assets/kick3.wav'
        },
        {
            name: 'Déstabilisation',
            type: type.politique,
            cost: 75,
            desc: 'Attaque de type politique',
            damage: 30,
            state: 1,
            probability: 0,
            duration: 3000,
            sound: 'assets/start0.wav'
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