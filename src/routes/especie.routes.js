// src/routes/especie.routes.js
import { Router } from 'express';
// IMPORTANTE: El nombre debe ser 'especie.controller.js'
import * as especieController from '../controllers/especie.controller.js';

const router = Router();

// Conectamos la función del controlador
router.get('/', especieController.getEspecies);

export default router;