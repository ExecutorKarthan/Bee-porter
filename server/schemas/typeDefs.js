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
    location: [Float]!
    description: String!
    contactInfo: String!
  }

  type Auth {
    token: ID!
    user: User!
  }

  type Query{
    me: User
    swarm(swarmId: ID!): Swarm
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(firstName: String!, lastName: String!, email: String!, password: String!, zipcode: Int!): Auth
    addSwarm(location: String!, description: String!, contactInfo: String!): Swarm
    removeSwarm(swarmId: ID!): Swarm
  }  
`;

//Export the module for use
module.exports = typeDefs;