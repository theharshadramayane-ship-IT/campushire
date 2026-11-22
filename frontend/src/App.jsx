import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '3rem', textAlign: 'center' }}>
        <h1>Welcome to CampusHire</h1>
        <p>The exclusive job portal for Milestone College.</p>
      </main>
    </div>
  );
}

export default App;