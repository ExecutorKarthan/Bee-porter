const { Schema, model } = require('mongoose');

const swarmSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String
    },
    longitude: {
        type: Number,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    }
});


const Swarm = model('Swarm', swarmSchema);

module.exports = Swarm;