
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
 
const InstructorSchema = new Schema({
  user : {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bio: String,

});
 
module.exports = model("Instructor", InstructorSchema);