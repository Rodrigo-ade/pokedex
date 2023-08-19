import { mostrarPokemones, mostrarDatosPokemon, mostrarCargandoPokemon } from './ui/ui.js';
import { obtenerPokemones, obtenerPokemon } from './servicios/servicio-pokemones.js';
import { manejarPaginacion } from './ui/paginacion.js';

async function elegirPokemon(nombre) {
  mostrarCargandoPokemon();
  mostrarDatosPokemon(await obtenerPokemon(nombre));
}

async function iniciar() {
  mostrarPokemones(await obtenerPokemones(), elegirPokemon);
  manejarPaginacion();
}

iniciar();
