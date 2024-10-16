const express = require('express');
const asyncHandler = require('express-async-handler');
const JobsController = require('../controllers/jobsController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// Jobs endpoints
router.post('/', verifyToken, asyncHandler(JobsController.createJob));
router.get('/', asyncHandler(JobsController.getAllJobs));
router.get('/:id', asyncHandler(JobsController.getJobById));
router.put('/:id', verifyToken, asyncHandler(JobsController.updateJob));
router.delete('/:id', verifyToken, asyncHandler(JobsController.deleteJob));

module.exports = router;