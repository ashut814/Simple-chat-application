const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    // Store username in local storage
    res.cookie('username', username);
    res.redirect('/');
});

app.get('/', (req, res) => {
    const username = req.cookies.username || 'Guest';
    res.sendFile(__dirname + '/public/index.html');
});

app.post('/send-message', (req, res) => {
    const username = req.cookies.username || 'Guest';
    const message = req.body.message;

    // Store the message in a file
    fs.appendFileSync('messages.txt', `${username}: ${message}\n`);

    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
