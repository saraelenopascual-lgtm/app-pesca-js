import pool from '../config/db.js';

// Función para obtener todos los usuarios
export const getAllUsers = async () => {
  const [rows] = await pool.query('SELECT * FROM usuarios');
  return rows;
};

// Función para insertar un usuario nuevo
export const createUser = async (nombre, email) => {
  const [result] = await pool.query(
    'INSERT INTO usuarios (nombre, email) VALUES (?, ?)',
    [nombre, email]
  );
  return result.insertId;
};