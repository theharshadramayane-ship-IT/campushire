import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

export default function Admin() {
  const [formData, setFormData] = useState({ title: '', company: '', location: '', salary: '', type: 'Full-Time', description: '' });
  const [message, setMessage] = useState({ text: '', type: '' });
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user || user.role !== 'admin') {
    navigate('/login');
    return null;
  }

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handlePostJob = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    try {
      const res = await fetch(`${API_URL}/api/jobs`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage({ text: 'Job posted successfully!', type: 'success' });
      setFormData({ title: '', company: '', location: '', salary: '', type: 'Full-Time', description: '' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    }
  };

  return (
    <div className="admin-container admin-theme">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage job postings for Milestone College</p>
      </div>
      {message.text && <div className={`status-message ${message.type}`}>{message.text}</div>}
      <div className="admin-card">
        <h2>Post a New Job</h2>
        <form onSubmit={handlePostJob} className="admin-form">
          <div className="form-row">
            <div className="form-group">
              <label>Job Title</label>
              <input type="text" name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input type="text" name="company" value={formData.company} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Salary (e.g. ₹8 LPA)</label>
              <input type="text" name="salary" value={formData.salary} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-group">
            <label>Job Type</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="Full-Time">Full-Time</option>
              <option value="Internship">Internship</option>
              <option value="Part-Time">Part-Time</option>
            </select>
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required></textarea>
          </div>
          <button type="submit" className="btn-primary">Post Job</button>
        </form>
      </div>
    </div>
  );
}