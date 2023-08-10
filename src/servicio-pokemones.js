export async function obtenerPokemones() {
  const URL_POKEMONES = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';

  return fetch(`${URL_POKEMONES}`)
    .then((respuesta) => respuesta.json())
    .then((respuesta) => respuesta.results);
}

export async function obtenerPokemon(url) {
  return fetch(url).then((respuesta) => respuesta.json());
}
