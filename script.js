document.addEventListener('DOMContentLoaded', () => {
    const usernameElement = document.getElementById('username');
    const messagesElement = document.getElementById('messages');

    // Display the username
    const username = getCookie('username') || 'Guest';
    usernameElement.innerText = username;

    // Display messages
    fetch('/messages')
        .then(response => response.text())
        .then(messages => {
            messagesElement.innerText = messages;
        });

    // Function to get cookies
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const usernameElement = document.getElementById('username');
    const messagesElement = document.getElementById('messages');

    const username = getCookie('username') || 'Guest';
    usernameElement.innerText = username;

    fetch('/messages')
        .then(response => response.text())
        .then(messages => {
            messagesElement.innerText = messages;
        });

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
});
