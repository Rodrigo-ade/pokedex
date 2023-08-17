const URL_BASE = 'https://pokeapi.co/api/v2';

export async function obtenerPokemon(nombre) {
  const PETICION_POKEMON = `/pokemon/${nombre}`;
  return fetch(URL_BASE + PETICION_POKEMON).then((r) => r.json());
}

export async function obtenerPokemones() {
  const URL_POKEMONES = '/pokemon?limit=100000&offset=0';

  return fetch(URL_BASE + URL_POKEMONES)
    .then((respuesta) => respuesta.json());
}
