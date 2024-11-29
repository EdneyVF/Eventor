const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async (req, res) => {
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

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = { register, login };