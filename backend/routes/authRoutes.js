const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// Rotas de autenticação
router.post('/register', register); // Rota para registrar um novo usuário
router.post('/login', login);       // Rota para login de um usuário

module.exports = router;
