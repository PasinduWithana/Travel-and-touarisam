import Review from "../models/review.js";

export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Please login try  again"
        });
        return;
    }

    const data = req.body;

    //console.log("req.user",req.user);

    data.name = req.user.firstName + " " +req.user.lastName;
    data.email = req.user.email;
    data.profilePicture = req.user.profilePicture;

    const newReview = new Review(data);

    newReview.save().then(()=>{
        res.json({message:"Review successfully added"});
    }).catch(()=>{

       // console.error("error saving review",error)

        res.status(500).json({
            error: "Review addition failed "
        })
       
    });
}

//Create preview  reviews(cruad)

 export async function getReviews(req,res){

    const user = req.user;
try{
    if(user==null || user.role != "admin"){
        const review = await Review.find({isApproved : true})//.then((reviews)=>{
            res.json(review);
       /* }).catch((error)=>{
            res.status(500).json({error : " failed to fetch reviews"})
        })*/
        //return
    }
    if(user.role=="admin"){
       const reviews=await Review.find()//.then((reviews)=>{
            res.json(reviews);
        }
    
 }catch(e){
    res.status(500).json({error:"failed to fetch reviews" })
 }
}

 
 //create delete review function 

 export function deleteReview(req,res){

    const email = req.params.email;

    if(req.user == null){
        res.status(401).json({message : "please login and try again"});
        return;
    }

    if( req.user.role == "admin"){

    Review.deleteOne({email:email}).then(()=>{
        res.json({message : "Review delete successfully" });
    }).catch(()=>{
        res.status(500).json({
            error : "review deletion failed"
        })
    });
    return;
  }

  if(req.user.email == email){
    Review.deleteOne({email:email}).then(()=>{
        res.json({message : "Review deleted successfully"});
    }).catch(()=>{
        res.json({message :"Review deletion failed"});
    });
 
  }else{
    res.ststus(403).json({
        message : " You are not authorize to perform this action"});

  }
  
}

export function approveReview(req,res){

    const email =req.params.email;

    if(req.user == null){
        res.status(401).json({message : "please login try again"})

        ReadableStreamDefaultController;
    }

    if(req.user.role == "admin"){
        Review.updateOne(
            {
                email : email,

            }
            ,{
                isApproved : true,

            }
        ).then(()=> {
            res.json({message : "Review approved successfully"});
        }).catch(()=>{
            res.status(500).json({
                error : "review approval failed"
            });
        });
        
    }else{
        res.status(403).json({message : "You are not and admin. only admin can approve the reviews"})
    }
}
