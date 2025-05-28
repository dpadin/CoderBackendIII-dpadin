import { adoptionsService, petsService, usersService } from "../services/index.js"

const getAllAdoptions = async(req,res,next)=>{
    try{
    const result = await adoptionsService.getAll();
    res.send({status:"success",payload:result})
    }
catch (error) { 
     next(error)
    } 
}

const getAdoption = async(req,res,next)=>{
    try{ 

    if(!req.params.aid) throw new Error("Adoption id is required");

    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) throw new Error("Adoption not found");  
    //if(!adoption) return res.status(404).send({status:"error",error:"Adoption not found"})
    res.send({status:"success",payload:adoption})
}
catch (error) { 
     next(error)
    } 
}

const createAdoption = async(req,res,next)=>{
    try{
    const {uid,pid} = req.params;
    
    const user = await usersService.getUserById(uid);
    if(!user) throw new Error("User not found");  
    const pet = await petsService.getBy({_id:pid});
    if(!pet)  throw new Error("Pet not found");  
    if(pet.adopted) throw new Error("Pet is already adopted");  
    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    await adoptionsService.create({owner:user._id,pet:pet._id})
    res.send({status:"success",message:"Pet adopted"})
    }
catch (error) { 
     next(error)
    } 
}

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}