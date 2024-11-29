const User = require('../models/User');
const asyncHandler = require('express-async-handler');

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select('-password'); // Exclui o campo senha da resposta
  res.status(200).json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  await User.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: 'User deleted successfully' });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.role = req.body.role || user.role;

  const updatedUser = await user.save();
  res.status(200).json(updatedUser);
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password'); // Exclui o campo senha da resposta

  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.status(200).json(user);
});

module.exports = {
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
};