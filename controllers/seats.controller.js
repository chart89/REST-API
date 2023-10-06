const Seat = require('../models/seats.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Seat.find());
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getRandom = async (req, res) => {

    try {
      const count = await Seat.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Seat.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}; 

exports.getById = async (req, res) => {

    try {
      const dep = await Seat.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.postOne = async (req, res) => {

  const { day, seat } = req.body;
    try {
      const NotAvailable =  await Seat.find({ day: day, seat: seat })
      
      if(NotAvailable && NotAvailable.length){
        
        res.json({ message: 'The slot is already taken...' });
      
      } else {
        const newSeat = new Seat({ ...req.body });
        await newSeat.save();
        res.json({ message: 'OK' });
      };
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.putOne = async (req, res) => {
    
  
    try {
      const dep = await Seat.findById(req.params.id);
      if(dep){
      await Seat.updateOne({ _id: req.params.id }, { $set: { ...req.body }});
      const depCh = await Seat.findById(req.params.id);
      res.json(depCh);
      } else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.deleteOne = async (req, res) => {
    try {
      const dep = await Seat.findById(req.params.id);
      if(dep) {
        await Seat.deleteOne({ _id: req.params.id });
        res.json(dep);
      } else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };