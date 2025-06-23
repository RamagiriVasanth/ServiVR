const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ msg: 'User already exists' });

    const hashedPwd = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPwd });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// @route   POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user._id, name: user.name, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ✅ NEW: Demo login route
// @route POST /api/auth/demo-login
router.post('/demo-login', async (req, res) => {
  try {
    // Find demo user by email
    let demoUser = await User.findOne({ email: 'demo@servivr.com' });

    // If not exists, create the demo user
    if (!demoUser) {
      const hashedPassword = await bcrypt.hash('demo123', 10); // Password won't be used
      demoUser = await User.create({
        name: 'Demo User',
        email: 'demo@servivr.com',
        password: hashedPassword
      });
    }

    // Create real JWT
    const token = jwt.sign(
      { id: demoUser._id, name: demoUser.name, email: demoUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({ token, user: { name: demoUser.name, email: demoUser.email } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Demo login failed' });
  }
});

module.exports = router;
