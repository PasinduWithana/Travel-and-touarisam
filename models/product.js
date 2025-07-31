import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    key :{
        type:String,
        required :true,
        unique : true
    },

    name :{
        type : String,
        required : true
    },
    price:{
        type : Number,
        required : true
    },
    category :{
        type:String,
        required:true,
        default:"uncategorize"
    },
    description :{
        type : String,
        required : true
    },
    dimension :{
        type : String,
        required : true
    },
    availability:{
        type: Boolean,
        required:true,
        default :true 
    },
    image:{
        type : [String],
        required : true,
        default : ["https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"]
    },
    dateAdded: {
        type: String,
        required: true,
        default: () => new Date().toISOString().split("T")[0], // Stores only YYYY-MM-DD
      },
      timeAdded: {
        type: String,
        required: true,
      }
    
})

const Product =mongoose.model("Product",productSchema);

export default Product;