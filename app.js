import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para que Express entienda JSON
app.use(express.json());

// 1. Ruta GET: Para obtener información
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando en Node 24!');
});

// 2. Ruta con Parámetros: Para obtener datos específicos
app.get('/usuario/:nombre', (req, res) => {
  const nombre = req.params.nombre;
  res.json({ 
    mensaje: `Hola, ${nombre} es la mejor`,
    status: "success" 
});
});

// 3. Ruta POST: Para enviar/crear datos
app.post('/datos', (req, res) => {
  const cuerpo = req.body;
  res.status(201).json({
    recibido: cuerpo,
    nota: "Datos guardados (simulado)"
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});