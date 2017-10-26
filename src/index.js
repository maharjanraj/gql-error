import ValidationError from './validationError';
import GError from './gerror';
import { locales } from './locale';
import { has, result } from 'lodash';
import validate from 'validate.js';

// Custom validator for array
validate.validators.each = (value, rules, key, attributes) => {
  // Allow null and undefined values
  if (!validate.isDefined(value)) {
    return;
  }

  if (!validate.isArray(value)) {
    return "must be an array";
  }

  let errors = [];

  value.forEach((data, i) => {
    let error = validate(data, rules, { fullMessages: false })
    if (error) errors.push(error);
  });

  if (errors.length > 0) return errors;
  else return;
};

const GQLError = {
  validate: (input, rules, options) => {
    let locale = has(options, 'lang') ? locales(options['lang']) : locales(),
      gql = has(options, 'gql') ? options.gql : true;

    rules = GQLError.localize(locale, rules);

    let errors = validate(input, rules, { fullMessages: false });

    if (errors) {
      if (gql)
        throw new ValidationError(errors)
      else
        throw new Error(JSON.stringify(errors));
    }
  },

  error: (message, options) => {
    let locale = has(options, 'lang') ? locales(options['lang']) : locales(),
      gql = has(options, 'gql') ? options.gql : true;

    let errormsg = result(locale, message, message);

    if (gql) throw new GError(errormsg)
    else throw new Error(errormsg);
  },

  localize: (locale, rules) => {

    for (let rule in rules) {
      if (!has(rules[rule], 'message') && typeof(rules[rule] == 'object')) {
        rules[rule] = GQLError.localize(locale, rules[rule]);
      }
      if (has(rules[rule], 'message')) {
        rules[rule]['message'] = result(locale, rules[rule]['message'], rules[rule]['message']);
      }
    }

    return rules;
  }
};

module.exports = GQLError;

