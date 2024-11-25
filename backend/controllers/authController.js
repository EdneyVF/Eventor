const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// Registrar usuário
const register = asyncHandler(async (req, res) => {
  // Correct destructuring from req.body
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
      res.status(400).json({ message: 'Please add all fields' });
      return;
  }
  
  const userExists = await User.findOne({ email });
  if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
  }

  const user = await User.create({
      name,
      email,
      password,
  });

  if (user) {
      res.status(201).json({
          id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user._id),
      });
  } else {
      res.status(400).json({ message: 'Invalid user data' });
  }
});

// Login de usuário
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

// Gerar token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { register, login };
