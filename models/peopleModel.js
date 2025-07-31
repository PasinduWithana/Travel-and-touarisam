import mongoose from "mongoose";


const peopleSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    number:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    
})

export default mongoose.model("People",peopleSchema);