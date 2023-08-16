import PokemonDatos from '../entidades/pokemonDatos.js';

export function mapearPokemones(apiDatos) {
  const pokemonesData = apiDatos.results;
  const pokemones = [];

  pokemonesData.forEach((pokemon) => {
    const {
      name: nombre,
      url: link,
    } = pokemon;

    pokemones.push(new PokemonDatos(nombre, link));
  });
  return pokemones;
}

export function borrar() {

}
