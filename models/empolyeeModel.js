import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({

    empname:{
        type: String,
        required: true
    },
    empcategory:{
        type: String,
        required: true
    },
    emppassword:{
        type: String,
        required: true
    },
    empdate:{
        type: String,
        required: true
    },
    empdept:{
        type: String,
        required: true
    },
    
    empage:{
        type: String,
        required: true
    },

})

export default mongoose.model("Employee",employeeSchema);