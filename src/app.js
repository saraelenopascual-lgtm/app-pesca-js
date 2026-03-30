import express from 'express';
import userRoutes from './routes/user.routes.js';

const app = express();

// Middleware para que Express entienda JSON en el cuerpo de las peticiones
app.use(express.json());

// Conectamos las rutas de usuarios bajo el prefijo /api/users
app.use('/api/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📂 Ruta de prueba: http://localhost:3000/api/users`);
});