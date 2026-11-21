const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // JSON data parse karne ke liye

// Basic Route
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    project: 'CampusHire',
    tech: 'Node.js + Express'
  });
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});