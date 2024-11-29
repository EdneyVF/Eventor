import { loginUser } from '../api/api.js';
import { renderAdminDashboard } from '../components/dashboardAdmin.js';
import { renderUserDashboard } from '../components/dashboardUser.js';
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

      if (response.token && response.role) {
        alert('Login successful!');
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', response.role);
        updateUIOnLogin(response.name, response.role);
        if (response.role === 'admin') {
          alert('Admin login successful!');
          renderAdminDashboard();
        } else if (response.role === 'user') {
          alert('User Login sucessful!');
          renderUserDashboard();
        }
      } else {
        alert('Invalid email or password.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred while logging in.');
    }
  });
}

function updateUIOnLogin(name, role) {
  document.getElementById('btnLogin').style.display = 'none';
  document.getElementById('btnRegister').style.display = 'none';
  document.getElementById('btnLogout').style.display = 'inline-block';

  document.getElementById('btnLogout').addEventListener('click', handleLogout);
  
}

function handleLogout() {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
  
  document.getElementById('btnLogin').style.display = 'inline-block';
  document.getElementById('btnRegister').style.display = 'inline-block';
  document.getElementById('btnLogout').style.display = 'none';

  alert('Logged out successfully');
  window.location.href = '/';
}