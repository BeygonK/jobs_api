const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    skillsRequired: { type: [String], required: true }, // Skills needed for the job
    jobType: { type: String, enum: ['full-time', 'part-time', 'contract'], required: true },
    jobLocation: {type: String, required: true},
    location: { type: String, required: true }
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;