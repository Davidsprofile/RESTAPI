// app.js
import API_BASE_URL from './config.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const eventsContainer = document.getElementById('events');

  // Handle login
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        window.location.href = '/events.html'; // Redirect to events page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Handle signup
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Signup successful. Please login.');
        window.location.href = '/index.html'; // Redirect to login page
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  });

  // Fetch and display events
  async function fetchEvents() {
    try {
      const response = await fetch(`${API_BASE_URL}/events`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const events = await response.json();
      if (response.ok) {
        eventsContainer.innerHTML = events.map(event => `
          <div>
            <h3>${event.name}</h3>
            <p>${event.description}</p>
            <p>${event.location}</p>
            <p>${new Date(event.date_time).toLocaleString()}</p>
          </div>
        `).join('');
      } else {
        alert('Failed to fetch events.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  if (eventsContainer) {
    fetchEvents();
  }
});
