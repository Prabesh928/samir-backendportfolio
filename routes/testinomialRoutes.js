const express = require('express');
const router = express.Router();
const { testinomial, gettestinomial, uptestinomial, deltestinomial } = require('../controllers/testinomialController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, testinomial);
router.get('/', gettestinomial);
router.put('/:id', authMiddleware, uptestinomial);
router.delete('/:id', authMiddleware, deltestinomial);

module.exports = router;