'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validationError = require('./validationError');

var _validationError2 = _interopRequireDefault(_validationError);

var _gerror = require('./gerror');

var _gerror2 = _interopRequireDefault(_gerror);

var _locale = require('./locale');

var _lodash = require('lodash');

var _validate2 = require('validate.js');

var _validate3 = _interopRequireDefault(_validate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GQLError = {
  validate: function validate(input, rules, options) {
    var locale = (0, _lodash.has)(options, 'lang') ? (0, _locale.locales)(options['lang']) : (0, _locale.locales)(),
        gql = (0, _lodash.has)(options, 'gql') ? options.gql : true;

    for (var rule in rules) {
      for (var type in rules[rule]) {
        if ((0, _lodash.has)(rules[rule][type], 'message')) {
          rules[rule][type]['message'] = (0, _lodash.result)(locale, rules[rule][type]['message']);
        }
      }
    }

    var errors = (0, _validate3.default)(input, rules, { fullMessages: false });

    if (errors) {
      if (gql) throw new _validationError2.default(errors);else throw new Error(JSON.stringify(errors));
    }
  },

  error: function error(message, options) {
    var locale = (0, _lodash.has)(options, 'lang') ? (0, _locale.locales)(options['lang']) : (0, _locale.locales)(),
        gql = (0, _lodash.has)(options, 'gql') ? options.gql : true;

    var errormsg = (0, _lodash.result)(locale, message);

    if (gql) throw new _gerror2.default(errormsg);else throw new Error(errormsg);
  }
};

exports.default = GQLError;