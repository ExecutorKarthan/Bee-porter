const { Schema, model } = require('mongoose');

const swarmSchema = new Schema({
    location: {
    // Unsure of what datatype the location will be
        type: String,
    },
    description: {
        type: String,
        required: true,
    },
    contactInfo: {
        type: String
    },
});


const Swarm = model('Swarm', swarmSchema);

module.exports = Swarm;