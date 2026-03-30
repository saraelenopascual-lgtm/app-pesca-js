import express from 'express';
import cors from 'cors'; // 1. Importar
import userRoutes from './routes/user.routes.js';
import capturaRoutes from './routes/captura.routes.js';

const app = express();

app.use(cors()); // 2. Activar permisos para otros dominios
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/capturas', capturaRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});