'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.locales = locales;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var dirname = _path2.default.join(process.cwd(), 'config/locales');

function locales() {
  var lang = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'en';

  if (lang.length > 2) lang = 'en';

  var locales = [];

  _fs2.default.readdirSync(dirname).forEach(function (filename) {
    locales[filename.split('.')[0]] = require(dirname + '/' + filename);
  });

  return locales[lang];
}