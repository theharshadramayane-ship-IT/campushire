import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="logo">
          Campus<span>Hire</span>
        </div>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/jobs">Jobs</a></li>
          <li><a href="/login" className="btn-login">Login</a></li>
          <li><a href="/register" className="btn-register">Register</a></li>
        </ul>
      </div>
    </nav>
  );
}