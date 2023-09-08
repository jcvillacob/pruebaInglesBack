const Conversation = require('../model/conversationModel');


exports.getSelfConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({ userId: req.userData.userId });
        res.status(200).json(conversations);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.getConversationsList = async (req, res) => {
    try {
        // Proyección: solo devuelve el campo 'name' y el '_id' (que se devuelve por defecto)
        const conversations = await Conversation.find({}, 'name');

        res.status(200).json(conversations);
    } catch (err) {
        res.status(500).send(err);
    }
}

exports.getConversationById = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        res.status(200).json(conversation);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.createConversation = async (req, res) => {
    const newConversation = new Conversation(req.body);
    newConversation.userId = req.userData.userId;
    try {
        const conversation = await newConversation.save();
        res.status(201).json(conversation);
    } catch (err) {
        res.status(500).send(err);
    }
};

exports.addMessageToConversation = async (req, res) => {
    let audio = "";
    if (req.file) {
        // Convierte el audio a base64
        audio = Buffer.from(req.file.buffer).toString('base64');
    }

    const { content } = req.body;

    // Creación del mensaje autor 
    const newMessage = { content, audio, sender: 'user', timestamp: Date.now() };
    // Creación del mensaje bot
    const newMessage2 = { content, audio, sender: 'bot', timestamp: Date.now() };

    try {
        // Encuentra la conversación por ID y actualízala
        const conversation = await Conversation.findById(req.params.id);

        // Si la conversación no existe, devuelve un error
        if (!conversation) {
            return res.status(404).send('Conversación no encontrada.');
        }

        // En caso de que la persona que haga la solicitud no es la de la conversación
        if (String(conversation.userId) != req.userData.userId) {
            return res.status(403).send('No tienes permisos para eliminar esta conversación.');
        }

        // Añade el nuevo mensaje a la conversación
        conversation.messages.push(newMessage);
        conversation.messages.push(newMessage2);


        conversation.updatedAt = Date.now();
        await conversation.save();
        res.status(200).json(conversation);

    } catch (err) {
        res.status(500).send(err);
    }
};

exports.deleteConversation = async (req, res) => {
    try {
        const conversation = await Conversation.findById(req.params.id);
        if (!conversation) {
            return res.status(404).send('Conversación no encontrada.');
        }
        if (String(conversation.userId) != req.userData.userId) {
            return res.status(403).send('No tienes permisos para eliminar esta conversación.');
        }
        await conversation.deleteOne();

        res.status(204).send();

    } catch (err) {
        res.status(500).send(err);
    }
};
