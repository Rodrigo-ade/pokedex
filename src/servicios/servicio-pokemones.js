import {
  obtenerPokemon as obtenerPokemonDeStorage,
  obtenerPokemones as obtenerPokemonesDeStorage,
  guardarPokemon,
  guardarPokemones,
} from '../storage/storage.js';

import { mapearPokemones, mapearPokemon } from '../mapeadores/mapeadores.js';

import {
  obtenerPokemon as obtenerPokemonDeApi,
  obtenerPokemones as obtenerPokemonesDeApi,
} from '../api/api.js';

export async function obtenerPokemones() {
  try {
    return obtenerPokemonesDeStorage();
  } catch (e) {
    const pokemonesLista = mapearPokemones(await obtenerPokemonesDeApi());
    guardarPokemones(pokemonesLista);
    return pokemonesLista;
  }
}

export async function obtenerPokemon(nombre) {
  try {
    return obtenerPokemonDeStorage(nombre);
  } catch (e) {
    const pokemon = mapearPokemon(await obtenerPokemonDeApi(nombre));
    guardarPokemon(pokemon);
    return pokemon;
  }
}
