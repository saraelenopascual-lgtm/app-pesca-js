import mysql from 'mysql2/promise';

// Creamos la conexión usando las variables de entorno
const pool = mysql.createPool({
  host: process.env.DB_HOST,     // Busca 'localhost' en el .env
  user: process.env.DB_USER,     // Busca 'root' en el .env
  password: process.env.DB_PASS, // Busca la contraseña en el .env
  database: process.env.DB_NAME, // Busca 'curso_node' en el .env
  port: 3306,                    // Puerto estándar de XAMPP
  waitForConnections: true,
  connectionLimit: 10
});

export default pool;