const watson = require('watson-developer-cloud');
const vcapServices = require('vcap_services');

const credentials = Object.assign({
  username: process.env.SPEECH_TO_TEXT_USERNAME,
  password: process.env.SPEECH_TO_TEXT_PASSWORD,
  url: process.env.SPEECH_TO_TEXT_URL || 'https://stream.watsonplatform.net/speech-to-text/api',
  version: 'v1'
}, vcapServices.getCredentials('speech_to_text'));

const authorizationService = watson.authorization(credentials);


// Inform user that TTS is not configured properly or at all
if (!credentials || !credentials.username) {
  // eslint-disable-next-line
  console.warn('WARNING: The app has not been configured with a SPEECH_TO_TEXT_USERNAME and/or ' +
    'a SPEECH_TO_TEXT_PASSWORD environment variable. If you wish to have text to speech ' +
    'in your working application, please refer to the https://github.com/watson-developer-cloud/car-dashboard ' +
    'README documentation on how to set these variables.');
}


module.exports = function initTextToSpeech(app) {
  app.get('/api/speech-to-text/token', (req, res, next) =>
    authorizationService.getToken({ url: credentials.url }, (error, token) => {
      if (error) {
        if (error.code !== 401)
          return next(error);
      } else {
        res.send(token);
      }
    })
  );
};
