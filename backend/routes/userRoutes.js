const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middlewares/authMiddleware');

const {
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
} = require('../controllers/userController');

router.get('/', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.put('/:id', protect, admin, updateUser);
router.delete('/:id', protect, admin, deleteUser);

module.exports = router;