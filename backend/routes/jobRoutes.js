const express = require('express');
const router = express.Router();
const { getJobs, createJob, applyToJob, getAllApplications, getMyApplications } = require('../controllers/jobController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/', getJobs);
router.post('/', protect, adminOnly, createJob);
router.post('/:jobId/apply', applyToJob);
router.get('/applications', protect, adminOnly, getAllApplications);

// NEW ROUTE: Student applications
router.get('/my-applications', protect, getMyApplications);

module.exports = router;