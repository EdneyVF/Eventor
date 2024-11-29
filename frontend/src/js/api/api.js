import axios from 'axios';
const API_BASE = 'http://localhost:3000/api';

export async function registerUser(data) {
  try {
    const response = await axios.post(`${API_BASE}/auth/register`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return { error: true, message: error.response.data.message };
  }
}

export async function loginUser(data) {
  try {
    const response = await axios.post(`${API_BASE}/auth/login`, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return {};
  }
}

// USER OPERATIONS

export async function fetchUsers() {
  try {
    const token = localStorage.getItem('token'); // Use token from storage for authorization

    const response = await axios.get(`${API_BASE}/users`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error.response ? error.response.data : error.message);
    return [];
  }
}

export async function fetchUser(id) {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.get(`${API_BASE}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching the user:', error.response ? error.response.data : error.message);
    return {};
  }
}

export async function updateUser(id, data) {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.put(`${API_BASE}/users/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    return {};
  }
}

export async function deleteUser(id) {
  try {
    const token = localStorage.getItem('token');

    const response = await axios.delete(`${API_BASE}/users/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response ? error.response.data : error.message);
    return {};
  }
}

// EVENTS OPERATIONS

export async function fetchEvents() {
  try {
    const response = await axios.get(`${API_BASE}/events`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error.response ? error.response.data : error.message);
    return [];
  }
}

export async function fetchEvent(id) {
  try {
    const response = await axios.get(`${API_BASE}/events/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching the event:', error.response ? error.response.data : error.message);
    return {};
  }
}

export async function createEvent(data) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_BASE}/events`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error creating event:', error.response ? error.response.data : error.message);
    return {};
  }
}

export async function updateEvent(id, data) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${API_BASE}/events/${id}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating event:', error.response ? error.response.data : error.message);
    return {};
  }
}

export async function deleteEvent(id) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.delete(`${API_BASE}/events/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting event:', error.response ? error.response.data : error.message);
    return {};
  }
}
