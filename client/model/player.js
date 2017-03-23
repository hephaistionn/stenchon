module.exports = {
    hp: 200,
    willpower: 20,
    name: 'Melenchon',
    states: [
        {
            name: 'waiting',
            url: '',
            size: 100,
            rotation: 0,
            duration: 1000
        },
        {
            name: 'focus',
            url: '',
            size: 100,
            rotation: 0,
            duration: 1000000
        },
        {
            name: 'attacking',
            url: '',
            size: 110,
            rotation: 10,
            duration: 1000
        },
        {
            name: 'meeting',
            url: '',
            size: 110,
            rotation: 10,
            duration: 1000
        },
        {
            name: 'hearted',
            url: '',
            size: 100,
            rotation: -10,
            duration: 1000
        }
    ],
    actions: [
        {
            name: 'attack1',
            type: 'populism',
            desc: 'populism attack',
            damage: 4,
            cost: 1,
            state: 2
        },
        {
            name: 'attack2',
            type: 'personal',
            desc: 'personal attack',
            damage: 6,
            cost: 1,
            state: 2
        },
        {
            name: 'attack2',
            type: 'conviction',
            desc: 'restore power',
            damage: 6,
            cost: 0,
            state: 3
        }
    ],
    waiting: [
        {
            probability: 1,
            state: 0
        }
    ],
    focus: 1,
    hurted: 4,
    regeneration: 5,
    weakness: {
        personal: 1.2,
        populism: 1,
        hate: 1
    }
};