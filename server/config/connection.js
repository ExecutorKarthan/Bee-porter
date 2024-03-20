// Import mongoose module
const mongoose = require('mongoose');
// Connect to MongoDB database
mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/bee-porter');
// Export mongoose connection
module.exports = mongoose.connection;