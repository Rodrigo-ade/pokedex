import Pokemon from '../entidades/pokemon.js';
import Estadistica from '../entidades/estadistica.js';
import PokemonDatos from '../entidades/pokemonDatos.js';
import { obtenerAlturaEnCentimetros, obtenerPesoEnKilos } from '../ui/conversion-datos.js';

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

export function mapearPokemon(apiDatos) {
  const {
    name: nombre,
    height: altura,
    weight: peso,
    sprites: { other: { 'official-artwork': { front_default: imagen } } },
    stats: estadisticas,
    abilities: habilidades,
  } = apiDatos;

  const pokemon = new Pokemon(
    nombre,
    obtenerAlturaEnCentimetros(altura),
    obtenerPesoEnKilos(peso),
    imagen,
    estadisticas.map((e) => new Estadistica(e.stat.name, e.base_stat)),
    habilidades.map((h) => h.ability.name),
  );

  return pokemon;
}
