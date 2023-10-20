const express = require('express');
const app = express();
const router = express.Router();
const WorkshopsController = require('../controllers/workshops.controller');
const helmet = require('helmet');

app.use(helmet());

// get all concerts
router.get('/workshops', WorkshopsController.getAll);

module.exports = router;