import { Router } from 'express';
import { getUsers, saveUser } from '../controllers/user.controller.js';
import { validateUser } from '../middlewares/validate.middleware.js'; // <-- Importamos

const router = Router();

router.get('/', getUsers);

// Ponemos el middleware justo antes del controlador saveUser
router.post('/', validateUser, saveUser); 

export default router;