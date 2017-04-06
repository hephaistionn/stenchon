module.exports = {
    timeline: [
        [0],//combendite
        [2],//hamon
        [1],//fillon
        [4],//lepen
        [5,7],//valls macron
        [6],//merkel
        [3]//juncker
    ],
    mobs: [
        require('./combendite'),
        require('./fillon'),
        require('./hamon'),
        require('./juncker'),
        require('./lepen'),
        require('./macron'),
        require('./merkel'),
        require('./valls')
    ]
};