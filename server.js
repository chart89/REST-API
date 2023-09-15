const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concertst routes to server
app.use('/api', seatsRoutes); // add seats routes to server

app.use((req, res) => {
    res.status(404).json(db.messageStatus[1]);
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});