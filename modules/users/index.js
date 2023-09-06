const userRoutes = require('./routes');
const userController = require('./controller/userController');
const User = require('./model/userModel');

module.exports = {
  userRoutes,
  userController,
  User
};