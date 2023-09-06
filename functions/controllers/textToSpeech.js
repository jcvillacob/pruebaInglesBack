const textToSpeech = require('../function/textToSpeech')

exports.synthesizeTextToSpeechs = async (req, res) => {
  try {
    const synthesizeTextToSpeechs = await textToSpeech.synthesizeTextToSpeech(req)
    // Envía la respuesta
    res.set({
      'Content-Type': 'audio/mpeg',
      'Content-Length': synthesizeTextToSpeechs.length
    });
    res.send(synthesizeTextToSpeechs);
  } catch (error) {
    console.error('Error al obtener la audio (controller):', error);
    res.status(500).json({ error: 'Error al obtener el audio (controller)' });
  }
}