const express = require('express');
const router = express.Router();
const WorkshopsController = require('../controllers/workshops.controller');

// get all concerts
router.get('/workshops', WorkshopsController.getAll);

module.exports = router;