const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectId: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    period: {
        type: String,
        required: true,
    },
    techStack: [
        String
    ],
    description: [
        String
    ]
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
