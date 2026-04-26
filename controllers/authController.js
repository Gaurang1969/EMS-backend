console.log("authController loaded");
const User = require('../models/User');
const jwt = require('jsonwebtoken');

/* 🔐 REGISTER */
exports.register = async (req, res) => {
  try {
    console.log("register hit", req.body);
    const { name, email, password, role } = req.body;

    // Step 1: Check existing user
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Step 2: Create user (password auto-hashed by model)
    const user = await User.create({ name, email, password, role });

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* 🔐 LOGIN */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Step 1: Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Check password (using model method)
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Wrong password' });
    }

    // Step 3: Create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Step 4: Send response
    res.json({
      token,
      role: user.role,
      name: user.name
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};