const { Schema, model} = require("mongoose")



const PurchaseSchema = new Schema ({

    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    purchase_date: Date,
        

    }


)

const List = model("Purchase", PurchaseSchema);

module.exports = List;