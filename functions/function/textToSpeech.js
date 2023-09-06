const textToSpeech = require('@google-cloud/text-to-speech');
const util = require('util');

const client = new textToSpeech.TextToSpeechClient();

exports.synthesizeTextToSpeech = async (req) => {
  try {
    const { textToConvert, voiceName = 'en-US-Standard-F' } = req.body;

    const inputText = { text: textToConvert };

    const voice = { languageCode: 'en-US', name: voiceName, ssmlGender: 'FEMALE' };

    const audioConfig = { audioEncoding: 'MP3' };

    const [response] = await client.synthesizeSpeech({
      input: inputText,
      voice: voice,
      audioConfig: audioConfig
    });

    // Retorna el contenido de audio
    return response.audioContent;

  } catch (error) {
    console.error('Error al obtener el audio:', error);
    return { error: 'Error al obtener el audio' };
  }
};
