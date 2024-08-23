const apiUrl = 'http://localhost:8080';

function loadEvents() {
    fetch(`${apiUrl}/events`)
        .then(response => response.json())
        .then(data => {
            const content = document.getElementById('content');
            content.innerHTML = '<h2>Events</h2>';
            data.forEach(event => {
                const eventDiv = document.createElement('div');
                eventDiv.innerHTML = `
                    <h3>${event.name}</h3>
                    <p>${event.description}</p>
                    <p>Location: ${event.location}</p>
                    <p>Date: ${new Date(event.date_time).toLocaleString()}</p>
                    <button onclick="registerForEvent(${event.id})">Register</button>
                `;
                content.appendChild(eventDiv);
            });
        })
        .catch(error => console.error('Error fetching events:', error));
}

function registerForEvent(eventId) {
    const token = localStorage.getItem('token');
    fetch(`${apiUrl}/events/${eventId}/register`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            alert('Registered successfully!');
            loadEvents();
        })
        .catch(error => console.error('Error registering for event:', error));
}

function showLoginForm() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Login</h2>
        <form onsubmit="login(event)">
            <input type="email" id="login-email" placeholder="Email" required><br>
            <input type="password" id="login-password" placeholder="Password" required><br>
            <button type="submit">Login</button>
        </form>
    `;
}

function showSignupForm() {
    const content = document.getElementById('content');
    content.innerHTML = `
        <h2>Sign Up</h2>
        <form onsubmit="signup(event)">
            <input type="email" id="signup-email" placeholder="Email" required><br>
            <input type="password" id="signup-password" placeholder="Password" required><br>
            <button type="submit">Sign Up</button>
        </form>
    `;
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                alert('Login successful!');
                loadEvents();
            } else {
                alert('Login failed!');
            }
        })
        .catch(error => console.error('Error logging in:', error));
}

function signup(event) {
    event.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    fetch(`${apiUrl}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'user created') {
                alert('Signup successful!');
                showLoginForm();
            } else {
                alert('Signup failed!');
            }
        })
        .catch(error => console.error('Error signing up:', error));
}
