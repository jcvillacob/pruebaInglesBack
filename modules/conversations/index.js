const conversationRoutes = require('./routes');
const conversationController = require('./controller/conversationController');
const Conversation = require('./model/conversationModel');

module.exports = {
  conversationRoutes,
  conversationController,
  Conversation
};