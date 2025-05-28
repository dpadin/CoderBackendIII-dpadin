
import { faker as fa} from '@faker-js/faker';

export const generateRandomPet = async (quantity) => {

const pets = [];    
for (let i = 0; i < quantity; i++) {
    
    pets.push ({
        name: fa.person.firstName(),
        specie: fa.animal.dog(),
        birthDate: fa.date.past({ years: 10 }),
        // Using a random date in the past 10 years for birthDate
        adopted: false,
        image: "",
        _id:fa.database.mongodbObjectId(),
        __v: 0
    }) 
    
} 
return pets;
}  

