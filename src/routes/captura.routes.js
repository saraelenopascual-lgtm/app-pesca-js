import { Router } from 'express';
import pool from '../config/db.js'; // Usamos la conexión que ya configuramos

const router = Router();

// 1. NUEVA RUTA: Obtener cálculos para las estadísticas (Copia esto)
router.get('/estadisticas', async (req, res) => {
    try {
        const [stats] = await pool.query(`
            SELECT 
                COUNT(*) as total_capturas,
                IFNULL(SUM(peso), 0) as peso_total,
                (SELECT especie FROM capturas GROUP BY especie ORDER BY COUNT(*) DESC LIMIT 1) as especie_top,
                (SELECT plomo_tipo FROM capturas GROUP BY plomo_tipo ORDER BY COUNT(*) DESC LIMIT 1) as plomo_top,
                IFNULL(MAX(peso), 0) as record_peso
            FROM capturas
        `);
        
        // Enviamos el primer resultado (la fila con todos los cálculos)
        res.json(stats[0]);
    } catch (error) {
        console.error("Error en SQL:", error);
        res.status(500).json({ error: "❌ Error al calcular estadísticas" });
    }
});

// 2. RUTA EXISTENTE: Guardar datos (La que ya tenías)
router.post('/', async (req, res) => {
    try {
        const { especie, peso, lugar, anzuelo, gameta_largo, plomo_tipo } = req.body;

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