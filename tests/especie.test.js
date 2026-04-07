import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as especiesController from '../src/controllers/especie.controller.js';
import pool from '../src/config/db.js';

// Mockeamos el pool de la base de datos
vi.mock('../src/config/db.js', () => ({
  default: {
    query: vi.fn()
  }
}));

describe('Especies Controller - Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    vi.clearAllMocks();
    req = {}; // GET no suele necesitar body
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    };
  });

  it('debería devolver la lista de la capturopedia con un 200', async () => {
    // 1. Preparamos los datos falsos (Mocks)
    const mockEspecies = [
      { id: 1, nombre: 'Dorada', descripcion: 'Pez de roca' },
      { id: 2, nombre: 'Sargo', descripcion: 'Pez plateado' }
    ];
    
    // Simulamos que la query devuelve esos datos
    pool.query.mockResolvedValue([mockEspecies]);

    // 2. Ejecutamos la función
    await especiesController.getEspecies(req, res);

    // 3. Verificamos los resultados
    expect(res.json).toHaveBeenCalledWith(mockEspecies);
    // Verificamos que no hubo errores (no se llamó a status 500)
    expect(res.status).not.toHaveBeenCalledWith(500);
  });

  it('debería devolver un 500 si falla la conexión a la base de datos', async () => {
    // Simulamos un fallo total
    pool.query.mockRejectedValue(new Error('Error crítico de conexión'));

    await especiesController.getEspecies(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: "Error al obtener la capturopedia" });
  });
});