import { Router } from 'express';
import pool from '../config/db.js'; // Usamos la conexión que ya configuramos

const router = Router();

// Esta ruta se activa cuando el Front envía un "POST" (enviar datos)
router.post('/', async (req, res) => {
    try {
        // Sacamos los datos que vienen del formulario (req.body)
        const { especie, peso, lugar, anzuelo, gameta_largo, plomo_tipo } = req.body;

        // Los insertamos en la tabla 'capturas' de XAMPP
        const [result] = await pool.query(
            'INSERT INTO capturas (especie, peso, lugar, anzuelo, gameta_largo, plomo_tipo) VALUES (?, ?, ?, ?, ?, ?)',
            [especie, peso, lugar, anzuelo, gameta_largo, plomo_tipo]
        );

        res.status(201).json({ mensaje: "✅ Captura guardada con éxito", id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "❌ Error al guardar en la base de datos" });
    }
});

export default router;