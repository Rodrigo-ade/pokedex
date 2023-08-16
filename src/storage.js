function crearKeyPokemones() {
  return 'pokemones';
}

export function guardarPokemones(pokemones) {
  localStorage.setItem(crearKeyPokemones(), JSON.stringify(pokemones));
}

export function obtenerPokemones() {
  const pokemones = JSON.parse(localStorage.getItem('pokemones'));
  if (pokemones === null) {
    throw new Error('Los pokemones no han sido obtenidos de local storage');
  }
  return pokemones;
}

function crearKeyPokemon(pokemon) {
  return `pokemon_${pokemon.name}`;
}

export function guardarPokemon(pokemon) {
  localStorage.setItem(crearKeyPokemon(pokemon), JSON.stringify(pokemon));
}

export function obtenerPokemon(url) {
  const pokemon = localStorage.getItem(JSON.parse(crearKeyPokemon(url)));
  if (pokemon === null) {
    throw new Error(`El pokemon ${url} no esta en local storage`);
  }
  return pokemon;
}
