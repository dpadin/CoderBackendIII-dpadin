import { Router } from 'express';
import petsController from '../controllers/pets.controller.js';
import usersController from '../controllers/users.controller.js';
import mocksController from '../controllers/mocks.controller .js';


const router = Router();
 
router.get('/mockingpets/:qty',petsController.getMockingPets);
router.get('/mockingpets',petsController.getMockingPets);

router.get('/mockingusers/:qty',usersController.getMockingUsers);
router.get('/mockingusers',usersController.getMockingUsers);  

router.post('/generateData',mocksController.generateData);  


export default router;