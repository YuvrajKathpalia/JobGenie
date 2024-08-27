const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;

mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

app.get("/", (req, res) => {
  res.send("Hello");
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

const port = process.env.PORT || 1000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
