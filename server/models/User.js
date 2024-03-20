const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// Define a Mongoose schema for user data
const userSchema = new Schema({
  // First name of the user
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  // Last name of the user
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  // Email of the user
  email: {
    type: String,
    required: true,
    unique: true
  },
  // Password of the user
  password: {
    type: String,
    required: true,
    minlength: 5
  },
  // Zipcode of the user
  zipcode: {
    type: Number,
    required: true,
    minlength: 5
  },
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Create a mongoose model based on the schema
const User = model('User', userSchema);

module.exports = User;