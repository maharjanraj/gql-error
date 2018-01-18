'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _validationError = require('./validationError');

var _validationError2 = _interopRequireDefault(_validationError);

var _gerror = require('./gerror');

var _gerror2 = _interopRequireDefault(_gerror);

var _locale = require('./locale');

var _lodash = require('lodash');

var _validate2 = require('validate.js');

var _validate3 = _interopRequireDefault(_validate2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Custom validator for array
_validate3.default.validators.each = function (value, rules, key, attributes) {
  // Allow null and undefined values
  if (!_validate3.default.isDefined(value)) {
    return;
  }

  if (!_validate3.default.isArray(value)) {
    return "must be an array";
  }

  var errors = [];

  value.forEach(function (data, i) {
    var error = (0, _validate3.default)(data, rules, { fullMessages: false });
    if (error) errors.push(error);
  });

  if (errors.length > 0) return errors;else return;
};

var GQLError = {
  validate: function validate(input, rules, options) {
    var locale = (0, _lodash.has)(options, 'lang') ? (0, _locale.locales)(options['lang']) : (0, _locale.locales)(),
        gql = (0, _lodash.has)(options, 'gql') ? options.gql : true;

    rules = GQLError.localizeRules(locale, rules);

    var errors = (0, _validate3.default)(input, rules, { fullMessages: false });

    if (errors) {
      if (gql) throw new _validationError2.default(errors);else throw new Error(JSON.stringify(errors));
    }
  },

  error: function error(message, options) {
    var locale = (0, _lodash.has)(options, 'lang') ? (0, _locale.locales)(options['lang']) : (0, _locale.locales)(),
        gql = (0, _lodash.has)(options, 'gql') ? options.gql : true;

    var errormsg = (0, _lodash.result)(locale, message, message);

    if (gql) throw new _gerror2.default(errormsg);else throw new Error(errormsg);
  },

  localizeString: function localizeString(message, options) {
    var locale = (0, _lodash.has)(options, 'lang') ? (0, _locale.locales)(options['lang']) : (0, _locale.locales)();

    return (0, _lodash.result)(locale, message, message);
  },

  localizeRules: function localizeRules(locale, rules) {
    for (var rule in rules) {
      if (!(0, _lodash.has)(rules[rule], 'message') && _typeof(rules[rule] == 'object')) {
        rules[rule] = GQLError.localizeRules(locale, rules[rule]);
      }
      if ((0, _lodash.has)(rules[rule], 'message')) {
        rules[rule]['message'] = (0, _lodash.result)(locale, rules[rule]['message'], rules[rule]['message']);
      }
    }

    return rules;
  }
};

module.exports = GQLError;