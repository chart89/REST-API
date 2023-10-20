const express = require('express');
const app = express();
const router = express.Router();
const SeatsController = require('../controllers/seats.controller');
const { v4: uuidv4 } = require('uuid');
const helmet = require('helmet');

app.use(helmet());

// get all seats
router.get('/seats', SeatsController.getAll);

// get random seats
router.get('/seats/random', SeatsController.getRandom);

// get seats by id
router.get('/seats/:id', SeatsController.getById);

// post new seats
router.post('/seats', SeatsController.postOne);

// update seats
router.put('/seats/:id', SeatsController.putOne);

// delete seats
router.delete('/seats/:id', SeatsController.deleteOne);

module.exports = router;
