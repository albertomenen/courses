const router = require('express').Router();
const User = require('../models/User');
const { isAuthenticated } = require('../middlewares/jwt');
const jwt = require("jsonwebtoken");


// @desc Profile View
// @route GET /profile
// @access Private


router.get("/:userId", isAuthenticated, async (req, res, next) => {
  const { _id} = req.payload;
  try {
      const user = await User.findOne({ _id }); 
      res.status(200).json({ user });
      console.log(_id)
      } catch (error) {
      next(error);
  }
});



// @desc    Edit one user
// @route   PUT /user/edit/:userId
// @access  Private
router.put('/edit/:userId', isAuthenticated, async (req, res, next) => {
  const id = req.params.userId;
  const { username } = req.body;
  if (
    username === ""|| !username
   ) {
    res.status(400).json({ message: 'Fill username field' });
    return;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { username: username }, { new: true });
    res.status(201).json(updatedUser)
  } catch (error) {
    next(error)
  }
});

// @desc    Delete one user
// @route   DELETE /users/:userId
// @access  Private
router.delete('/delete/:userId', isAuthenticated, async (req, res, next) => {
  const id = req.params.userId;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    next(error)
  }
});

module.exports = router;