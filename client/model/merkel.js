const type = require('./actionType');

module.exports = {
    hp: 300,
    power:100,
    name: 'Angela',
    slogan: 'L\'Ordre Teutonique Liberal',
    sound:'assets/start5.wav',
    soundDead:'assets/kill1.wav',
    states: [
        {
            name: 'wait',
            url: 'assets/merkel/wait.png',
            size: 100,
            rotation: 0,
            duration: 2500
        },
        {
            name: 'attack0',
            url: 'assets/merkel/attack0.png',
            size: 100,
            rotation: 0,
            duration: 200
        },
        {
            name: 'attack1',
            url: 'assets/merkel/attack1.png',
            size: 100,
            rotation: 10,
            duration: 200
        },
        {
            name: 'hurted',
            url: 'assets/merkel/hurted.png',
            size: 100,
            rotation: 0,
            duration: 200
        }
    ],
    actions: [
        {
            name: 'chantage à la dette',
            type: type.manipulation,
            cost: 90,
            desc: 'Attaque de type manipulation',
            damage: 40,
            state: 2,
            probability: 0.8,
            duration: 3000,
            sound:'assets/kick3.wav'
        },
        {
            name: 'Négociation unilaterale',
            type: type.politique,
            cost: 75,
            desc: 'Attaque de type politique',
            damage: 18,
            state: 2,
            probability: 0.4,
            duration: 3000,
            sound:'assets/kick1.wav'
        },
        {
            name: 'Lobbycratie et influence',
            type: type.politique,
            cost: 75,
            desc: 'Attaque de type politique',
            damage: 15,
            state: 1,
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
        conviction: 1,
        politique: 1,
        marketing: 1
    }
};