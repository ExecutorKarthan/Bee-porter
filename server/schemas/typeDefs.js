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
    latitude: Float!
    longitude: Float!
    description: String!
    contactInfo: String!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query{
    me: User
    swarms: [Swarm]
    swarm(latitude: Float!, longitude: Float!): Swarm
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, zipcode: Int!): Auth
    addSwarm(latitude:Float!, longitude:Float!, description: String!, contactInfo: String!): Swarm
    removeSwarm(latitude: Float!, longitude: Float!): Swarm
  }  
`;

//Export the module for use
module.exports = typeDefs;