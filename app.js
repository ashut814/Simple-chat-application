const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static('public'));

// Home route
app.get('/', (req, res) => {
    const username = req.cookies.username || 'Guest';
    res.sendFile(__dirname + '/public/index.html');
});

// Login route
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    res.cookie('username', username);
    res.redirect('/');
});

// Messages route
app.post('/send-message', (req, res) => {
    const username = req.cookies.username || 'Guest';
    const message = req.body.message;

    fs.appendFileSync('messages.txt', `${username}: ${message}\n`);

    res.redirect('/');
});

// Contact Us controller
const contactUsController = (req, res) => {
    res.sendFile(__dirname + '/public/contactus.html');
};

app.get('/contactus', contactUsController);

// Submit Contact controller
const submitContactController = (req, res) => {
    // Handle form submission (save data to a database, etc.)
    // For simplicity, redirect to /success
    res.redirect('/success');
};

app.post('/submit-contact', submitContactController);

// Success controller
const successController = (req, res) => {
    res.send('Form successfully filled');
};

app.get('/success', successController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
