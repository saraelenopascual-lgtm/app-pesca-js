import * as UserService from '../services/user.service.js';

export const getUsers = async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

export const saveUser = async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const id = await UserService.createUser(nombre, email);
    res.status(201).json({ id, nombre, email, message: 'Usuario creado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al guardar el usuario' });
  }
};