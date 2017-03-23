const express = require('express');
const app = express();

app.use(express.static('build'));


const port = process.env.PORT || 3000;
const server = app.listen(port, function() {
    console.info('server start on port ' + port);
});