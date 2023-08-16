/* eslint-disable import/prefer-default-export */
/* eslint-disable no-plusplus */
let paginaActual = 1;
const POKEMONES_POR_PAGINA = 15;

function paginarPokemones() {
  const $POKEMONES = document.querySelectorAll('#pokemones .pokemon');
  const RANGO_MENOR = (paginaActual * POKEMONES_POR_PAGINA) - POKEMONES_POR_PAGINA;
  const RANGO_MAYOR = (paginaActual * POKEMONES_POR_PAGINA) - 1;

  $POKEMONES.forEach(($pokemon, indice) => {
    if (indice < RANGO_MENOR || indice > RANGO_MAYOR) {
      $pokemon.classList.add('oculto');
    } else {
      $pokemon.classList.remove('oculto');
    }
  });

  return $POKEMONES.length;
}

function marcarPaginaSeleccionada() {
  const PAGINA_SELECCIONADA = document.querySelector('.active');
  if (PAGINA_SELECCIONADA) {
    PAGINA_SELECCIONADA.classList.remove('active');
  }
  document.querySelector(`[data-numero="${paginaActual}"]`).classList.add('active');
}

function cambiarPagina(numeroPagina) {
  if (paginaActual === numeroPagina) {
    return;
  }
  paginaActual = numeroPagina;
  paginarPokemones();
  marcarPaginaSeleccionada();
}

function crearPaginaBoton(numeroPagina, callbackCambiarPagina) {
  const $paginaBoton = document.createElement('li');
  $paginaBoton.classList.add('page-item');
  $paginaBoton.dataset.numero = numeroPagina;
  $paginaBoton.addEventListener('click', () => callbackCambiarPagina(numeroPagina));

  const $paginaNumero = document.createElement('button');
  $paginaNumero.textContent = numeroPagina;
  $paginaNumero.classList.add('page-link');

  $paginaBoton.appendChild($paginaNumero);

  document.querySelector('.pagination').appendChild($paginaBoton);
}

export function manejarPaginacion() {
  const POKEMONES_TOTALES = paginarPokemones();
  const PAGINAS_TOTALES = POKEMONES_TOTALES / POKEMONES_POR_PAGINA;
  for (let i = 0; i < PAGINAS_TOTALES; i++) {
    crearPaginaBoton(i + 1, cambiarPagina);
  }
  marcarPaginaSeleccionada();
}
