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

// 1. Get All Jobs
const getJobs = (req, res) => {
  res.status(200).json(jobs);
};

// 2. Create a Job (Admin Only - logic baad me add karenge)
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

module.exports = { getJobs, createJob };