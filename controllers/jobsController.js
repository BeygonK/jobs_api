const Job = require('../models/Jobs');

// Job controller class
class JobController{
    // @desc    Create a new job
    // route    POST api/v1/jobs
    // @access  Private
    static async createJob(req, res) {
        const {
            title,
            type,
            location,
            description,
            salary,
            companyName,
            companyDescription,
            contactEmail,
            contactPhone,
            userId
        } = req.body;
    
        try {
            // Create a new job object using the data from the request
            const newJob = new Job({
                title,
                type,
                description,
                location,
                salary,
                companyName,
                companyDescription,
                contactEmail,
                contactPhone,
                userId
            });
    
            // Save the job to the database
            await newJob.save();
    
            // Return success response with the created job
            res.status(201).json(newJob);
        } catch (error) {
            res.status(400).json({ message: 'Failed to create job!', error: error.message });
            console.log(error);
        }
    }
    

    // @desc    Get all jobs
    // route    GET api/v1/jobs
    // @access  Public
    static async getAllJobs(req, res) {
        const limit = parseInt(req.query.limit) || 0; 
        const { page }= req.query;
        const skip = (page - 1) * limit;
        const jobs = await Job.find().skip(skip).limit(limit).exec();

        const totalJobs = await Job.countDocuments();
        if(jobs){
            
            return res.status(200).json({
                jobs,
                totalJobs,
                totalPages: Math.ceil(totalJobs / limit), // Calculate total pages
                currentPage: Number(page),
        });
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

module.exports = JobController;