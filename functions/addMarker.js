// Import necessary modules
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server');

// Define Mongoose schema&model for Marker
const markerSchema = new mongoose.Schema({
  longitude: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  }
});

const Marker = mongoose.model('Marker', markerSchema);

// Set up Mongoose connection
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB database');
})
.catch((error) => {
  console.error('Error connecting to MongoDB database:', error);
});

// Define GraphQL schema
const typeDefs = gql`
  type Marker {
    _id: ID!
    longitude: Float!
    latitude: Float!
  }

  type Query {
    markers: [Marker]!
  }

  type Mutation {
    addMarker(longitude: Float!, latitude: Float!): Marker!
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    markers: async () => {
      return await Marker.find();
    }
  },
  Mutation: {
    addMarker: async (_, { longitude, latitude }) => {
      const marker = new Marker({ longitude, latitude });
      await marker.save();
      return marker;
    }
  }
};

// Create ApolloServer instance
const server = new ApolloServer({ typeDefs, resolvers });

// Start the server
server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
