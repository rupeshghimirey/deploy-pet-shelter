const mongoose = require("mongoose")

const PetSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: [true, "Name is required!"],
        minlength: [3, "Name must be at least 2 characters"]
    },
    type: {
        type: String,
        required: [true, "type is required!"],
        minlength: [3, "type must be at least 3 characters"]
    },
    description:{
        type: String,
        required: [true, "description is required!"],
        minlength: [3, "description must be at least 3 characters"]
    },
    firstSkill:{
        type: String,
    },
    secondSkill:{
        type: String,
    },
    thirdSkill:{
        type: String,
    },
    
    
})

const Pet = mongoose.model("Pet", PetSchema) //registering the instruction for creating a table above as a table named "Pet"

module.exports = Pet; //exporting the Pet object which represents the Pet table. We are exporting this so the controller knows about this object so it can use this object to CRUD Pets