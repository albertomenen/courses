const router = require('express').Router();
const Client = require ("../models/Client")
const Task = require ("../models/Task")
const { isAuthenticated } = require('../middlewares/jwt'); 



router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    next(error)
  }
});

// @desc    Get a client
// @route   Get /client
// @access  Private



router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json(client);
  } catch (error) {
    next(error);
  }
});

// router.get('/user/:userId', isAuthenticated, async (req, res, next) => {
//   const userId = req.params.userId;

//   try {
//     const clients = await Client.find({ userId: userId });
//     res.status(200).json(clients);
//   } catch (error) {
//     next(error);
//   }
// });




// @desc    Create a new client
// @route   POST /client
// @access  Private

router.post('/new', isAuthenticated, async (req, res, next) => {
  const { name, surname, phone, email, photo, bill, control, description } = req.body;
  const userId = req.payload; 

  await Client.create({ userId, name, surname, phone, email, photo, bill, control, description })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});



// @desc    Update a client by ID
// @route   PUT /client/:id
// @access  Private

// I remove the Auth because it was giving me some problems 

router.put('/:id', async (req, res, next) => {
    console.log('Inside PUT /client/:id handler');
    try {
  
      const { id } = req.params;
      const client = await Client.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!client) {
        return res.status(404).json({ message: "Client not found" });
      }
      res.status(200).json(client);
    } catch (error) {
      next(error);
    }
  });
  

// @desc    Delete a client by ID
// @route   DELETE /client/:id
// @access  Private

router.delete('/delete/:id',isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedClient = await Client.findByIdAndDelete(id);
    if (!deletedClient) {
      return res.status(404).json({ message: "Client not found" });
    }
    res.status(200).json({ message: "Client deleted successfully" });
  } catch (error) {
    next(error);
  }
});





module.exports = router;