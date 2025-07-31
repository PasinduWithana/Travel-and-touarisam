import User from "../models/user.js";
import bcrypt from "bcrypt";
import JsonWebToken from "jsonwebtoken";
import dotenv from "dotenv";

export function registerUser (req,res){

    const data = req.body;
    data.password = bcrypt.hashSync(data.password,10)
    
    const newUser = new User(data)

    newUser.save().then(()=>{
        res.json({message : "User Registered successfully"})
    }).catch((error)=>{
        console.log(error)
        res.status(500).json({message : "User registered failed"})
    })
}

//user profile



export function loginUser(req,res){
    const data = req.body;
    

    User.findOne({
        email : data.email
    }).then((user)=>{

        if(user== null) {
            res.status(404).json({error: "User not found"})
        }else{
            const isPasswordCorrect = bcrypt.compareSync
            (data.password,user.password);

            if(isPasswordCorrect){
                const token = JsonWebToken.sign({
                    firstName : user.firstName,
                    lastName  : user.lastName,
                    email : user.email,
                    role : user.role,
                    profilePicture :user.profilePicture,
                    phone : user.phone,
                },process.env.JWT_SECRET)
                res.json({message : "Login successful",token : token, user:user});


            }else{
                res.status(404).json({error: "Login failed"});
            }
        }
    })

}


//users list

export async function getUsers(req,res){

    try{

        if(isItAdmin(req)){
          const users = await User.find();
          res.json(users);
        return;
        }else{
            const users =await User.find({availability:true});
            res.json(users);
            return;
        }
    }catch(e){
        res.status(500).json({
            message : "Failed to get product"
        })
    }
}


//update

export async function updateUser(req,res){
    try {
        if(isItAdmin(req)){ 

            const key = req.params.email;

            const data = req.body;

           const result= await User.updateOne({email:email},data);
            
           /* res.json({
                message:"product updated successfully"

            })
            return;*/

            if (result.matchedCount === 0) {
                // No product found with the given key
                res.status(404).json({
                    message: "User not found with the specified email"
                });
                return;
            }else

            res.json({
                message: "User updated successfully"
            });

        }else{
            res.status(403).json({
                message:"you are noy authorized perform this action"
            })
            return
        }
        
    } catch (error) {
        res.status(500).json({
            message : "failed to update product"
        })
    }
}


//delete

export async function deleteUser(req, res) {
    try {
        if (isItAdmin(req)) {
            const key = req.params.email;
            await User.deleteOne({ email: key }); // FIXED HERE
            res.json({
                message: "User deleted successfully"
            });
        } else {
            res.status(403).json({
                message: "You are not authorized to perform this action"
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500).json({
            message: "Failed to delete user"
        });
    }
}











export function isItAdmin(req){

    let isAdmin=false;
    if(req.user != null && req.user.role == "admin"){
        isAdmin = true;
    }
    return isAdmin;
}

export function isItCustomer(req){

    let isCustomer=false;
    if(req.user != null && req.user.role == "customer"){
        isCustomer = true;
    }
    return isCustomer;
}