const watson = require('watson-developer-cloud');
const vcapServices = require('vcap_services');

const credentials = Object.assign({
  username: process.env.TEXT_TO_SPEECH_USERNAME,
  password: process.env.TEXT_TO_SPEECH_PASSWORD,
  url: process.env.TEXT_TO_SPEECH_URL || 'https://stream.watsonplatform.net/text-to-speech/api',
  version: 'v1'
}, vcapServices.getCredentials('text_to_speech'));

const authorizationService = watson.authorization(credentials);


// Inform user that TTS is not configured properly or at all
if (!credentials || !credentials.username) {
  // eslint-disable-next-line
  console.warn('WARNING: The app has not been configured with a TEXT_TO_SPEECH_USERNAME and/or ' +
    'a TEXT_TO_SPEECH_PASSWORD environment variable. If you wish to have text to speech ' +
    'in your working application, please refer to the https://github.com/watson-developer-cloud/car-dashboard ' +
    'README documentation on how to set these variables.');
}

module.exports = function initSpeechToText(app) {
  app.get('/api/text-to-speech/token', (req, res, next) =>
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
