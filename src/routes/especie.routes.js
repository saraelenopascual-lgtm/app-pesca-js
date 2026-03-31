import { Router } from 'express';
import pool from '../config/db.js';
const router = Router();

// RUTA PARA OBTENER LOS PECES
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM especies');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener la capturopedia" });
    }
});

export default router;