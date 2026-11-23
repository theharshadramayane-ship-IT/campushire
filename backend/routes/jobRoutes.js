const express = require('express');
const router = express.Router();
const { getJobs, createJob, applyToJob } = require('../controllers/jobController');

// GET all jobs
router.get('/', getJobs);

// POST new job (Admin)
router.post('/', createJob);

// POST apply to a specific job
router.post('/:jobId/apply', applyToJob);

module.exports = router;