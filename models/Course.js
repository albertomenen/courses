const { Schema, model} = require("mongoose")


const CourseSchema = new Schema (
    {
      
      title: String,
      description: String,
      price: Number,
      university: String,
      universityLogo: String,

      instructor: {
        type: Schema.Types.ObjectId,
        ref: "Instructor"
      }

       
    }


)

module.exports = model("Course", CourseSchema);
