import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './MyApplications.css';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!token || !user) {
      navigate('/login');
      return;
    }

    fetch(`${API_URL}/api/jobs/my-applications`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => { setApplications(data); setLoading(false); })
      .catch(err => { console.error(err); setLoading(false); });
  }, [token, user, navigate, API_URL]);

  if (loading) return <div className="loading">Loading your applications...</div>;

  return (
    <div className="myapps-container myapps-theme">
      <div className="myapps-header">
        <h1>My Applications</h1>
        <p>Track the jobs you have applied for</p>
      </div>

      {applications.length === 0 ? (
        <div className="empty-state">
          <p>You haven't applied to any jobs yet.</p>
          <Link to="/jobs" className="btn-primary">Browse Jobs</Link>
        </div>
      ) : (
        <div className="apps-list">
          {applications.map(app => (
            <div key={app.id} className="app-card">
              <div className="app-info">
                <h2>{app.jobDetails?.title || 'Job Removed'}</h2>
                <h3>{app.jobDetails?.company}</h3>
                <p>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
              </div>
              <div className="app-status">
                <span className="status-badge">Under Review</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}