import {
  obtenerPokemon as obtenerPokemonDeStorage,
  obtenerPokemones as obtenerPokemonesDeStorage,
  guardarPokemon,
  guardarPokemones,
} from './storage.js';

import {
  obtenerPokemon as obtenerPokemonDeApi,
  obtenerPokemones as obtenerPokemonesDeApi,
} from './api.js';

export async function obtenerPokemones() {
  try {
    return obtenerPokemonesDeStorage();
  } catch (e) {
    const pokemones = await obtenerPokemonesDeApi();
    guardarPokemones(pokemones);
    return pokemones;
  }
}

export async function obtenerPokemon(url) {
  try {
    return obtenerPokemonDeStorage(url);
  } catch (e) {
    const pokemon = await obtenerPokemonDeApi(url);
    guardarPokemon(pokemon);
    return pokemon;
  }
}
