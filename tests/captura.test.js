import { describe, it, expect, vi, beforeEach } from 'vitest';
// Intenta con esta ruta (asegúrate de que el nombre del archivo sea exacto)
import * as pescaController from '../src/controllers/captura.controller.js';
import pool from '../src/config/db.js';

vi.mock('../src/config/db.js', () => ({
  default: { query: vi.fn() }
}));

describe('Pesca Controller - Unit Tests', () => {
  let req, res;

  beforeEach(() => {
    vi.clearAllMocks();
    req = { body: {} };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    };
  });

  it('debería devolver estadísticas con un 200', async () => {
    const mockData = [{ total_capturas: 10 }];
    pool.query.mockResolvedValue([mockData]);

    await pescaController.getEstadisticas(req, res);

    expect(res.json).toHaveBeenCalledWith(mockData[0]);
  });

  it('debería crear captura con un 201', async () => {
    req.body = { especie: 'Sargo', peso: 1 };
    pool.query.mockResolvedValue([{ insertId: 50 }]);

    await pescaController.crearCaptura(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ id: 50 }));
  });
});