const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

// Remove trailing slashes from origins
app.use(cors({
  origin: ['http://localhost:3000', 'https://biotech-trek.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// MongoDB connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Test route
app.get("/api", (req, res) => {
  res.json({ message: "API is working" });
});

// Import routes
const authRoutes = require('../routes/Authentication');
const jobRoutes = require('../routes/job');
const categoryRoutes = require('../routes/category');
const applicationRoutes = require('../routes/application');
const profileRoutes = require('../routes/profile');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/profile', profileRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;