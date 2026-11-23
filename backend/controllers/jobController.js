const { promisePool } = require('../db');

// Get all jobs
const getJobs = async (req, res) => {
  try {
    const [jobs] = await promisePool.query('SELECT * FROM jobs ORDER BY posted_at DESC');
    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error: error.message });
  }
};

// Create job (Admin)
const createJob = async (req, res) => {
  try {
    const { title, company, location, salary, type, description } = req.body;
    if (!title || !company) return res.status(400).json({ message: "Title and Company are required" });

    const [result] = await promisePool.query(
      'INSERT INTO jobs (title, company, location, salary, type, description) VALUES (?, ?, ?, ?, ?, ?)',
      [title, company, location, salary, type, description]
    );

    res.status(201).json({ message: "Job posted successfully", jobId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: "Error creating job", error: error.message });
  }
};

// Apply to Job
const applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const { studentEmail } = req.body;
    if (!studentEmail) return res.status(400).json({ message: "Student email is required" });

    // Idempotency is handled by the UNIQUE KEY in the applications table
    const [result] = await promisePool.query(
      'INSERT INTO applications (job_id, student_email) VALUES (?, ?)',
      [jobId, studentEmail]
    );

    res.status(201).json({ message: "Application submitted successfully" });
  } catch (error) {
    // Error code 1062 is MySQL's Duplicate Entry error
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: "You have already applied for this job!" });
    }
    res.status(500).json({ message: "Error applying to job", error: error.message });
  }
};

// Admin: Get all applications
const getAllApplications = async (req, res) => {
  try {
    const [apps] = await promisePool.query('SELECT * FROM applications');
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error: error.message });
  }
};

// Student: Get my applications
const getMyApplications = async (req, res) => {
  try {
    const studentEmail = req.user.email; 
    
    // JOIN query to get job details
    const [apps] = await promisePool.query(`
      SELECT a.id, a.applied_at, j.title, j.company, j.location, j.salary, j.type
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.student_email = ?
      ORDER BY a.applied_at DESC
    `, [studentEmail]);

    // Formatting the response to match frontend
    const formattedApps = apps.map(app => ({
      id: app.id,
      appliedAt: app.applied_at,
      jobDetails: {
        title: app.title,
        company: app.company,
        location: app.location,
        salary: app.salary,
        type: app.type
      }
    }));

    res.status(200).json(formattedApps);
  } catch (error) {
    res.status(500).json({ message: "Error fetching my applications", error: error.message });
  }
};

module.exports = { getJobs, createJob, applyToJob, getAllApplications, getMyApplications };