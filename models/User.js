const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    //required: true
  },
  hashedPassword: {
    type: String,
    //required: true
  },
  username: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    //required: true
  },
  phone: {
    type: String,
    //required: true
  },
  
  image: {
    type: String,
    //required: false
  },
  is_instructor: {
    type: Boolean,
    //required: true
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    //ref: "Instructor",
    //required: true
  },

  
},
  {
    timestamps: true
  });

module.exports = model("User", UserSchema);