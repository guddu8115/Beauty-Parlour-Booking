const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// ✅ Hardcoded — no process.env needed
const JWT_SECRET = 'beauty_parlor_secret_2024';

// REGISTER
router.post('/register', async (req, res) => {
  try {
    console.log('📥 Register body:', req.body);
    const { name, email, password, phone } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ message: 'Email already registered. Please login.' });
    }

    // Hash password in route (not in model)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      phone: phone ? phone.trim() : ''
    });

    await user.save();
    console.log('✅ Registered:', user.email);
    res.status(201).json({ message: 'Registration successful! Please login.' });

  } catch (err) {
    console.error('❌ Register error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    console.log('📥 Login body:', req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(400).json({ message: 'No account found with this email' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // ✅ Uses hardcoded secret — no env issue
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ Login:', user.email, '| Role:', user.role);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });

  } catch (err) {
    console.error('❌ Login error:', err.message);
    res.status(500).json({ message: 'Server error: ' + err.message });
  }
});

module.exports = router;