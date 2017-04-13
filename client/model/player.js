const type = require('./actionType');
module.exports = {
    hp: 100,
    power: 100,
    level: 0,
    name: 'Mélenchon',
    slogan: 'Can\'t stenchon the Melenchon',
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
            duration: 200
        }
    ],
    actions: [
        {//0
            name: 'On ne me la fait pas !',
            type: type.conviction,
            desc: 'Attaque de type conviction',
            damage: 10,
            cost: 33,
            state: 2,
            duration: 3000,
            sound: 'assets/kick0.wav'
        },
        {//1
            name: 'Indignation',
            type: type.conviction,
            desc: 'Attaque de type politique',
            damage: 35,
            cost: 66,
            state: 3,
            duration: 3000,
            sound: 'assets/kick1.wav'
        },
        {//2
            name: 'Eveil des consciences',
            type: type.conviction,
            desc: 'Attaque de type politique',
            damage: 15,
            cost: 33,
            state: 2,
            duration: 3000,
            sound: 'assets/kick0.wav'
        },
        {//3
            name: 'VIeme République',
            type: type.politique,
            desc: 'Attaque de type politique',
            damage: 30,
            cost: 50,
            state: 3,
            duration: 3000,
            sound: 'assets/kick1.wav'
        },
        {//4
            name: 'Punchline',
            type: type.personnel,
            desc: 'Attaque de type lyrique',
            damage: 20,
            cost: 50,
            state: 4,
            duration: 3000,
            sound: 'assets/kick2.wav'
        },
        {//5
            name: 'Pudeur de gazelle',
            type: type.personnel,
            desc: 'Attaque de type lyrique',
            damage: 35,
            cost: 66,
            state: 2,
            duration: 3000,
            sound: 'assets/special2.wav'//,
            //sound2:'assets/debat-pudeur-de-gazelle.mp3'
        },
        {//6
            name: 'Culture et Géopolitique',
            type: type.politique,
            desc: 'Attaque de type politique',
            damage: 30,
            cost: 75,
            state: 4,
            duration: 3000,
            sound: 'assets/kick3.wav'
        },
        {//7
            name: 'Soutien du peuple',
            type: type.renforcement,
            desc: 'Régénération',
            damage: 50,
            cost: 100,
            state: 6,
            duration: 3000,
            limit:2,
            sound: 'assets/start7.wav'
        },
        {//8
            name: 'Vote utile',
            type: type.marketing,
            desc: 'Attaque de type marketing',
            damage: 15,
            cost: 50,
            state: 3,
            duration: 3000,
            sound: 'assets/kick1.wav'
        },
        {//9
            name: 'Humanisme',
            type: type.conviction,
            desc: 'Attaque de type conviction',
            damage: 35,
            cost: 65,
            state: 3,
            duration: 3000,
            sound: 'assets/kick1.wav'
        },
        {//10
            name: 'Dégagisme ',
            type: type.politique,
            desc: 'Attaque de type politique',
            damage: 35,
            cost: 50,
            state: 3,
            duration: 3000,
            sound: 'assets/kick1.wav'
        },
        {//11
            name: 'Intérêt du peuple ',
            type: type.conviction,
            desc: 'Attaque de type conviction',
            damage: 35,
            cost: 63,
            state: 3,
            duration: 3000,
            sound: 'assets/kick3.wav'
        },
        {//12
            name: 'Intérêt environnemental',
            type: type.conviction,
            desc: 'Attaque de type conviction',
            damage: 35,
            cost: 63,
            state: 3,
            duration: 3000,
            sound: 'assets/kick1.wav'
        }
    ],
    actionByLevel: [
        [],
        [0, 1, 4], //combendite
        [8, 4, 6], //Hamon
        [2, 4, 6, 7], //fillon
        [2, 3, 5, 9],  //lepen
        [3, 10, 9, 6, 11, 7],  //Valls
        [2, 6, 9, 11, 7], ////Merkel
        [6, 9, 11, 12, 7] ////Juncker
    ],
    hpByLevel: [
        50,
        50, //combendite
        70, //Hamon
        100, //fillon
        110,  //lepen
        120,  //Valls
        150, ////Merkel
        200 ////Juncker
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
        renforcement: 100
    }
};