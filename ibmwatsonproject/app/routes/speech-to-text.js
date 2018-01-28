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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("watson-developer-cloud");

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports) {

module.exports = require("vcap_services");

/***/ }),
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
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

/***/ })
/******/ ]);
//# sourceMappingURL=speech-to-text.js.map