import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Jobs from './pages/Jobs';
import Admin from './pages/Admin';
import MyApplications from './pages/MyApplications'; // Import
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/my-applications" element={<MyApplications />} /> {/* Add Route */}
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Welcome to CampusHire</h1>
      <p style={{ color: 'var(--text-light)' }}>The exclusive job portal for Milestone College.</p>
    </div>
  );
}

export default App;