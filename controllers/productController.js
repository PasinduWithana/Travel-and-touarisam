import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export function addProduct(req,res){

    
    if(req.user == null){

        res.status(401).json({
            message : "please login try again"
        })
        return  //return ekak dala methanin pahala tika run wena eka nawaththanawa
    }
    if(req.user.role != "admin") {
        res.status(401).json({
            message : "You are not authorized perform this action"
        })
        return
    }

    const data = req.body;

    const newProduct = new Product(data);
   

    newProduct.save().then(()=>{
        res.json({message : "Product add successfully"});

    }).catch((error)=>{
        
        res.status(500).json({message : "Product addition failed"})
        
    });
}

export async function getProducts(req,res){

    try{

        if(isItAdmin(req)){
          const products = await Product.find();
          res.json(products);
        return;
        }else{
            const products =await Product.find({availability:true});
            res.json(products);
            return;
        }
    }catch(e){
        res.status(500).json({
            message : "Failed to get product"
        })
    }
}

export async function updateProduct(req,res){
    try {
        if(isItAdmin(req)){ 

            const key = req.params.key;

            const data = req.body;

           const result= await Product.updateOne({key:key},data);
            
           /* res.json({
                message:"product updated successfully"

            })
            return;*/

            if (result.matchedCount === 0) {
                // No product found with the given key
                res.status(404).json({
                    message: "Product not found with the specified key"
                });
                return;
            }else

            res.json({
                message: "Product updated successfully"
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

export async function deleteProduct(req,res){
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            await Product.deleteOne({key:key});
            res.json({
                message : "product deleted successfully"
            })

        }else{
            res.status(403).json({
                message : "You are not authorized perform this action"
            })
            return;
        }

    }catch(e){
        res.status(500).json({
            message : "faied to delete product"
        })
    }
}

export async function getProduct(req,res){
try{
    const key = req.params.key;
    const product = await Product.findOne({key:key})

    if(product == null){
        res.status(404).json({
            message: "product not found"
        })
        return;
    }
     res.json(product)
     return;
 
 }catch{
    res.status(500).json({
        message : "Failed to get product"
    })
 }
}
