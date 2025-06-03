const express = require('express');
const router = express.Router();
const { createuser, login, logout, verification } = require('../controllers/authController');
const authMiddleware = require('../middleware/auth');

router.post('/createuser', createuser);
router.post('/login', login);
router.post('/logout', logout);
router.get('/verification', authMiddleware, verification);

module.exports = router;