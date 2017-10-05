import { GraphQLError } from 'graphql';

class ValidationError extends GraphQLError {
  constructor(errors) {
    super('Invalid request');
    this.code = 'VALIDATION_ERROR';
    this.state = errors;
  }
}

export default ValidationError;
