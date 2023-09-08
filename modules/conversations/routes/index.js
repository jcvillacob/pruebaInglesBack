const express = require('express');
const multer = require('multer');
const router = express.Router();
const conversationController = require('../controller/conversationController');
const auth = require('../../../midleware/auth');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Permitir que cualquiera cree un nuevo usuario
router.post('/', auth.auth, conversationController.createConversation);

// Permitir que cualquiera cree un nuevo usuario
router.get('/', auth.auth, conversationController.getConversationsList);

// Rutas para que los usuarios de rol "admin" puedan ver, editar y eliminar a todos los usuarios
router.get('/:id', auth.auth, conversationController.getConversationById);
router.put('/:id', auth.auth, upload.single('audio'), conversationController.addMessageToConversation);
router.delete('/:id', auth.auth, conversationController.deleteConversation);

module.exports = router;