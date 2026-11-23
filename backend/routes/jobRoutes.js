const express = require('express');
const router = express.Router();
const { getJobs, createJob, applyToJob, getAllApplications } = require('../controllers/jobController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.post('/', protect, adminOnly, createJob);
router.post('/:jobId/apply', applyToJob);
router.get('/applications', protect, adminOnly, getAllApplications); // New route

module.exports = router;