export const validateUser = (req, res, next) => {
  const { nombre, email } = req.body;

  // Comprobamos que existan los datos
  if (!nombre || !email) {
    return res.status(400).json({ error: 'Nombre y email son obligatorios' });
  }

  // Comprobamos que el email tenga un formato básico
  if (!email.includes('@')) {
    return res.status(400).json({ error: 'El formato del email no es válido' });
  }

  // Si todo está bien, pasamos al siguiente paso (el controlador)
  next();
};