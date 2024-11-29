import { 
  fetchEvents, 
  fetchEvent, 
  createEvent, 
  updateEvent, 
  deleteEvent, 
  fetchUsers, 
  fetchUser, 
  updateUser, 
  deleteUser, 
  registerUser 
} from '../api/api.js';

export function renderAdminDashboard() {
  const contentArea = document.getElementById('content');
  
  if (contentArea) {
    contentArea.innerHTML = `
      <h2>Admin Dashboard</h2>
      <div class="d-flex justify-content-center my-3">
        <button id="list-events-button" class="btn btn-outline-primary me-2">List Events</button>
        <button id="list-users-button" class="btn btn-outline-primary me-2">List Users</button>
        <button id="create-event-button" class="btn btn-success me-2">Create Event</button>
        <button id="create-user-button" class="btn btn-success">Create User</button>
      </div>
      <div id="dashboard-content" class="mt-4"></div>
    `;

    const listEventsButton = document.getElementById('list-events-button');
    const listUsersButton = document.getElementById('list-users-button');
    const createEventButton = document.getElementById('create-event-button');
    const createUserButton = document.getElementById('create-user-button');
    const dashboardContent = document.getElementById('dashboard-content');

    listEventsButton.addEventListener('click', loadEvents);
    listUsersButton.addEventListener('click', loadUsers);

    listUsersButton.addEventListener('click', async () => {
      try {
        const users = await fetchUsers();
        dashboardContent.innerHTML = renderUsers(users);
        setupUserListeners();
      } catch (error) {
        console.error('Error fetching users:', error);
        dashboardContent.innerHTML = '<p>Error loading users.</p>';
      }
    });

    createEventButton.addEventListener('click', () => {
      loadHTMLComponent('../../views/createEventForm.html', dashboardContent).then(() => {
        setupCreateEventForm();
      });
    });

    createUserButton.addEventListener('click', () => {
      loadHTMLComponent('../../views/editUserProfileForm.html', dashboardContent).then(() => {
        setupCreateUserForm();
      });
    });
    loadEvents();
  }
}

async function loadEvents() {
  try {
    const dashboardContent = document.getElementById('dashboard-content');
    const events = await fetchEvents();
    dashboardContent.innerHTML = renderEvents(events);
    setupEventListeners();
  } catch (error) {
    console.error('Error fetching events:', error);
    dashboardContent.innerHTML = '<p>Error loading events.</p>';
  }
}

async function loadUsers() {
  try {
    const dashboardContent = document.getElementById('dashboard-content');
    const users = await fetchUsers();
    dashboardContent.innerHTML = renderUsers(users);
    setupUserListeners();
  } catch (error) {
    console.error('Error fetching users:', error);
    dashboardContent.innerHTML = '<p>Error loading users.</p>';
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

function renderUsers(users) {
  if (users.length === 0) return '<p>No users found.</p>';

  return `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        ${users.map(user => `
          <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>
              <button class="btn btn-warning btn-sm edit-user" data-id="${user._id}">Edit</button>
              <button class="btn btn-danger btn-sm delete-user" data-id="${user._id}">Delete</button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

function setupEventListeners() {
  document.querySelectorAll('.edit-event').forEach(button => {
    button.addEventListener('click', async (e) => {
      const eventId = e.target.dataset.id;
      const event = await fetchEvent(eventId);
      editEvent(event);
    });
  });

  document.querySelectorAll('.delete-event').forEach(button => {
    button.addEventListener('click', async (e) => {
      const eventId = e.target.dataset.id;
      await deleteEvent(eventId);
      loadEvents();
    });
  });
}

function editEvent(event) {
  loadHTMLComponent('../../views/createEventForm.html', document.getElementById('dashboard-content')).then(() => {

    document.getElementById('event-title').value = event.title;
    document.getElementById('event-description').value = event.description;
    

    const dateInput = document.getElementById('event-date');

    dateInput.value = new Date(event.date).toISOString().split('T')[0];
    
    document.getElementById('event-location').value = event.location;

    const form = document.getElementById('create-event-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const selectedDate = form.elements['event-date'].value;
      const dateParts = selectedDate.split('-'); 
      const dateObject = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));

      const data = {
        title: form.elements['event-title'].value,
        description: form.elements['event-description'].value,
        date: dateObject.toISOString(),
        location: form.elements['event-location'].value,
      };
      console.log('Submitting event data:', data);
      await updateEvent(event._id, data);
      loadEvents();
    });
  });
}

function setupUserListeners() {
  document.querySelectorAll('.edit-user').forEach(button => {
    button.addEventListener('click', async (e) => {
      const userId = e.target.dataset.id;
      const user = await fetchUser(userId);
      editUser(user);
    });
  });

  document.querySelectorAll('.delete-user').forEach(button => {
    button.addEventListener('click', async (e) => {
      const userId = e.target.dataset.id;
      await deleteUser(userId);
      loadUsers();
    });
  });
}

function editUser(user) {
  loadHTMLComponent('../../views/editUserProfileForm.html', document.getElementById('dashboard-content')).then(() => {
    document.getElementById('user-name').value = user.name;
    document.getElementById('user-email').value = user.email;

    const form = document.getElementById('create-user-form');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = {
        name: form.elements['user-name'].value,
        email: form.elements['user-email'].value,
      };
      await updateUser(user._id, data);
      loadUsers();
    });
  });
}

function setupCreateEventForm() {
  const form = document.getElementById('create-event-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      title: form.elements['event-title'].value,
      description: form.elements['event-description'].value,
      date: form.elements['event-date'].value,
      location: form.elements['event-location'].value,
    };
    await createEvent(data);
    loadEvents();
  });
}

function setupCreateUserForm() {
  const form = document.getElementById('create-user-form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = {
      name: form.elements['user-name'].value,
      email: form.elements['user-email'].value,
      password: form.elements['user-password'].value,
    };
    await registerUser(data);
    loadUsers();
  });
}