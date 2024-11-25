import { renderLogin, renderRegister } from './js/auth/authController.js';

const content = document.getElementById('content');

// Initial Render: Load Login
renderLogin(content);