const URL_BASE = "https://pokeapi.co/api/v2/";
let peticion = `pokemon?limit=15&offset=`;
let offset = 0;
let cantidadTotal;

agregarEventosPokemones();
obtenerPokemones(offset);

function obtenerPokemones(offset){
    let pokemones;

    fetch(`${URL_BASE}${peticion}${offset}`)
    .then(respuesta => respuesta.json())
    .then(respuesta => {
        cantidadTotal = respuesta.count;
        pokemones = respuesta.results;
        agregarPokemones(pokemones);
    });
}

function agregarPokemones(pokemones){
    Object.keys(pokemones).forEach(pokemon => {
        let nombrePokemon = pokemones[pokemon].name;
        let url = pokemones[pokemon].url;

       crearPokemon(nombrePokemon,url);
    });
}

function agregarEventosPokemones(){
    document.querySelector("#pokemones").onclick = seleccionarPokemon;
}

function seleccionarPokemon(e){
    let $pokemon = e.target;
    let $contenedorPokemon = e.target.offsetParent;
    let url = "";

    if($pokemon.classList.contains("card")){
        url = $pokemon.getAttribute("url");
    }else if($contenedorPokemon.classList.contains("card")){
        url = $contenedorPokemon.getAttribute("url");
    }

    if(url !== ""){
        mostrarMensaje("Cargando...");
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            const nombre = respuesta.name;
            const altura = obtenerAlturaEnCentimetros(Number(respuesta.height));
            const peso = obtenerPesoEnKilos(Number(respuesta.weight));
            const habilidades = respuesta.abilities.map(habilidad => habilidad.ability.name);
            const vida      = respuesta.stats[0].base_stat;
            const ataque    = respuesta.stats[1].base_stat;
            const defensa   = respuesta.stats[2].base_stat;
            const velocidad = respuesta.stats[5].base_stat;
            const imagen    = respuesta.sprites.other['official-artwork'].front_default;             
            completarDatosPokemon(nombre,altura,peso,habilidades,vida,ataque,defensa,velocidad,imagen);
        });
    }
}

function mostrarMensaje(mensaje){
  completarDatosPokemon(mensaje);
}

function obtenerPesoEnKilos(peso){
    let pesoNumero = peso.toString();
    let pesoKilos = Number(pesoNumero.slice(0, -1) +"."+pesoNumero.slice(-1));
    return pesoKilos;
}
    
function obtenerAlturaEnCentimetros(altura){
    let alturaNumero = altura.toString();
    let alturaCentimetros = Number(alturaNumero.slice(0,-1)+"."+alturaNumero.slice(-1));
    return alturaCentimetros;
}

function completarDatosPokemon(nombre,altura,peso,habilidades,vida,ataque,defensa,velocidad,imagen){
    document.querySelector("#nombre-pokemon").textContent = nombre;
    document.querySelector("#altura").textContent = altura;
    document.querySelector("#peso").textContent = peso;
    document.querySelector("#habilidades").textContent = habilidades;
    document.querySelector("#vida").textContent = vida;
    document.querySelector("#ataque").textContent = ataque;
    document.querySelector("#defensa").textContent = defensa;
    document.querySelector("#velocidad").textContent = velocidad;
    document.querySelector("#imagen").src = imagen;
};

function crearPokemon(nombre,url){
    const IMAGEN_POKEBOLA = "src/assets/img/pokeball.png";
    const $contenedorPokemon = document.createElement("div");
    $contenedorPokemon.className = "col";

    const $cartaPokemon = document.createElement("div");
    $cartaPokemon.className = "card border-success";
    $cartaPokemon.setAttribute("data-bs-toggle","modal");
    $cartaPokemon.setAttribute("data-bs-target", "#pokemon-elegido");
    $cartaPokemon.setAttribute("url", url);

    const $imagen = document.createElement("img");
    $imagen.className = "align-self-center"
    $imagen.src = IMAGEN_POKEBOLA;
    $imagen.alt = "pokebola";

    const $cartaCuerpo = document.createElement("div");
    $cartaCuerpo.className = "card-body";

    const $cartaTitulo = document.createElement("h5");
    $cartaTitulo.className = "card-title text-center";
    $cartaTitulo.textContent = nombre;

    $cartaCuerpo.appendChild($cartaTitulo);
    $cartaPokemon.appendChild($imagen);
    $cartaPokemon.appendChild($cartaCuerpo);
    $contenedorPokemon.appendChild($cartaPokemon);

    document.querySelector("#pokemones").appendChild($contenedorPokemon);
}

const $botonPrevio = document.querySelector("#previo");
const $botonSiguiente = document.querySelector("#siguiente");

$botonPrevio.onclick = cargarAnteriorPagina;
$botonSiguiente.onclick = siguientePagina;

function cargarAnteriorPagina(){
    offset -= 15;
    if(offset <= 0){
        offset = 0;
        ocultarElemento($botonPrevio);
    };
    ocultarElemento($botonSiguiente, false);
    eliminarCartasAnteriores();
    obtenerPokemones(offset);
    
}

function ocultarElemento(elemento, ocultar = true){
  if(ocultar){
    elemento.classList.add("oculto");
  }else{
    elemento.classList.remove("oculto");
  }
}

function siguientePagina(){
    if(cantidadTotal < offset +15){
        ocultarElemento($botonSiguiente);
        return;
    }

    offset += 15;
    ocultarElemento($botonPrevio,false);
    eliminarCartasAnteriores();
    obtenerPokemones(offset);
}

function eliminarCartasAnteriores(){
    let cartas = document.querySelector("#pokemones");
    while(cartas.firstChild){
        cartas.removeChild(cartas.firstChild);
    }
}
