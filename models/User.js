const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: false},
    password: {type: String, required: true, unique: true},
    skills: { type: [String], default: [] },
    jobType: { type: String, enum: ['full-time', 'part-time', 'contract'], default: null },
    jobLocation: {type: String, enum:['on-site', 'remote', 'hybrid']}
    
  });
  
  const User = mongoose.model('User', UserSchema);
  module.exports = User;