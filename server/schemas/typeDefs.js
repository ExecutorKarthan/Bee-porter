//Create definitions to outline how data will be handled moving in and out of the database
const typeDefs = `
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    password: String!
    email: String!
    zipcode: Int!
  }

  type Swarm {
    _id: ID!
    longitude: Float!
    latitude: Float!
    description: String!
    contactInfo: String!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query{
    me: User
    swarm: [Swarm]
    swarm(latitude: Float!, longitude: Float!): Swarm
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, zipcode: Int!): Auth
    addSwarm(location: String!, description: String!, contactInfo: String, latitude:Float!, longitude:Float!): Swarm
    removeSwarm(latitude: Float!, longitude: Float!): Swarm
  }  
`;

//Export the module for use
module.exports = typeDefs;