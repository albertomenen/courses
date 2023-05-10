const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { isAuthenticated, isAdmin } = require('../middlewares/jwt');
const saltRounds = 10;

// @desc    SIGN UP new user
// @route   POST /api/v1/auth/signup
// @access  Public


router.post('/signup', async (req, res, next) => {
  const { email, password, username, is_instructor, image, description } = req.body;
  if (email === "" || password === "" || username === "") {
    res.status(400).json({ message: 'Please fill all the fields to register' });
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Not a valid email format' });
    return;
  }
   // Use regex to validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({ message: 'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter' });
    return;
  }
  try {
    const userInDB = await User.findOne({ email });
    if (userInDB) {
      res.status(400).json({ message: `User already exists with email ${email}` })
      return;
    } else {
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = await User.create({ email, hashedPassword, username, is_instructor, image, description });
      res.status(201).json({ data: newUser });
    }
  } catch (error) {
    next(error);
  }
});

// @desc    LOG IN user
// @route   POST /api/v1/auth/login
// @access  Public

router.post('/login', async (req, res, next) => { 
  const { email, password } = req.body;
  if (email === "" || password === "") {
    res.status(400).json({ message: 'Please fill all the fields to login'});
    return;
  }
  try {
    // First let's see if the user exists
    const userInDB = await User.findOne({ email });
    // If they don't exist, return an error
    if (!userInDB) {
      res.status(401).json({ success: false, message: `No user registered by email ${email}` })
      return;
    } else {
      const passwordMatches = bcrypt.compareSync(password, userInDB.hashedPassword);
      if (passwordMatches) {
        // Let's create what we want to store in the jwt token
        const payload = {
          email: userInDB.email,
          username: userInDB.username,
          _id: userInDB._id,
          is_instructor: userInDB.is_instructor 

        }
        console.log(payload)
        // Use the jwt middleware to create de token
        const authToken = jwt.sign(
          payload,
          process.env.JWT_SECRET,
          { algorithm: 'HS256', expiresIn: "30d" }
        );
        res.status(200).json({ authToken: authToken })
      } else {
        // If the password is not right, return an error
        res.status(401).json({ success: false, message: 'Unable to authenticate user'})
      }
    }
  } catch (error) {
    next(error)
  }
});

// @desc    DELETE a user by id
// @route   DELETE /users/:id
// @access  Private


router.delete('/users/:id', isAuthenticated, isAdmin, async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    next(error);
  }
});

// @desc    GET logged in user
// @route   GET /api/v1/auth/me
// @access  Private
router.get('/me', isAuthenticated, (req, res, next) => {
  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log('Whose token is on the request:', req.payload);
  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
})

module.exports = router;