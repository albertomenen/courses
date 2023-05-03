const { Schema, model} = require("mongoose")


const CourseSchema = new Schema (
    {
      
      title: String,
      description: String,
      price: Number,

      // Esta parte se debe agregar si y solo si tenemos un instructor ya creado
      
      // instructor: {
      //   type: Schema.Types.ObjectId,
      //   ref: "Instructor",
      // }

       
    }


)

module.exports = model("Course", CourseSchema);
