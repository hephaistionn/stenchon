module.exports = {
    hp: 15,
    name: 'mob2',
    willpower: 100,
    states: [
        {
            name: 'waiting',
            url: '',
            size: 100,
            rotation: 0,
            duration: 1000
        },
        {
            name: 'attacking',
            url: '',
            size: 110,
            rotation: 10,
            duration: 1000
        }
    ],
    actions: [
        {
            name: 'attack1',
            type: 0,
            cost: 1,
            desc: 'populism attack',
            damage: 4,
            state: 1,
            probability: 1
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
    }
};