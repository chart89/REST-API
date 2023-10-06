const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const socket = require('socket.io');

// import Mongoose
const mongoose = require('mongoose');

// import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', testimonialsRoutes); // add testimonials routes to server
app.use('/api', concertsRoutes); // add concertst routes to server
app.use('/api', seatsRoutes); // add seats routes to server

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


app.use((req, res) => {
    res.status(404).json({message: 'Not found...'});
  })

// connects our backend code with the database
mongoose.connect('mongodb+srv://kaiju83:HaloMasterChief117@cluster0.3qxxs4z.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });

const io = socket(server);

io.on('connection', (socket) => {

  console.log('New client! Its id – ', socket.id);
});