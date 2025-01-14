const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

//app.use(cors());

app.use(cors({
  origin: ['http://localhost:3000', 'https://biotech-trek.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.get("/", (req, res) => {
  res.send("Hellooo");
});



const authRoutes = require('./routes/Authentication');
const jobRoutes = require('./routes/job');
const categoryRoutes = require('./routes/category');
const applicationRoutes = require('./routes/application');
const profileRoutes = require('./routes/profile');

app.use('/api/auth', authRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/profile' , profileRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const port = process.env.PORT || 1000;

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports=app;