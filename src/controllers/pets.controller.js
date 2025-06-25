import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import __dirname from "../utils/index.js";
import { generateRandomPet } from "../utils/mocks/petGenerator.js";



 
const getAllPets = async(req,res,next)=>{
try {       
    const pets = await petsService.getAll();
    res.send({status:"success",payload:pets})

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

    const pets = await generateRandomPet(qty);
    
    res.send({status:"success",payload:pets})
}
catch (error) { 
     next(error)
    }   
}

const createPet = async(req,res,next)=> {
try{
   
    const {name,specie,birthDate} = req.body;
      if(!name||!specie||!birthDate) throw new Error("Invalid entries missing fileds");
      const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
      const result = await petsService.create(pet);
       res.send({status:"success",payload:result})
}
catch (error) { 
     next(error)
    } 
}

const updatePet = async(req,res,next) =>{
try{
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    console.log(`Pet id: ${petId}`);
      if(!petId) throw new Error("Error: missing Pet id!");

    const result = await petsService.update(petId,petUpdateBody);
    res.send({status:"success",message:"pet updated"})
}    
    catch (error) { 
     next(error)
    } 
}

const deletePet = async(req,res,next)=> {
    try{
    const petId = req.params.pid;
    console.log(`Pet id: ${petId}`);
     if(!petId) throw new Error("Error: missing Pet id!");
    const result = await petsService.delete(petId);
    res.send({status:"success",message:"pet deleted"});
}    
    catch (error) { 
     next(error)
    } 

}

const createPetWithImage = async(req,res,next) =>{
    
    try{
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) return res.status(400).send({status:"error",error:"Incomplete values"})
    console.log(file);
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image:`${__dirname}/../public/img/${file.filename}`
    });

    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
}    
    catch (error) { 
     next(error)
    } 
}



export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage,
    getMockingPets
}

