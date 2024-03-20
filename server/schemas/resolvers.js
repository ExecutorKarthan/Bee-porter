//Import needed modules
const { User, Swarm} = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  //Create a mechanism to query data from the database
  Query: {
    me: async (parent, {userId}, context) => {
      return User.findOne({_id: context.user._id });
    },
    
    swarm: async (parent, {swarmId}, context) => {
      return Swarm.findOne({_id: swarmId });
    },

    swarms: async () => {
      return Swarm.find();
    }
  },

  //Define mutations to adjust the data in the database
  Mutation: {
    //Create a mutation to log a user in
    login: async (parent, { email, password }) => {
      //Get a user's data from the database - search by user email
      const user = await User.findOne({ email });
      //If there is no user, return an error
      if (!user) {
        throw AuthenticationError;
      }
      //Check to ensure the user has entered the correct password
      const correctPw = await user.isCorrectPassword(password);
      //Return an error if there an incorrect password was entered
      if (!correctPw) {
        throw AuthenticationError;
      }
      //Create a token for the user and return it
      const token = signToken(user);
      return { token, user };
    },
    
    //Create a mutation to add a user and its token to the database
    addUser: async (parent, { firstName, lastName, email, password, zipcode }) => {
      const user = await User.create({ firstName, lastName, email, password, zipcode });
      const token = signToken(user);
      return { token, user };
    },

    // Add a third argument to the resolver to access data in our `context`
    addSwarm: async (parent, {latitude, longitude, description, contactInfo}, context) => {
      const swarm = await Swarm.create({ latitude, longitude, description, contactInfo });
      return swarm 
    },
    // Make it so a logged in user can only remove a skill from their own profile
    removeSwarm: async (parent, { swarmId }, context) => {
      return await Swarm.findOneAndDelete({_id: swarmId});
      },
    updateEmail: async (parent, { email }, context) => {
      const updatedUser = await User.findOneAndUpdate(
        { _id: context.user._id},
        { $set: {email: email } });
    },
  },
};

//Export module for use
module.exports = resolvers;