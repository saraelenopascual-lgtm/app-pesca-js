import { describe, it, expect } from 'vitest';

describe('Mi primera prueba en Franchesco Log', () => {
    
    it('debería sumar correctamente (Prueba de Vitest)', () => {
        const suma = 2 + 2;
        expect(suma).toBe(4);
    });

    it('debería reconocer un objeto de pez', () => {
        const pez = { nombre: 'Dorada', peso: 1.5 };
        expect(pez.nombre).toBe('Dorada');
        expect(pez).toHaveProperty('peso');
    });
});