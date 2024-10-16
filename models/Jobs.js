const mongoose = require('mongoose');

// Define the Job Schema
const JobSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the job
    description: { type: String, required: true }, // Description of the job
    skillsRequired: { type: [String], required: true }, // Skills needed for the job
    jobType: { 
        type: String, 
        enum: ['full-time', 'part-time', 'contract'], 
        required: true 
    }, // Type of job
    jobLocation: { type: String, required: true }, // Job location (e.g., remote, on-site)
    location: { type: String, required: true }, // General location (can be used for geographic data)
    createdAt: { type: Date, default: Date.now } // Timestamp of when the job was created
});

// Create the Job model
const Job = mongoose.model('Job', JobSchema);

// Export the model
module.exports = Job;