/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
function obtenerPesoEnKilos(peso) {
  peso = peso.toString();
  peso = Number(`${peso.slice(0, -1)}.${peso.slice(-1)}`);
  return peso;
}

function obtenerAlturaEnCentimetros(altura) {
  altura = altura.toString();
  altura = Number(`${altura.slice(0, -1)}.${altura.slice(-1)}`);
  return altura;
}

export function obtenerDatosPokemon(pokemonDatos) {
  return {
    nombre: pokemonDatos.name,
    altura: obtenerAlturaEnCentimetros(Number(pokemonDatos.height)),
    peso: obtenerPesoEnKilos(Number(pokemonDatos.weight)),
    habilidades: pokemonDatos.abilities.map((habilidad) => habilidad.ability.name),
    vida: pokemonDatos.stats[0].base_stat,
    ataque: pokemonDatos.stats[1].base_stat,
    defensa: pokemonDatos.stats[2].base_stat,
    velocidad: pokemonDatos.stats[5].base_stat,
    imagen: pokemonDatos.sprites.other['official-artwork'].front_default,
  };
}
