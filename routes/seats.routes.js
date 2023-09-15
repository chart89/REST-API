const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// get all seats
router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

// get random seats
router.route('/seats/random').get((req, res) => {
    res.json(db.seats[Math.floor(Math.random() * db.seats.length)]);
});

// get seats by id

router.route('/seats/:id').get((req, res) => {
    for(let findId of db.seats) {
        if(req.params.id === findId.id) {
            res.json(findId)
        };
    };
});

// post new seats
 router.route('/seats').post((req, res) => {

    const id = uuidv4();
    db.seats.push({id: id, ...req.body }),
    res.json(db.messageStatus[0]);
});

// update seats

router.route('/seats/:id').put((req, res) => {

    for(let findId of db.seats) {
        if(req.params.id === findId.id) {
            db.seats[db.seats.indexOf(findId)] = {id: findId.id, ...req.body};
            res.json(db.messageStatus[0]);
        };
    };
});

// delete seats

router.route('/seats/:id').delete((req, res) => {

    for(let findId of db.seats) {
        if(req.params.id === findId.id) {
            db.seats.splice(db.seats.indexOf(findId), 1);
            res.json(db.messageStatus[0]);
        };
    };
});


module.exports = router;
