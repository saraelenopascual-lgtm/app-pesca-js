// src/controllers/especie.controller.js
import pool from '../config/db.js';

export const getEspecies = async (req, res) => {
    try {
        console.log("--- Consultando la Capturopedia ---");
        const [rows] = await pool.query('SELECT * FROM especies');
        console.log("Especies encontradas:", rows.length);
        res.json(rows);
    } catch (error) {
        console.error("Error en el controlador de especies:", error);
        res.status(500).json({ error: "Error al obtener la capturopedia" });
    }
};