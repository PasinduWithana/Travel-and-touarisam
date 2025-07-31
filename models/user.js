import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    email:  {
        type : String,
        requred :true,
        unique : true
    },
    password: {
        type : String,
        required : true 
    },
    role :{
        type : String,
        required : true,
        default : "customer"
    },//test12
    firstName :{
        type : String,
        requred : true,
    },
    lastName :{
        type : String,
        requred : true,
    },
    address: {
        type : String,
        requred : true
    },
    phone: {
        type : String,
        requred :true 
    },
    profilePicture :{
        type: String,
        required : true,
        default : "https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
    }   
});

const User = mongoose.model("User",userSchema);

export default User;