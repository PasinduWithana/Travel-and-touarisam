import Employee from "../models/empolyeeModel.js";

export const createemployee = async(req, res)=>{
    try{
 
        const employeeData = new Employee(req.body);

        if(!employeeData){
            return res.status(404).json({msg: "Product data not found"});
        }

        const savedData = await employeeData.save();
        res.status(200).json(savedData);

    }catch (error) {
       res.status(500).json({error:error}); 

    }
}

export const getAllemployee = async(req, res) =>{
    try {

        const employeeData = await Employee.find();
        if(!employeeData){
            return res.status(404).json({msg:"Employee data not found"});
        }
        res.status(200).json(employeeData);
        
    } catch (error) {
        res.status(500).json({error:error}); 
    }
}
//delete operation
export const deleteEmployee = async(req, res) =>{
    try {
        const id = req.params.id;
        const employeeExist = await Employee.findById(id);
        if(!employeeExist){
            return res.status(404).json({msg: "Employee not found"});
        }
        await Employee.findByIdAndDelete(id);
        res.status(200).json({msg: "Employee deleted successfully"});


    } catch (error) {
        res.status(500).json({error:error}); 
    }
}

export const getOneEmployee = async(req,res) =>{
    try {

        const id = req.params.id;
        const employeeExist = await Employee.findById(id);
        if(!employeeExist){
            return res.status(404).json({msg: "Employee not found"});
        }
        res.status(200).json(employeeExist);
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}

/*
export const getOneEmployee = async(req,res) =>{
    try {

        const id = req.params.id;
        const employeeExist = await Employee.findById(id);
        if(!employeeExist){
            return res.status(404).json({msg: "Employee not found"});
        }
        res.status(200).json(employeeExist);
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}
*/

//update employee operation
export const updateemployee = async(req, res) =>{
    try {

        const id = req.params.id;
        const employeeExist = await Employee.findById(id);
        if(!employeeExist){
            return res.status(401).json({msg: "Employee not found"});
        }

        const updatedData = await Product.findByIdAndUpdate(id, req.body, {new:true});
        res.status(200).json({msg: "Employee updated successfully"});
        
    } catch (error) {
        res.status(500).json({error:error});
    }
}