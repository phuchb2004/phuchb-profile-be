const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
    certificateId: {
        type: Number,
        required: true,
    },
    title: {
        vi: {
            type: String,
            required: true
        },
        en: {
            type: String,
            required: true
        }
    },
    description: {
        type: String,
        required: true
    },
    certificateUrl: {
        type: String
    }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
