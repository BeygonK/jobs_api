const express = require('express');
const asyncHandler = require('express-async-handler');
const JobController = require('../controllers/jobsController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Jobs endpoints
router.post('/', verifyToken, asyncHandler(JobController.createJob));
router.get('/', asyncHandler(JobController.getAllJobs));
router.get('/:id', asyncHandler(JobController.getJobById));
router.put('/:id', verifyToken, asyncHandler(JobController.updateJob));
router.delete('/:id', verifyToken, asyncHandler(JobController.deleteJob));

module.exports = router;