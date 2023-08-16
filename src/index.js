import { mostrarPokemones, mostrarDatosPokemon, mostrarCargandoPokemon } from './ui/ui.js';
import { obtenerPokemones, obtenerPokemon } from './servicios/servicio-pokemones.js';
import { obtenerDatosPokemon } from './ui/conversion-datos.js';
import { manejarPaginacion } from './ui/paginacion.js';

async function elegirPokemon(url) {
  mostrarCargandoPokemon();
  mostrarDatosPokemon(obtenerDatosPokemon(await obtenerPokemon(url)));
}

async function iniciar() {
  mostrarPokemones(await obtenerPokemones(), elegirPokemon);
  manejarPaginacion();
}

iniciar();
