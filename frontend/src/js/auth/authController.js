import { setupLoginForm } from './login.js';
import { setupRegisterForm } from './register.js';

// Render Login View
export async function renderLogin(content) {
  const response = await fetch('../../views/login.html');
  content.innerHTML = await response.text();

  setupLoginForm();
  document.getElementById('register-link').addEventListener('click', () => {
    renderRegister(content);
  });
}

export async function renderRegister(content) {
  const response = await fetch('../../views/register.html');
  content.innerHTML = await response.text();

  setupRegisterForm();
  document.getElementById('login-link').addEventListener('click', () => {
    renderLogin(content);
  });
}