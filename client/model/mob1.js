module.exports = {
    hp: 15,
    name: 'mob1',
    states: [
        {
            name: 'waiting',
            url: 'assets/fillon/fillon01.png',
            size: 100,
            rotation: 0,
            duration: 1000
        },
        {
            name: 'attacking',
            url: 'assets/fillon/fillon03.png',
            size: 110,
            rotation: 10,
            duration: 1000
        },
        {
            name: 'attacking',
            url: 'assets/fillon/fillon02.png',
            size: 100,
            rotation: 10,
            duration: 1000
        },
        {
            name: 'focus',
            url: 'assets/fillon/fillon04.png',
            size: 100,
            rotation: 10,
            duration: 1000
        }
    ],
    actions: [
        {
            name: 'attack1',
            type: 'personal',
            cost: 3000,
            desc: 'populism attack',
            damage: 4,
            state: 1,
            probability: 1,
            duration: 1000
        }
    ],
    waiting: [
        {
            probability: 1,
            state: 0
        }
    ],
    weakness: {
        personal: 1,
        populism: 1,
        hate: 1
    },
    hurted: 2,
    focus: 3
};