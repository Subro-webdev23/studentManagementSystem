
const express = require('express');
const router = express.Router();
const Student = require('../Models/student');

// api/students
// All Students
router.get('/', async (req, res) => {
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

// Get Student
router.get('/:id', async (req, res) => {
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

// Create Student
router.post('/', async (req, res) => {
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
router.delete('/:id', async (req, res) => {
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
router.put('/:id', async (req, res) => {
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



module.exports = router;
