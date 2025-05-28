import { usersService } from "../services/index.js"
import { generateRandomUser } from "../utils/mocks/userGenerator.js";

const getAllUsers = async(req,res,next)=>{
    try{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
        }
    catch (error) { 
     next(error)
    } 
}

const getUser = async(req,res,next)=> {
    try{
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) throw new Error("error- User not found")
    res.send({status:"success",payload:user})
    }
    catch (error) { 
     next(error)
    } 
}

const updateUser =async(req,res,next)=>{
    try{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) throw new Error ("User not found")
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
    }
    catch (error) { 
     next(error)
    } 
}

const deleteUser = async(req,res,next) =>{
    try{
    const userId = req.params.uid;
    if(!userId) throw new Error ("User not found")
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
    }
    catch (error) { 
     next(error)
    } 

}

const getMockingUsers = async(req,res,next)=>{
try {   
    let qty = req.params.qty;
    if (!qty) qty = 50     // Default to 50 if no quantity is provided/   
    if( qty <=0 ) throw new Error("Invalid quantity - must be greater than 0");
    if(isNaN(qty)) throw new Error("Invalid quantity - must be a number");

    const users = await generateRandomUser(qty);
    
    res.send({status:"success",payload:users})
}
catch (error) { 
     next(error)
    }   
}



export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser,
    getMockingUsers
  
}