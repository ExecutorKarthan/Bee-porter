const { GraphQLError } = require('graphql'); // Import GraphQLError from graphql package
const jwt = require('jsonwebtoken'); // Import jsonwebtoken package for JWT functionality
// Define secret key and expiration time for JWT tokens
const secret = 'mysecretssshhhhhhh';
const expiration = '2h';
// Export authentication error and authentication middleware functions
module.exports = {
  // Define an AuthenticationError for unauthenticated users
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED', // Define error code for authentication errors
    },
  }),
  // Define middleware function for authentication
  authMiddleware: function ({ req }) {
    // Retrieve token from request body, query, or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // Check if token is present in authorization header
    if (req.headers.authorization) {
      // Extract token value from "Bearer <token>" format
      token = token.split(' ').pop().trim();
    }
    // If token is not present, return the request object
    if (!token) {
      return req;
    }

    try {
      // Verify the token and extract user data
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      // Attach user data to the request object
      req.user = data;
    } catch {
      console.log('Invalid token'); // Log error message for invalid tokens
    }

    return req;
  },
  // Define function to sign JWT tokens
  signToken: function ({ firstName, lastName, email, _id, zipcode }) {
    const payload = { firstName, lastName, email, _id, zipcode };
    // Sign JWT token with payload, secret key, and expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};