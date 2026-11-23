const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initializeDatabase } = require('./db'); // Import DB init

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', project: 'CampusHire' });
});

const PORT = process.env.PORT || 5000;

// Initialize DB then start server
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});