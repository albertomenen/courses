const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const InstructorSchema = new Schema({
  name: String,
  surname: String,
  profilePic: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bio: String,
  credentials: String,
  coursesTaught: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  website: String,
  socialLinks: [
    {
      platform: String,
      url: String,
    },
  ],
  email: String,
});

module.exports = model("Instructor", InstructorSchema);
