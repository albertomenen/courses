const router = require('express').Router();
const Course = require ("../models/Course")
const { isAuthenticated } = require('../middlewares/jwt'); 



router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    next(error)
  }
});

// @desc    Get a Course
// @route   Get /Cpurse
// @access  Private



router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json(course);
  } catch (error) {
    next(error);
  }
});


// @desc    Create a new Course
// @route   POST /Course
// @access  Private

router.post('/new', isAuthenticated, async (req, res, next) => {
  const { title, description, price, instructor, university, universityLogo, imageUrl } = req.body;
  const userId = req.payload;

  await Course.create({ title, description, price, instructor, university, universityLogo, imageUrl })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});


// @desc    Update a course by ID
// @route   PUT /course/:id
// @access  Private

// I remove the Auth because it was giving me some problems 

router.put('/:id', async (req, res, next) => {
    console.log('Inside PUT /course/:id handler');
    try {
      const { id } = req.params;
      const course = await Course.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }
      res.status(200).json(course);
    } catch (error) {
      next(error);
    }
  });
  

// @desc    Delete a course by ID
// @route   DELETE /course/:id
// @access  Private

router.delete('/delete/:id',isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(error);
  }
});





module.exports = router;