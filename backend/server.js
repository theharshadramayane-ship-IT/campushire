const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Import Routes
const authRoutes = require('./routes/authRoutes');

// Server.js me yeh line add karo (auth routes ke neeche)
const jobRoutes = require('./routes/jobRoutes');
app.use('/api/jobs', jobRoutes);

// Mount Routes
app.use('/api/auth', authRoutes);

// Basic Health Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', project: 'CampusHire' });
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
