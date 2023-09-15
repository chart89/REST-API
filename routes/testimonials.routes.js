const express = require('express');
const router = express.Router();
const db = require('../db');
const { v4: uuidv4 } = require('uuid');

// get all testimonials
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});

// get random testimonials
router.route('/testimonials/random').get((req, res) => {
    res.json(db.testimonials[Math.floor(Math.random() * db.testimonials.length)]);
});

// get testimonials by id

router.route('/testimonials/:id').get((req, res) => {
    for(let findId of db.testimonials) {
        if(req.params.id === findId.id) {
            res.json(findId)
        };
    };
});

// post new testimonials
 router.route('/testimonials').post((req, res) => {

    const id = uuidv4();
    db.testimonials.push({id: id, ...req.body }),
    res.json(db.messageStatus[0]);
});

// update testimonials

router.route('/testimonials/:id').put((req, res) => {

    for(let findId of db.testimonials) {
        if(req.params.id === findId.id) {
            db.testimonials[db.testimonials.indexOf(findId)] = {id: findId.id, ...req.body};
            res.json(db.messageStatus[0]);
        };
    };
});

// delete testimonials

router.route('/testimonials/:id').delete((req, res) => {

    for(let findId of db.testimonials) {
        if(req.params.id === findId.id) {
            db.testimonials.splice(db.testimonials.indexOf(findId), 1);
            res.json(db.messageStatus[0]);
        };
    };
});


module.exports = router;
