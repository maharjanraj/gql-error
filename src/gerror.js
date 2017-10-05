import { GraphQLError } from 'graphql';

class GError extends GraphQLError {
  constructor(error) {
    super(error);
    this.code = 'BAD_REQUEST';
  }
}

export default GError;
