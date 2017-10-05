import ValidationError from './validationError';
import GError from './gerror';
import { locales } from './locale';
import { has, result } from 'lodash';
import validate from 'validate.js';

const GQLError = {
  validate: (input, rules, options) => {
    let locale = has(options, 'lang') ? locales(options['lang']) : locales(),
      gql = has(options, 'gql') ? options.gql : true;

    for (let rule in rules) {
      for (let type in rules[rule]) {
        if (has(rules[rule][type], 'message')) {
          rules[rule][type]['message'] = result(locale, rules[rule][type]['message']);
        }
      }
    }

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

    let errormsg = result(locale, message);

    if (gql) throw new GError(errormsg)
    else throw new Error(errormsg);
  }
};

export default GQLError;
