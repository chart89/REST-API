const express = require('express');
const router = express.Router();
const app = express();

const TestimonialsController = require('../controllers/testimonials.controller');
const helmet = require('helmet');

app.use(helmet());


// get all testimonials
router.get('/testimonials', TestimonialsController.getAll);


// get random testimonials
router.get('/testimonials/random', TestimonialsController.getRandom);


// get testimonials by id
router.get('/testimonials/:id', TestimonialsController.getById);


// post new testimonials
router.post('/testimonials', TestimonialsController.postOne);


// update testimonials
router.put('/testimonials/:id', TestimonialsController.putOne);


// delete testimonials
router.delete('/testimonials/:id', TestimonialsController.deleteOne);

module.exports = router;
