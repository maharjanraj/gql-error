import { GraphQLError } from 'graphql';

class GError extends GraphQLError {
  constructor(error) {
    super(error);
    this.code = error;
  }
}

export default GError;
