
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const taskSchema = new Schema({
  name: String,
  surname: String,
  phone: Number,
  email: String,
  photo: String,
  bill: Number
});
 
module.exports = model("Task", taskSchema);