const User = require('../model/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    let filter = {};

    if (role && (role === 'author' || role === 'commenter')) {
      filter.role = role;
    }

    const users = await User.find(filter);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios', error });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getSelf = async (req, res) => {
  try {
    const user = await User.findById(req.userData.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.createUser = async (req, res) => {
  const newUser = new User(req.body);
  try {
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.updateSelf = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.userData.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};