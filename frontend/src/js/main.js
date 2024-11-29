import '../scss/styles.scss';
import * as bootstrap from 'bootstrap';
import { renderLogin, renderRegister} from './auth/authController.js';
import { fetchEvents } from './api/api.js';

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.getElementById('btnLogin');
  const registerButton = document.getElementById('btnRegister');
  const content = document.getElementById('content');

  if (loginButton && content) {
    loginButton.addEventListener('click', () => {
      renderLogin(content);
    });
    registerButton.addEventListener('click', () => {
      renderRegister(content);
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const eventListContainer = document.getElementById('content');

  if (eventListContainer) {
    fetchAndRenderEvents(eventListContainer);
  }
});

async function fetchAndRenderEvents(container) {
  try {
    const events = await fetchEvents();

    if (events.length === 0) {
      container.innerHTML = `<p>Não foram encontrados eventos para listar!</p>`;
    } else {
    container.innerHTML = events.map(eventToHtml).join('');
  }
  } catch (error) {
    console.error('Error fetching events:', error);
    container.innerHTML = `<p>Error loading events. Please try again later.</p>`;
}
}

function eventToHtml(event) {
  return `
    <div class="event">
      <h3>${event.title}</h3>
      <p>${event.description}</p>
      <p>Date: ${new Date(event.date).toLocaleDateString()}</p>
      <p>Location: ${event.location}</p>
    </div>
  `;
}