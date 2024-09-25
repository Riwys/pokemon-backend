const express = require('express');
const router = express.Router();
const entryController = require('../controllers/entryController');

router.put('/', entryController.updateEntry);

module.exports = router;