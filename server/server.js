//Import the needed modules
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

//Define a port and an express variable for use
const PORT = process.env.PORT || 3001;
const app = express();

//Create the server side of the Apollo server with our defined data types and means to handle data requests
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

//Create a constant to run the server
const startApolloServer = async () => {
  //Start the server
  await server.start();
  //Enable express to be used and configure it
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  //Define the route and enable the auth middleware for the Apollo server
  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  // if we're in production, serve client/build as static assets
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }
  //Note that the database is on and listening at the given port
  db.once('open', () => {
    app.listen(PORT, () => console.log(`Now listening on localhost:${PORT}`));
  });

}

//Start the server
startApolloServer();