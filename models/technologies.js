const mongoose = require('mongoose');

const TechSchema = new mongoose.Schema({
    techId: {
        type: Number,
        required: true
    },
    techName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    techUrl: {
        type: String
    }
});

module.exports = mongoose.model('Tech', TechSchema);
