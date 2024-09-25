const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signinController');

router.post('/', signinController.handleLogin);

module.exports = router;