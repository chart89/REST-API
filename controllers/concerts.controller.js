const Concert = require('../models/concerts.model');

exports.getAll = async (req, res) => {
    try {
      res.json(await Concert.find().populate('workshop'));
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.getRandom = async (req, res) => {

    try {
      const count = await Concert.countDocuments();
      const rand = Math.floor(Math.random() * count);
      const dep = await Concert.findOne().skip(rand);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
}; 

exports.getById = async (req, res) => {

    try {
      const dep = await Concert.findById(req.params.id);
      if(!dep) res.status(404).json({ message: 'Not found' });
      else res.json(dep);
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.postOne = async (req, res) => {

    try {
  
      const newConcert = new Concert({ ...req.body });
      await newConcert.save();
      res.json({ message: 'OK' });
  
    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.putOne = async (req, res) => {
    
  
    try {
      const dep = await Concert.findById(req.params.id);
      if(dep){
      await Concert.updateOne({ _id: req.params.id }, { $set: { ...req.body }});
      const depCh = await Concert.findById(req.params.id);
      res.json(depCh);
      } else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };

  exports.deleteOne = async (req, res) => {
    try {
      const dep = await Concert.findById(req.params.id);
      if(dep) {
        await Concert.deleteOne({ _id: req.params.id });
        res.json(dep);
      } else res.status(404).json({ message: 'Not found...' });
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
  };