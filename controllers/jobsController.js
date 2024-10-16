const Job = require('../models/Jobs');

// Job controller class
class JobController{
    // @desc    Create a new job
    // route    POST api/v1/jobs
    // @access  Private
    static async createJob(req, res) {
        const {
            title,
            description,
            skillsRequired,
            jobType,
            jobLocation,
            location
        } = req.body;

        const newJob = new Job(title,
            description,
            skillsRequired,
            jobType,
            jobLocation,
            location);
        if (newJob){
            await newJob.save();
            res.status(201).json(newJob);
        }else {
            res.status(400);
            throw new Error('Failed to create job!')
        }
    }

    // @desc    Get all jobs
    // route    GET api/v1/jobs
    // @access  Public
    static async getAllJobs(req, res) {
        const jobs = await Job.find({});
        if(jobs){
            return res.status(200).json(jobs);
        } else{
            res.status(500);
            throw new Error('Server error!')
        }
    }

    // @desc    Get job by ID
    // route    GET api/v1/jobs/:id
    // @access  Public
    static async getJobById(req, res) {
        const job = await Job.findById(req.params.id);
        if(job){
            return res.status(200).json(job);
        } else{
            res.status(404);
            throw new Error('Job not found!')
        }
    }

    // @desc    Update a job by ID 
    // route    PUT api/v1/jobs/:id
    // @access  Private
    static async updateJob(req, res) {
        const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(updatedJob){
            return res.status(200).json(updatedJob);
        } else{
            res.status(404);
            throw new Error('Job not found!')
        }
    }

    // @desc    Delete a job by ID
    // route    DELETE api/v1/jobs/:id
    // @access  Private
    static async deleteJob(req, res) {
        const deletedJob = await Job.findByIdAndDelete(req.params.id);
        if(deletedJob){
            return res.status(200).json({ message: 'Job deleted successfully!' });
        } else{
            res.status(404);
            throw new Error('Job not found!')
        }
    }
}