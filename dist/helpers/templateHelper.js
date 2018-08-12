'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderTemplate = exports.getTemplatePath = undefined;

var _ejs = require('ejs');

var _ejs2 = _interopRequireDefault(_ejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTemplatePath(templateName) {
  return `${__dirname}/../../public/${templateName}.ejs`;
}

function renderTemplate(templateName, payload) {
  return new Promise((resolve, reject) => {
    _ejs2.default.renderFile(getTemplatePath(templateName), payload, (error, str) => {
      if (error) {
        console.error('template render failed:', error);
        reject(error);
      }
      resolve(str);
    });
  });
}

exports.getTemplatePath = getTemplatePath;
exports.renderTemplate = renderTemplate;