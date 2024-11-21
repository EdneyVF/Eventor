const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');

const {
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
} = require('../controllers/userController');

// Rotas protegidas para administradores
router.get('/', protect, admin, getUsers);            // Listar usuários
router.get('/:id', protect, admin, getUserById);      // Obter usuário específico
router.put('/:id', protect, admin, updateUser);       // Atualizar usuário
router.delete('/:id', protect, admin, deleteUser);    // Deletar usuário

module.exports = router;
