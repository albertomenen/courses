const { Schema, model} = require("mongoose")



const ListSchema = new Schema (
    {

        user: { type: Schema.Types.ObjectId, ref: 'User' },  
        client: { type: Schema.Types.ObjectId, ref: 'Client' },

    }


)

const List = model("List", ListSchema);

module.exports = List;