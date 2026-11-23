const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { initializeDatabase } = require('./db');

const app = express();

// Update CORS to allow your future Netlify URL
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
const jobRoutes = require('./routes/jobRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', project: 'CampusHire Production' });
});

const PORT = process.env.PORT || 5000;

initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});