import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUsers, saveUser } from '../src/controllers/user.controller.js';
import * as UserService from '../src/services/user.service.js';

// PASO 1: Mockeamos el servicio
vi.mock('../src/services/user.service.js');

describe('User Controller - Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    // PASO 2: Creamos los "dobles" de Request y Response
    req = {
      body: {}
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    };
    // Limpiamos los mocks antes de cada test
    vi.clearAllMocks();
  }); // <-- Aquí faltaba cerrar el beforeEach correctamente

  describe('getUsers', () => {
    it('debería devolver la lista de usuarios con un 200 (éxito)', async () => {
      const mockUsers = [{ id: 1, nombre: 'Sara', email: 'sara@test.com' }];
      UserService.getAllUsers.mockResolvedValue(mockUsers);

      await getUsers(req, res);

      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });

    it('debería devolver un error 500 si el servicio falla', async () => {
      UserService.getAllUsers.mockRejectedValue(new Error('Fallo de DB'));

      await getUsers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al obtener usuarios' });
    });
  });

  describe('saveUser', () => {
    it('debería crear un usuario y devolver 201 con los datos', async () => {
      req.body = { nombre: 'Franchesco', email: 'franchesco@pesca.com' };
      UserService.createUser.mockResolvedValue(10);

      await saveUser(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 10,
        nombre: 'Franchesco',
        email: 'franchesco@pesca.com',
        message: 'Usuario creado con éxito'
      });
    });

    it('debería devolver un 500 si el servicio de creación falla', async () => {
      req.body = { nombre: 'Error', email: 'error@test.com' };
      UserService.createUser.mockRejectedValue(new Error('Error de inserción'));

      await saveUser(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Error al guardar el usuario' });
    });
  });
}); // <-- Este cierra el describe principal