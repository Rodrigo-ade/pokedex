const IMAGEN_POKEBOLA = 'src/assets/img/pokeball.png';

function crearPokemon(nombre, url, funcionElegirPokemon) {
  const CONTENEDOR_POKEMON = document.createElement('div');
  CONTENEDOR_POKEMON.className = 'col pokemon';
  CONTENEDOR_POKEMON.addEventListener('click', () => funcionElegirPokemon(url));

  const CARTA_POKEMON = document.createElement('div');
  CARTA_POKEMON.className = 'card border-success';
  CARTA_POKEMON.setAttribute('data-bs-toggle', 'modal');
  CARTA_POKEMON.setAttribute('data-bs-target', '#pokemon-elegido');
  CARTA_POKEMON.setAttribute('url', url);

  const IMAGEN = document.createElement('img');
  IMAGEN.className = 'align-self-center';
  IMAGEN.src = IMAGEN_POKEBOLA;
  IMAGEN.alt = 'pokebola';

  const CARTA_CUERPO = document.createElement('div');
  CARTA_CUERPO.className = 'card-body';

  const CARTA_TITULO = document.createElement('h5');
  CARTA_TITULO.className = 'card-title text-center';
  CARTA_TITULO.textContent = nombre;

  CARTA_CUERPO.appendChild(CARTA_TITULO);
  CARTA_POKEMON.appendChild(IMAGEN);
  CARTA_POKEMON.appendChild(CARTA_CUERPO);
  CONTENEDOR_POKEMON.appendChild(CARTA_POKEMON);

  document.querySelector('#pokemones').appendChild(CONTENEDOR_POKEMON);
}

export function mostrarPokemones(pokemonesDatos, funcionElegirPokemon) {
  pokemonesDatos.forEach((pokemonDatos) => {
    crearPokemon(pokemonDatos.nombre, pokemonDatos.url, funcionElegirPokemon);
  });
}

export function mostrarDatosPokemon(pokemon) {
  document.querySelector('#nombre-pokemon').textContent = pokemon.nombre;
  document.querySelector('#altura').textContent = pokemon.altura;
  document.querySelector('#peso').textContent = pokemon.peso;
  document.querySelector('#habilidades').textContent = pokemon.habilidades;
  document.querySelector('#vida').textContent = pokemon.vida;
  document.querySelector('#ataque').textContent = pokemon.ataque;
  document.querySelector('#defensa').textContent = pokemon.defensa;
  document.querySelector('#velocidad').textContent = pokemon.velocidad;
  document.querySelector('#imagen').src = pokemon.imagen;
  document.querySelector('#imagen').alt = pokemon.nombre;
}

export function mostrarCargandoPokemon() {
  const TEXTO_CARGA = 'Cargando...';
  document.querySelector('#nombre-pokemon').textContent = TEXTO_CARGA;
  document.querySelector('#altura').textContent = TEXTO_CARGA;
  document.querySelector('#peso').textContent = TEXTO_CARGA;
  document.querySelector('#habilidades').textContent = TEXTO_CARGA;
  document.querySelector('#vida').textContent = TEXTO_CARGA;
  document.querySelector('#ataque').textContent = TEXTO_CARGA;
  document.querySelector('#defensa').textContent = TEXTO_CARGA;
  document.querySelector('#velocidad').textContent = TEXTO_CARGA;
  document.querySelector('#imagen').src = IMAGEN_POKEBOLA;
}
