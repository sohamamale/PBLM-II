const express = require('express');
const router = express.Router();
const { signup, login, getProfile } = require('../controllers/userController');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/signup', signup);
router.post('/login', login);

// Protected routes
router.get('/profile', auth, getProfile);

module.exports = router; 