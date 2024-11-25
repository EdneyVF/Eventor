import { loginUser } from '../api/api.js';

export function setupLoginForm() {
  const loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!email || !password) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await loginUser({ email, password });

      if (response.token) {
        alert('Login successful!');
        localStorage.setItem('token', response.token);
        // Navigate to dashboard or update UI
      } else {
        alert('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred while logging in.');
    }
  });
}
