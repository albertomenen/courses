const router = require('express').Router();
const Instructor = require('../models/Instructor');
const Course = require('../models/Course');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Get all instructors
// @route   GET /instructor
// @access  Private
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const instructors = await Instructor.find();
    res.status(200).json(instructors);
  } catch (error) {
    next(error);
  }
});

// @desc    Get an instructor by ID
// @route   GET /instructor/:id
// @access  Private
router.get('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findById(id);
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.status(200).json(instructor);
  } catch (error) {
    next(error);
  }
});

// @desc    Get all courses created by an instructor
// @route   GET /instructor/:id/courses
// @access  Private
router.get('/:id/courses', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const courses = await Course.find({ instructor: id });
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
});

// @desc    Create a new instructor
// @route   POST /instructor/new
// @access  Private
router.post('/new', isAuthenticated, async (req, res, next) => {
  const { userId } = req.body;

  await Instructor.create({ user: userId })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

// @desc    Update an instructor by ID
// @route   PUT /instructor/:id
// @access  Private
router.put('/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const instructor = await Instructor.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!instructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.status(200).json(instructor);
  } catch (error) {
    next(error);
  }
});

// @desc    Delete an instructor by ID
// @route   DELETE /instructor/:id
// @access  Private
router.delete('/delete/:id', isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedInstructor = await Instructor.findByIdAndDelete(id);
    if (!deletedInstructor) {
      return res.status(404).json({ message: 'Instructor not found' });
    }
    res.status(200).json({ message: 'Instructor deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
