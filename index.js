const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 3000

const cors = require('cors');
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/studentsManagementSystem')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));


const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Student = mongoose.model('Student', studentSchema);

app.get('/', (req, res) => {
  res.send('Student Management System is running on port ' + port);
})


// Create Student
app.post('/api/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student created successfully',
      data: student
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Delete Student
app.delete('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
      data: student
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Update Student
app.put('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// Get Student
app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Student fetched successfully',
      data: student
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
});

// All Students
app.get('/api/students', async (req, res) => {
  try {
    const students = await Student.find();

    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      data: students
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students',
      error: error.message
    });
  }
});
app.listen(port, () => {
  console.log(`http://localhost:3000`)
})