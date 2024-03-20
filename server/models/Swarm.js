const { Schema, model } = require('mongoose');

// Define a Mongoose Schema for the bee swarm
const swarmSchema = new Schema({
    // Description of the bee swarm
    description: {
        type: String,
        required: true,
    },
    // Contact info associated with the bee swarm
    contactInfo: {
        type: String
    },
    // Longitude of the swarm location
    longitude: {
        type: Number,
        required: true
    },
    // Latitude of the swarm location
    latitude: {
        type: Number,
        required: true
    }
});

// Create a Mongoose model based on the schema
const Swarm = model('Swarm', swarmSchema);

module.exports = Swarm;