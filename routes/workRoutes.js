const express = require('express');
const router = express.Router();
const { work, getwork, upwork, delwork } = require('../controllers/workController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, work);
router.get('/', getwork);
router.put('/:id', authMiddleware, upwork);
router.delete('/:id', authMiddleware, delwork);

module.exports = router;