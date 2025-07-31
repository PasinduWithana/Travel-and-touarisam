import Inquiry from "../models/inquiry.js";
import { isItAdmin, isItCustomer } from "./userController.js";
import { sendContactEmail } from "../services/emailService.js";

export async function addInquiry(req,res){
    try{
        const data = req.body;
        console.log('Received inquiry data:', data);
        
        // Prepare inquiry data
        const inquiryData = {
            email: data.email,
            message: data.message,
            phone: data.phone || "Not provided",
            timeAdded: new Date().toLocaleTimeString(),
            subject: data.subject
        };

        // Send email notification
        let emailResult = null;
        try {
            emailResult = await sendContactEmail({
                name: data.name || 'Anonymous',
                email: data.email,
                subject: data.subject || 'New Inquiry',
                message: data.message
            });
            console.log('Email sending result:', emailResult);
        } catch (emailError) {
            console.error('Failed to send email notification:', emailError);
            emailResult = emailError;
        }

        // Generate next ID
        let id = 0;
        const inquiries = await Inquiry.find().sort({id :-1}).limit(1);
        if(inquiries.length == 0){
            id = 1;
        } else {
            id = inquiries[0].id + 1;
        }
        inquiryData.id = id;

        const newInquiry = new Inquiry(inquiryData);
        const response = await newInquiry.save();
       
        res.json({
            message: emailResult?.success 
                ? "Inquiry added successfully and notification email sent" 
                : "Inquiry added successfully but failed to send email notification",
            id: response.id,
            emailStatus: emailResult
        });

    } catch(e) {
        console.error('Error adding inquiry:', e);
        res.status(500).json({
            message: "Failed to add inquiry",
            error: e.message,
            details: e
        });
    }
}

export async function getInquiries(req,res){
    try{
        
        if(isItCustomer(req)){
            const inquiries = await Inquiry.find({email:req.user.email});
            res.json(inquiries);
            return;
        }else if(isItAdmin(req)){
            const inquiries = await Inquiry.find();
            res.json(inquiries);
        }else{
            res.status(500).json({
                message :"you are not authorized perform this action"
            })
        }
    }catch(e){
        res.status(500).json({
            message : "failed to get requiries"
        })
    }
}

export async function deleteInquiries(req,res){
    try{
        if(isItAdmin(req)){

            const id = req.params.id;

            await Inquiry.deleteOne({id:id});
            res.json({
                message :"successfully delete inquiries"
            })
        }else if(isItCustomer(req)){
            
            const id = req.params.id;
            const inquiry = await Inquiry.findOne({id:id});

            if(inquiry == null){
                res.status(404).json({
                    message : "Inquiry not found"
                })
                return;
            }else{
                if(inquiry.email == req.user.email){
                    await Inquiry.deleteOne({id:id});
                    res.json({
                        message :"inquiry deleted successfully"
                    })
                    return;
                }else{
                    res.status(403).json({
                        message :"you are not authorized perform this action"
                    })
                    return;
                }
            }
        }else{
            res.json({
                message: "You are not authorized perform this action"
            })
            return
        }
    }catch{
        res.status(500).json({
            message : "failed delete inquiries"
        })
    }
}

export async function updateInquiry(req,res){
    try{
        if(isItAdmin(req)){
            const id = req.params.id;
            const data = req.body;

            const inquiry = await Inquiry.updateOne({id:id},data);
            res.json({
                message: "Inquiry updated successfully"
            })

        }else if(isItCustomer(req)){
            const id = req.params.id;
            const data = req.body;

            const inquiry =  await Inquiry.findOne({id:id});

            if(inquiry == null){
                res.status(404).json({
                    message : "Inquiry not found"
                })
            }else{
                if(inquiry.email == req.user.email){
                    await Inquiry.updateOne({id:id},{message : data.message}); //data wala message eka pamanak user ta edit karanna dei
                    res.json({
                        message: "Inquiry updated successfully"
                    })
                    return;
                }else{
                    res.status(403).json({
                        message: "you are not authorized perform this action"
                    })
                    return;
                }
            }

        }else{
            res.status(403).json({
                message:" you are not authorized to perform this action"
            })
        }

    }catch(e){
       
        res.status(500).json({
            message: "failed to update inquiry"
        })
    }
}