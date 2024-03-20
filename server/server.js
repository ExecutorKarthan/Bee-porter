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

// Serve static files from the 'public' directory
app.use(express.static('public'));
// Define domain for use in the checkout session
const YOUR_DOMAIN = 'https://bee-porter-1.onrender.com';

// Handle POST request to create checkout session
app.post('/create-checkout-session', async (req, res) => {
  // Create checkout session with Stripe
  const session = await stripe.checkout.sessions.create({
    // Specify submit type as donate
    submit_type: 'donate',
    // Price ID and quanity of the donation
    line_items: [
      {
        price: 'price_1OuObF2MpQzms5MHNpLPuv9q',
        quantity: 1,
      },
    ],
    mode: 'payment',
    // Redirect URLs after successful or cancelled payments
    success_url: `${YOUR_DOMAIN}/success`,
    cancel_url: YOUR_DOMAIN,
  });
  // Redirect user to the checkout session URL
  res.redirect(303, session.url);
});

// app.listen(4242, () => console.log('Running on port 4242'));

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