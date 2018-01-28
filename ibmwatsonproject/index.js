/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 14);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("watson-developer-cloud");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("vcap_services");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// dependencies
var apiRoutes = (0, _express2.default)(); // This will hold all the API routes for the application
exports.default = apiRoutes;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _fs = __webpack_require__(5);

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webRoutes = (0, _express2.default)();

webRoutes.get('/', function (req, res) {

	res.render('index');
});

exports.default = webRoutes;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var watson = __webpack_require__(0); // watson sdk

// Create the service wrapper
var conversation = watson.conversation({
  // If unspecified here, the CONVERSATION_USERNAME and CONVERSATION_PASSWORD env properties will be checked
  // After that, the SDK will fall back to the bluemix-provided VCAP_SERVICES environment property
  // username: '<username>',
  // password: '<password>',
  version_date: '2016-10-21',
  version: 'v1'
});

var updateMessage = function updateMessage(input, response) {
  var responseText = null;
  if (!response.output) {
    response.output = {};
  } else {
    return response;
  }
  if (response.intents && response.intents[0]) {
    var intent = response.intents[0];
    // Depending on the confidence of the response the app can return different messages.
    // The confidence will vary depending on how well the system is trained. The service will always try to assign
    // a class/intent to the input. If the confidence is low, then it suggests the service is unsure of the
    // user's intent . In these cases it is usually best to return a disambiguation message
    // ('I did not understand your intent, please rephrase your question', etc..)
    if (intent.confidence >= 0.75) {
      responseText = 'I understood your intent was ' + intent.intent;
    } else if (intent.confidence >= 0.5) {
      responseText = 'I think your intent was ' + intent.intent;
    } else {
      responseText = 'I did not understand your intent';
    }
  }
  response.output.text = responseText;
  return response;
};

module.exports = function (app) {

  app.post('/api/message', function (req, res, next) {
    var workspace = process.env.WORKSPACE_ID || '<workspace-id>';
    if (!workspace || workspace === '<workspace-id>') {
      return res.json({
        output: {
          text: 'The app has not been configured with a <b>WORKSPACE_ID</b> environment variable. Please refer to the ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple">README</a> ' + 'documentation on how to set this variable. <br>' + 'Once a workspace has been defined the intents may be imported from ' + '<a href="https://github.com/watson-developer-cloud/conversation-simple/blob/master/training/car_workspace.json">here</a> ' + 'in order to get a working application.'
        }
      });
    }
    var payload = {
      workspace_id: workspace,
      context: req.body.context || {},
      input: req.body.input || {}
    };

    // Send the input to the conversation service
    conversation.message(payload, function (error, data) {
      if (error) {
        return next(error);
      }
      return res.json(updateMessage(payload, data));
    });
  });
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var watson = __webpack_require__(0);
var vcapServices = __webpack_require__(2);

var credentials = Object.assign({
  username: process.env.SPEECH_TO_TEXT_USERNAME,
  password: process.env.SPEECH_TO_TEXT_PASSWORD,
  url: process.env.SPEECH_TO_TEXT_URL || 'https://stream.watsonplatform.net/speech-to-text/api',
  version: 'v1'
}, vcapServices.getCredentials('speech_to_text'));

var authorizationService = watson.authorization(credentials);

// Inform user that TTS is not configured properly or at all
if (!credentials || !credentials.username) {
  // eslint-disable-next-line
  console.warn('WARNING: The app has not been configured with a SPEECH_TO_TEXT_USERNAME and/or ' + 'a SPEECH_TO_TEXT_PASSWORD environment variable. If you wish to have text to speech ' + 'in your working application, please refer to the https://github.com/watson-developer-cloud/car-dashboard ' + 'README documentation on how to set these variables.');
}

module.exports = function initTextToSpeech(app) {
  app.get('/api/speech-to-text/token', function (req, res, next) {
    return authorizationService.getToken({ url: credentials.url }, function (error, token) {
      if (error) {
        if (error.code !== 401) return next(error);
      } else {
        res.send(token);
      }
    });
  });
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var watson = __webpack_require__(0);
var vcapServices = __webpack_require__(2);

var credentials = Object.assign({
  username: process.env.TEXT_TO_SPEECH_USERNAME,
  password: process.env.TEXT_TO_SPEECH_PASSWORD,
  url: process.env.TEXT_TO_SPEECH_URL || 'https://stream.watsonplatform.net/text-to-speech/api',
  version: 'v1'
}, vcapServices.getCredentials('text_to_speech'));

var authorizationService = watson.authorization(credentials);

// Inform user that TTS is not configured properly or at all
if (!credentials || !credentials.username) {
  // eslint-disable-next-line
  console.warn('WARNING: The app has not been configured with a TEXT_TO_SPEECH_USERNAME and/or ' + 'a TEXT_TO_SPEECH_PASSWORD environment variable. If you wish to have text to speech ' + 'in your working application, please refer to the https://github.com/watson-developer-cloud/car-dashboard ' + 'README documentation on how to set these variables.');
}

module.exports = function initSpeechToText(app) {
  app.get('/api/text-to-speech/token', function (req, res, next) {
    return authorizationService.getToken({ url: credentials.url }, function (error, token) {
      if (error) {
        if (error.code !== 401) return next(error);
      } else {
        res.send(token);
      }
    });
  });
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__dirname) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dotenv = __webpack_require__(10);

var _dotenv2 = _interopRequireDefault(_dotenv);

var _express = __webpack_require__(1);

var _express2 = _interopRequireDefault(_express);

var _bodyParser = __webpack_require__(11);

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _path = __webpack_require__(12);

var _path2 = _interopRequireDefault(_path);

var _ejs = __webpack_require__(13);

var _ejs2 = _interopRequireDefault(_ejs);

var _api = __webpack_require__(3);

var _api2 = _interopRequireDefault(_api);

var _web = __webpack_require__(4);

var _web2 = _interopRequireDefault(_web);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// REQUIRE .env FILE

// CUSTOM FILES
_dotenv2.default.config();

// NEW EXPRESS APP INSTANTIATION
// NPM DEPENDENCIES
var app = (0, _express2.default)();

// USE EJS
app.set('view engine', 'ejs');

// SET UP APP USE
app.use(_express2.default.static('./public'));
app.use(_bodyParser2.default.urlencoded({ extended: false }));
app.use(_bodyParser2.default.json());

// Use API routes
app.use('/api', _api2.default);

// Use Web routes
app.use('/', _web2.default);

// Configure the Watson services
__webpack_require__(6)(app);
__webpack_require__(7)(app);
__webpack_require__(8)(app);

// require()

app.use('/assets', _express2.default.static("public"));
console.log(__dirname + "views/css");

exports.default = app;
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("ejs");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(9);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_app2.default.listen(process.env.PORT || 5000, function () {
	console.log('Listening');
});

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map