import { registerUser } from '../api/api.js';

export function setupRegisterForm() {
  const registerForm = document.getElementById('register-form');

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!name || !email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await registerUser({ name, email, password });

      if (response.token) {
        alert('Registration successful!');
        localStorage.setItem('token', response.token);
        window.location.href = '/login';

      } else {
        alert('Registration failed. User might already exist.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('An error occurred while registering.');
    }
  });
}