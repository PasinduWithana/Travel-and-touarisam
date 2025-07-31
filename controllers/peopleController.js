import People from "../models/peopleModel.js";

export const createpeople = async(req, res)=>{
    try{

        const peopleData = new People(req.body);

        if(!peopleData){
            return res.status(404).json({msg: "People data not found"});
        }

        const savedData = await peopleData.save();
        res.status(200).json(savedData);

    }catch (error) {
       res.status(500).json({error:error}); 

    }
}


export const getAllpeople = async(req, res) =>{
    try {

        const peopleData = await People.find();
        if(!peopleData){
            return res.status(404).json({msg:"People data not found"});
        }
        res.status(200).json(peopleData);
        
    } catch (error) {
        res.status(500).json({error:error}); 
    }
}



export const deletePeople = async(req, res) =>{
    try {
        const id = req.params.id;
        const peopleExist = await People.findById(id);
        if(!peopleExist){
            return res.status(404).json({msg: "Product not found"});
        }
        await People.findByIdAndDelete(id);
        res.status(200).json({msg: "Product deleted successfully"});


    } catch (error) {
        res.status(500).json({error:error}); 
    }
}
    
export const getOnePeople = async(req,res) =>{
    try {

        const id = req.params.id;
        const peopleExist = await People.findById(id);
        if(!peopleExist){
            return res.status(404).json({msg: "People not found"});
        }
        res.status(200).json(peopleExist);
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}

export const updatepeople = async(req, res) =>{
    try {

        const id = req.params.id;
        const peopleExist = await People.findById(id);
        if(!peopleExist){
            return res.status(401).json({msg: "People not found"});
        }

        const updatedData = await People.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "People updated successfully"});
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}