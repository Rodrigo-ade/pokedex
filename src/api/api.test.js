/// <reference types="Jest" />

import { obtenerPokemon, obtenerPokemones } from './api.js';

beforeEach(() => {
  global.fetch = jest.fn();
});

test('Prueba obtener 1 Pokemon', () => {
  global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
    const jsonPromise = new Promise((r) => {
      r({});
    });
    resolve({ json: () => jsonPromise });
  }));

  obtenerPokemon('prueba');

  expect(global.fetch)
    .toBeCalledWith('prueba');
});

test('Prueba obtener pokemones', () => {
  global.fetch.mockImplementationOnce(() => new Promise((resolve) => {
    const jsonPromise = new Promise((r) => {
      r({});
    });

    resolve({ json: () => jsonPromise });
  }));

  obtenerPokemones();
  expect(global.fetch)
    .toBeCalledTimes(1);
});
