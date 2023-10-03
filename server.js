const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.get('*.js', (req, res, next) => {
    res.type('application/javascript');
    next();
});

app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log('Server started at http://localhost:' + port);
});
