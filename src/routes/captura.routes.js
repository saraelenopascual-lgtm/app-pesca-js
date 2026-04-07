// src/routes/pesca.js
import { Router } from 'express';
import * as pescaController from '../controllers/captura.controller.js';

const router = Router();

router.get('/estadisticas', pescaController.getEstadisticas);
router.post('/', pescaController.crearCaptura);

export default router;