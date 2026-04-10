// src/controllers/captura.controller.js
import pool from '../config/db.js';

export const getEstadisticas = async (req, res) => {
    try {
        const [stats] = await pool.query(`
            SELECT 
                COUNT(*) as total_capturas,
                IFNULL(SUM(peso), 0) as peso_total,
                (SELECT especie FROM capturas GROUP BY especie ORDER BY COUNT(*) DESC LIMIT 1) as especie_top,
                (SELECT plomo_tipo FROM capturas GROUP BY plomo_tipo ORDER BY COUNT(*) DESC LIMIT 1) as plomo_top,
                IFNULL(MAX(peso), 0) as record_weight
            FROM capturas
        `);
        res.json(stats[0]);
    } catch (error) {
        console.error("Error en SQL:", error);
        res.status(500).json({ error: "❌ Error al calcular estadísticas" });
    }
};

export const crearCaptura = async (req, res) => {
    try {
        // 1. Añadimos latitud y longitud a la extracción de datos
        const { especie, peso, lugar, anzuelo, gameta_largo, plomo_tipo, latitud, longitud } = req.body;
        
        // 2. Actualizamos la consulta SQL con los 8 campos y 8 interrogantes
        const [result] = await pool.query(
            'INSERT INTO capturas (especie, peso, lugar, anzuelo, gameta_largo, plomo_tipo, latitud, longitud) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [especie, peso, lugar, anzuelo, gameta_largo, plomo_tipo, latitud || null, longitud || null]
        );
        
        res.status(201).json({ mensaje: "✅ Captura guardada con éxito", id: result.insertId });
    } catch (error) {
        console.error("Error al guardar:", error);
        res.status(500).json({ error: "❌ Error al guardar en la base de datos" });
    }
};