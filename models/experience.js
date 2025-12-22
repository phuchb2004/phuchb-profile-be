const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectId: {
        type: Number,
        required: true
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
    role: {
        vi: { type: String, required: true },
        en: { type: String, required: true }
    },
    period: {
        type: String,
        required: true,
    },
    techStack: [
        String
    ],
    description: {
        vi: [ String ],
        en: [ String ]
    }
});

const CompanySchema = new mongoose.Schema({
    companyId: {
        type: Number,
        required: true
    },
    companyName: {
        type: String,
        required: true,
        unique: true
    },
    projects: [ProjectSchema]
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
