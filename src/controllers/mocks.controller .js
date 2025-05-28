import { generateRandomUser } from "../utils/mocks/userGenerator.js";
import { generateRandomPet } from "../utils/mocks/petGenerator.js";
import { petsService, usersService } from "../services/index.js";

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

const getMockingPets = async(req,res,next)=>{
try {   
    let qty = req.params.qty;
    if (!qty) qty = 100     // Default to 100 if no quantity is provided/   
    if( qty <=0 ) throw new Error("Invalid quantity - must be greater than 0");
    if(isNaN(qty)) throw new Error("Invalid quantity - must be a number");

    const pets = generateRandomPet(qty);
    res.send({status:"success",payload:pets})
}
catch (error) { 
     next(error)
    }   
}
const generateData = async(req,res,next)=>{
try {
    
    const { users, pets } = req.body;   
    //enerating random users
    const usersResult = await usersService.create (await generateRandomUser(users))
    //generating random pets
    const petsResult = await petsService.create ( await generateRandomPet(pets))

     res.send({status:"success",payload:usersResult, petsResult })

}           
catch   (error) { 
     next(error)
    }
}   

export default {
   generateData

}