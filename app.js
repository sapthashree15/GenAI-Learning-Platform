const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://mongo:27017/learning_platform', { useNewUrlParser: true, useUnifiedTopology: true });

// Define MongoDB schema and model (Course)
const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
});

const Course = mongoose.model('Course', courseSchema);

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Learning Platform!');
});

// CRUD operations for Courses
app.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/courses', async (req, res) => {
  const { title, description } = req.body;

  try {
    const newCourse = new Course({ title, description });
    const savedCourse = await newCourse.save();
    res.json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add update and delete routes as needed

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
