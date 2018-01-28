var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var fs = require('fs');
var string_for_watson = 'Hey Nick, the Iphone X really is nothing special';
var text_to_speech = new TextToSpeechV1({
  "url": "https://stream.watsonplatform.net/text-to-speech/api",
  "username": "0ce49d7f-3020-412d-b5ae-d96e8d470f44",
  "password": "xxXuPb0u1HSA",
  "headers" : {
    'X-Watson-Learning-Opt-Out': 'true'
  }
});

var params = {
  text: string_for_watson,
  voice: 'en-US_MichaelVoice',
  accept: 'audio/wav'
};

text_to_speech.getVoice(params, function(error, voice){
  if (error)
    console.log('Error: ', error);
    else {
    //  console.log(JSON.stringify(voice, null, 2));
      console.log('ok works');
    }
})


text_to_speech.synthesize(params).on('error', function(error){
  console.log('Error:', error);
}).pipe(fs.createWriteStream('speech.wav'));
