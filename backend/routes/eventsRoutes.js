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

router.get('/', getEvents);
router.get('/:id', getEventById);

router.post('/', protect, admin, createEvent);
router.put('/:id', protect, admin, updateEvent);
router.delete('/:id', protect, admin, deleteEvent);

module.exports = router;
