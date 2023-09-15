const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// get all concerts
router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});

// get random concerts
router.route('/concerts/random').get((req, res) => {
    res.json(db.concerts[Math.floor(Math.random() * db.concerts.length)]);
});

// get concerts by id

router.route('/concerts/:id').get((req, res) => {
    for(let findId of db.concerts) {
        if(req.params.id === findId.id) {
            res.json(findId)
        };
    };
});

// post new concerts
 router.route('/concerts').post((req, res) => {

    const id = uuidv4();
    db.concerts.push({id: id, ...req.body }),
    res.json(db.messageStatus[0]);
});

// update concerts

router.route('/concerts/:id').put((req, res) => {

    for(let findId of db.concerts) {
        if(req.params.id === findId.id) {
            db.concerts[db.concerts.indexOf(findId)] = {id: findId.id, ...req.body};
            res.json(db.messageStatus[0]);
        };
    };
});

// delete concerts

router.route('/concerts/:id').delete((req, res) => {

    for(let findId of db.concerts) {
        if(req.params.id === findId.id) {
            db.concerts.splice(db.concerts.indexOf(findId), 1);
            res.json(db.messageStatus[0]);
        };
    };
});


module.exports = router;
