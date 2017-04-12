const type = require('./actionType');

module.exports = {
    hp: 50,
    power: 100,
    level: 1,
    name: 'Dany le Rouge',
    slogan: 'Trotskiste Libéral',
    soundDead:'assets/kill0.wav',
    sound:'assets/fight.wav',
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
            cost: 50,
            desc: 'Attaque de type personnel',
            damage: 20,
            state: 1,
            probability: 0.4,
            duration: 3000,
            sound:'assets/kick0.wav'
        },
        {
            name: 'Tutoiement',
            type: type.manipulation,
            cost: 40,
            desc: 'Attaque de type manipulation',
            damage: 20,
            state: 1,
            probability: 0,
            duration: 3000,
            sound:'assets/kick0.wav'
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