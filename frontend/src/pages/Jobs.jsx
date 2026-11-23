import { useState, useEffect } from 'react';
import './Jobs.css';

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Get logged-in user from localStorage
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const studentEmail = loggedInUser ? loggedInUser.email : null;

  useEffect(() => {
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

  const handleApply = async (jobId) => {
    // 1. Check if user is logged in
    if (!studentEmail) {
      setMessage({ text: 'Please login first to apply.', type: 'error' });
      return;
    }

    setMessage({ text: '', type: '' });

    try {
      // 2. Send API request
      const res = await fetch(`http://localhost:5000/api/jobs/${jobId}/apply`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentEmail })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      setMessage({ text: 'Application submitted successfully!', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  if (loading) return <div className="loading">Loading jobs...</div>;

  return (
    <div className="jobs-container">
      <div className="jobs-header">
        <h1>Verified Job Opportunities</h1>
        <p>Exclusive for Milestone College students & alumni</p>
      </div>

      {/* Show success/error message */}
      {message.text && (
        <div className={`status-message ${message.type}`}>
          {message.text}
        </div>
      )}

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
            
            <button className="btn-apply" onClick={() => handleApply(job.id)}>
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}