const router = require("express").Router();

const Task = require("../models/Task");
const Client = require("../models/Client")

router.post("/tasks", (req, res, next) => {
    const {name, surname, phone, email, photo, bill} = req.body;
    Task.create({name, surname, phone, email, photo, bill})
        .then(response => res.json(response))
        .catch(err => res.json(err))
})

module.exports = router;