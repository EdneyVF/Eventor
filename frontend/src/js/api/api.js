import axios from 'axios';
const API_BASE = 'http://localhost:3000/api';

// Register User
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
    return {};
  }
}

// Login User
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
