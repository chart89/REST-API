const express = require('express');
const router = express.Router();
const ConcertsController = require('../controllers/concerts.controller');

// get all concerts
router.get('/concerts', ConcertsController.getAll);

// get random concerts
router.get('/concerts/random', ConcertsController.getRandom);

// get concerts by id
router.get('/concerts/:id', ConcertsController.getById);


// post new concerts
router.post('/concerts', ConcertsController.postOne);

// update concerts
router.put('/concerts/:id', ConcertsController.putOne);


// delete concerts
router.delete('/concerts/:id', ConcertsController.deleteOne);

module.exports = router;
