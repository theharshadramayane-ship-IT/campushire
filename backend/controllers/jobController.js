// Temporary Job Database (Baad me MySQL se aayega)
let jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "The First Labs",
    location: "Mumbai (Remote)",
    salary: "₹8 LPA",
    type: "Full-Time",
    description: "Looking for a React developer with strong CSS skills.",
    postedAt: new Date().toISOString()
  },
  {
    id: 2,
    title: "Backend Engineer (Go)",
    company: "Milestone Tech",
    location: "Pune",
    salary: "₹12 LPA",
    type: "Full-Time",
    description: "Experience with Go, PostgreSQL, and Docker required.",
    postedAt: new Date().toISOString()
  }
];

// Temporary Applications Database for Idempotency Check
let applications = [];

// 1. Get All Jobs
const getJobs = (req, res) => {
  res.status(200).json(jobs);
};

// 2. Create a Job (Admin Only)
const createJob = (req, res) => {
  const { title, company, location, salary, type, description } = req.body;
  
  if (!title || !company) {
    return res.status(400).json({ message: "Title and Company are required" });
  }

  const newJob = {
    id: jobs.length + 1,
    title,
    company,
    location,
    salary,
    type,
    description,
    postedAt: new Date().toISOString()
  };

  jobs.push(newJob);
  res.status(201).json({ message: "Job posted successfully", job: newJob });
};

// 3. Apply to Job (With Idempotency)
const applyToJob = (req, res) => {
  const { jobId } = req.params;
  const { studentEmail } = req.body;

  if (!studentEmail) {
    return res.status(400).json({ message: "Student email is required" });
  }

  // Check if job exists
  const jobExists = jobs.find(j => j.id === parseInt(jobId));
  if (!jobExists) {
    return res.status(404).json({ message: "Job not found" });
  }

  // IDEMPOTENCY CHECK: Prevent double application
  const alreadyApplied = applications.find(
    app => app.jobId === parseInt(jobId) && app.studentEmail === studentEmail
  );

  if (alreadyApplied) {
    return res.status(409).json({ message: "You have already applied for this job!" }); // 409 Conflict
  }

  const newApplication = {
    id: applications.length + 1,
    jobId: parseInt(jobId),
    studentEmail,
    appliedAt: new Date().toISOString()
  };

  applications.push(newApplication);
  res.status(201).json({ message: "Application submitted successfully", application: newApplication });
};

module.exports = { getJobs, createJob, applyToJob };