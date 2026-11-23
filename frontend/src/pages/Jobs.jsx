import { useState, useEffect } from 'react';
import './Jobs.css';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch jobs from our backend
    fetch('http://localhost:5000/api/jobs')
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching jobs:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading">Loading jobs...</div>;

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1>Verified Job Opportunities</h1>
        <p>Exclusive for Milestone College students & alumni</p>
      </div>

      <div className="jobs-grid">
        {jobs.map(job => (
          <div key={job.id} className="job-card">
            <div className="job-card-header">
              <h2>{job.title}</h2>
              <span className="job-type">{job.type}</span>
            </div>
            <h3 className="job-company">{job.company}</h3>
            
            <div className="job-details">
              <p><strong>📍 Location:</strong> {job.location}</p>
              <p><strong>💰 Salary:</strong> {job.salary}</p>
            </div>
            
            <p className="job-desc">{job.description}</p>
            
            <button className="btn-apply">Apply Now</button>
          </div>
        ))}
      </div>
    </div>
  );
}