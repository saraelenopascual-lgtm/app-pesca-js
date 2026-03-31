import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import capturaRoutes from './routes/captura.routes.js';
import especieRoutes from './routes/especie.routes.js'; // <--- 1. IMPORTAR

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/capturas', capturaRoutes);
app.use('/api/especies', especieRoutes); // <--- 2. CONECTAR

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Backend corriendo en http://localhost:${PORT}`);
});