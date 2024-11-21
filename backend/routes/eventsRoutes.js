const express = require('express');
const router = express.Router();
const {
  getEvents,
  createEvent,
  getEventById,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, admin } = require('../middlewares/authMiddleware'); // Middleware de autenticação

// Rotas acessíveis para todos os usuários autenticados
router.get('/', protect, getEvents); // Listar todos os eventos
router.get('/:id', protect, getEventById); // Visualizar um evento específico

// Rotas restritas aos administradores
router.post('/', protect, admin, createEvent); // Criar um novo evento
router.put('/:id', protect, admin, updateEvent); // Atualizar um evento existente
router.delete('/:id', protect, admin, deleteEvent); // Deletar um evento

module.exports = router;
