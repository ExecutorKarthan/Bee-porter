//Import the needed modules
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const stripe = require('stripe')('sk_test_51Ou3Kf2MpQzms5MH7dCdizUaXNEQxT4BEnJK4UFAPPlNpEmYOBGjQ7s6wXFq5EA8NlgNsJoSH6rgwi4tcbvqvcGr00XfpwOBtp');

//Define a port and an express variable for use
const PORT = process.env.PORT || 3001;
const app = express();

//Create the server side of the Apollo server with our defined data types and means to handle data requests
const server = new ApolloServer({
  typeDefs,
  resolvers,
});


app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:4242';

app.post('/create-checkout-session', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    submit_type: 'donate',
    line_items: [
      {
        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        price: 'price_1OuObF2MpQzms5MHNpLPuv9q',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000',
  });

  res.redirect(303, session.url);
});

app.listen(4242, () => console.log('Running on port 4242'));

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