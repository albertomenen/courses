const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Purchase = require('../models/Purchase');
const Course = require('../models/Course');
const { isAuthenticated } = require('../middlewares/jwt');

// @desc    Create a new purchase
// @route   POST /purchase/:courseId
// @access  Private
router.post('/:courseId', isAuthenticated, async (req, res, next) => {
    try {
      const { courseId } = req.params;
      const { token } = req.body;
      const userId = req.payload;
  
      // Retrieve the course from the database

      const course = await Course.findById(courseId);
      if (!course) {
        console.log('Course not found');
        return res.status(404).json({ message: 'Course not found' });
      }
  
      // Charge the user using Stripe


      const charge = await stripe.charges.create({
        amount: Math.round(course.price * 100), // Convert to cents
        currency: 'usd',
        description: `Purchase of ${course.title}`,
        source: token,
      });


  
      // Create a new Purchase record
      const purchase = new Purchase({
        user: userId,
        course: courseId,
        amount: course.price,
        chargeId: charge.id,
      });

      await purchase.save();


  
      res.status(200).json({ message: 'Purchase successful', purchase });
    } catch (error) {
      next(error);
    }
  });

  module.exports = router;

  