const express = require('express');
const router = express.Router();
const textToSpeech = require('../controllers/textToSpeech');

router.post('/audio', textToSpeech.synthesizeTextToSpeechs);

module.exports = router;