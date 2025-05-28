
import { faker as fa} from '@faker-js/faker';
import { createHash } from '../index.js'; // Import the createHash function to hash the password

// This function generates an array of random user objects with specified properties    
export  const generateRandomUser = async (quantity) => {

const users = [];    
const password =  "coder123"
const hashedPassword =  await createHash(password) 

for (let i = 0; i < quantity; i++) {
    
    users.push ({
        first_name: fa.person.firstName(),
        last_name: fa.person.lastName(),
        email:  fa.internet.email(),
        password: hashedPassword,
        role: fa.helpers.arrayElement(['user', 'admin']), // Randomly choose between 'user' and 'admin'
        pets:[],
        _id:fa.database.mongodbObjectId(),
        __v: 0

    }) 
 
} 

return users;
}  

