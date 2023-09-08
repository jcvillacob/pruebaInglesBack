const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    content: { type: String, default: 'Hola Mundo', required: true },
    audio: { type: String},
    sender: { type: String, enum: ['user', 'bot'], required: true },
    timestamp: { type: Date, default: Date.now }
});

const ConversationSchema = new Schema({
    name: { type: String, required: true, default: 'Nueva Conversación'},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    messages: [MessageSchema],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Conversation', ConversationSchema);