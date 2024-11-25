import { setupLoginForm } from './login.js';
import { setupRegisterForm } from './register.js';

// Render Login View
export async function renderLogin(content) {
  const response = await fetch('/src/views/login.html');
  content.innerHTML = await response.text();

  setupLoginForm(); // Attach login-specific event listeners
  document.getElementById('register-link').addEventListener('click', () => {
    renderRegister(content);
  });
}

// Render Register View
export async function renderRegister(content) {
  const response = await fetch('/src/views/register.html');
  content.innerHTML = await response.text();

  setupRegisterForm(); // Attach register-specific event listeners
  document.getElementById('login-link').addEventListener('click', () => {
    renderLogin(content);
  });
}