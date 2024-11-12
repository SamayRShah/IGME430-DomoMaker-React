const models = require('../models');

const { Domo } = models;

const makerPage = async (req, res) => {
  res.render('app');
};

const makeDomo = async (req, res) => {
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required' });
  }
  const domoData = {
    name: req.body.name,
    age: req.body.age,
    level: req.body.level,
    owner: req.session.account._id,
  };
  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
    return res
      .status(201)
      .json({ name: newDomo.name, age: newDomo.age, level: newDomo.level });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Domo already exists' });
    }
    return res.status(500).json({ error: 'An error occured making domo!' });
  }
};

const updateDomo = async (req, res) => {
  if (!req.params._id) {
    return res.status(400).json({ error: 'Requires Domo ID' });
  }

  try {
    if (!req.body.name && !req.body.age && !req.body.level) {
      return res.status(400).json({ error: 'Nothing to update!' });
    }
    const prevDomo = await Domo.findById(req.params._id);
    if (!prevDomo) {
      res.status(404).json({ error: 'Domo not found' });
      return false;
    }
    if (!prevDomo.owner.equals(req.session.account._id)) {
      res.status(403).json({ error: 'Not your Domo' });
      return false;
    }

    const domoUpdates = {};
    if (req.body.name) domoUpdates.name = req.body.name;
    if (req.body.age) domoUpdates.age = req.body.age;
    if (req.body.level) domoUpdates.level = req.body.level;
    const oldDomo = prevDomo.toObject();
    const updatedDomo = Object.assign(prevDomo, domoUpdates);
    await updatedDomo.save();

    res.status(201).json({
      prev: {
        name: oldDomo.name,
        age: oldDomo.age,
        level: oldDomo.level,
      },
      new: {
        name: updatedDomo.name,
        age: updatedDomo.age,
        level: updatedDomo.level,
      },
    });
    return false;
  } catch (err) {
    return res.status(500).json({ error: 'An error occured updating domo!' });
  }
};

const deleteDomo = async (req, res) => {
  if (!req.params._id) {
    return res.status(404).json({ error: 'No Domo to Delete' });
  }
  try {
    const { _id } = req.params;
    const checkDomo = await Domo.findById({ _id });
    if (!checkDomo.owner.equals(req.session.account._id)) {
      res.status(403).json({ error: 'Not ur domo!' });
      return false;
    }
    console.log(_id);
    const deletedDomo = await Domo.findOneAndDelete(
      { _id },
      { select: 'name age level' },
    );
    return res.status(201).json(deletedDomo);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getDomos = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query)
      .select('_id name age level')
      .lean()
      .exec();
    return res.json({ domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
};

module.exports = {
  makerPage,
  makeDomo,
  getDomos,
  updateDomo,
  deleteDomo,
};
