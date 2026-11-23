let jobs = [
  { id: 1, title: "Frontend Developer", company: "The First Labs", location: "Mumbai (Remote)", salary: "₹8 LPA", type: "Full-Time", description: "Looking for a React developer with strong CSS skills.", postedAt: new Date().toISOString() }
];
let applications = [];

const getJobs = (req, res) => res.status(200).json(jobs);

const createJob = (req, res) => {
  const { title, company, location, salary, type, description } = req.body;
  if (!title || !company) return res.status(400).json({ message: "Title and Company are required" });
  
  const newJob = { id: jobs.length + 1, title, company, location, salary, type, description, postedAt: new Date().toISOString() };
  jobs.push(newJob);
  res.status(201).json({ message: "Job posted successfully", job: newJob });
};

const applyToJob = (req, res) => {
  const { jobId } = req.params;
  const { studentEmail } = req.body;
  if (!studentEmail) return res.status(400).json({ message: "Student email is required" });
  if (!jobs.find(j => j.id === parseInt(jobId))) return res.status(404).json({ message: "Job not found" });

  const alreadyApplied = applications.find(app => app.jobId === parseInt(jobId) && app.studentEmail === studentEmail);
  if (alreadyApplied) return res.status(409).json({ message: "You have already applied for this job!" });

  const newApplication = { id: applications.length + 1, jobId: parseInt(jobId), studentEmail, appliedAt: new Date().toISOString() };
  applications.push(newApplication);
  res.status(201).json({ message: "Application submitted successfully", application: newApplication });
};

// Admin: Get all applications
const getAllApplications = (req, res) => {
  res.status(200).json(applications);
};

// NEW: Student: Get their own applications
const getMyApplications = (req, res) => {
  const studentEmail = req.user.email; // Middleware se aayega (Token me se)
  
  // Student ki applications filter karo
  const myApps = applications.filter(app => app.studentEmail === studentEmail);
  
  // Har application ke sath job ki detail bhi attach karo
  const appsWithJobDetails = myApps.map(app => {
    const job = jobs.find(j => j.id === app.jobId);
    return {
      ...app,
      jobDetails: job || null
    };
  });

  res.status(200).json(appsWithJobDetails);
};

module.exports = { getJobs, createJob, applyToJob, getAllApplications, getMyApplications };