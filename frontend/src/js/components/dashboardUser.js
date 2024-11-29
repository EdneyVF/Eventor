import { fetchEvents, fetchUser, updateUser } from '../api/api.js'; 

export function renderUserDashboard(userId) {
  const contentArea = document.getElementById('content');

  if (contentArea) {
    contentArea.innerHTML = `
      <h2>User Dashboard</h2>
      <div class="d-flex justify-content-center my-3">
        <button id="list-events-button" class="btn btn-outline-primary me-2">List Events</button>
        <button id="edit-profile-button" class="btn btn-outline-primary">Edit Profile</button>
      </div>
      <div id="dashboard-content" class="mt-4"></div>
    `;

    const listEventsButton = document.getElementById('list-events-button');
    const editProfileButton = document.getElementById('edit-profile-button');
    const dashboardContent = document.getElementById('dashboard-content');

    listEventsButton.addEventListener('click', loadEvents);
    editProfileButton.addEventListener('click', () => editUserProfile(userId));

    loadEvents();
  }
}

async function loadEvents() {
  try {
    const dashboardContent = document.getElementById('dashboard-content');
    const events = await fetchEvents();
    dashboardContent.innerHTML = renderEvents(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    dashboardContent.innerHTML = '<p>Error loading events.</p>';
  }
}

function renderEvents(events) {
  if (events.length === 0) return '<p>No events found.</p>';

  return `
    <div class="events-grid">
      ${events.map(event => `
        <div class="event-card">
          <h3>${event.title}</h3>
          <p><strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}</p>
          <p><strong>Location:</strong> ${event.location}</p>
          <p><strong>Description:</strong> ${truncateText(event.description, 100)}</p>
          <p><strong>Participants:</strong> ${event.participants.length}</p>
          <button class="btn btn-warning btn-sm edit-event" data-id="${event._id}">Edit</button>
          <button class="btn btn-danger btn-sm delete-event" data-id="${event._id}">Delete</button>
        </div>
      `).join('')}
    </div>
  `;
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

async function editUserProfile(userId) {
  try {
    const user = await fetchUser(userId);
    loadHTMLComponent('../../views/editUserProfileForm.html', dashboardContent).then(() => {
      
      document.getElementById('user-name').value = user.name;
      document.getElementById('user-email').value = user.email;

      const form = document.getElementById('edit-user-form');
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
          name: form.elements['user-name'].value,
          email: form.elements['user-email'].value,
          password: form.elements['user-password'].value
        };
        await updateUser(userId, data);
        dashboardContent.innerHTML = '<p>Profile updated successfully!</p>';
      });
    });
  } catch (error) {
    console.error('Error editing profile:', error);
    dashboardContent.innerHTML = '<p>Error loading profile.</p>';
  }
}

async function loadHTMLComponent(url, container) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error('Failed to load component:', error);
    container.innerHTML = '<p>Failed to load content.</p>';
  }
}