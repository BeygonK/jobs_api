const mongoose = require('mongoose');

// Create the Job schema
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, // Title is required
  },
  type: {
    type: String,// Allowed job types
    default: 'Full-Time', // Default value
  },
  location: {
    type: String,
    required: true, // Location is required
  },
  description: {
    type: String,
    required: true, // Description is required
  },
  salary: {
    type: String, // Allowed salary ranges
    default: 'Under $50K', // Default value
  },
  companyName: {
    type: String,
    required: true, // Company name is required
  },
  companyDescription: {
    type: String,
    required: true, // Company description is required
  },
  contactEmail: {
    type: String,
    required: true, // Contact email is required
    match: /.+\@.+\..+/, // Basic email validation
  },
  contactPhone: {
    type: String,
    required: true, // Contact phone is required
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId, // Foreign key reference
    ref: 'User', // Reference to the User model
    required: true, // User ID is required
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

// Create and export the Job model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
