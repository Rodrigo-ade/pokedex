//siguientePeticion = respuesta.next;

const IMAGEN_POKEBOLA = "src/assets/img/pokeball.png";
const URL_BASE = "https://pokeapi.co/api/v2/";
let offset = 0;
let cantidadTotal;
let peticion = `pokemon?limit=15&offset=`;

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
    let elemento = e.target;
    let elementoPadre = e.target.offsetParent;
    let url = "";

    if(elemento.classList.contains("card")){
        url = elemento.getAttribute("url");
    }else if(elementoPadre.classList.contains("card")){
        url = elementoPadre.getAttribute("url");
    }

    if(url !== ""){
        completarDatosPokemon("cargando...","","","","","","","","");
        fetch(url)
        .then(respuesta => respuesta.json())
        .then(respuesta => {
            let nombre = respuesta.name;
            let altura = respuesta.height;
            let peso = respuesta.weight;
            let habilidades = respuesta.abilities.map(habilidad => habilidad.ability.name);
            let vida      = respuesta.stats[0].base_stat;
            let ataque    = respuesta.stats[1].base_stat;
            let defensa   = respuesta.stats[2].base_stat;
            let velocidad = respuesta.stats[5].base_stat;
            let imagen    = respuesta.sprites.other['official-artwork'].front_default;             
            completarDatosPokemon(nombre,altura,peso,habilidades,vida,ataque,defensa,velocidad,imagen);
        });
    }
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
    const CONTENEDOR_POKEMON = document.createElement("div");
    CONTENEDOR_POKEMON.className = "col";

    const CARTA_POKEMON = document.createElement("div");
    CARTA_POKEMON.className = "card border-success";
    CARTA_POKEMON.setAttribute("data-bs-toggle","modal");
    CARTA_POKEMON.setAttribute("data-bs-target", "#pokemon-elegido");
    CARTA_POKEMON.setAttribute("url", url);

    const IMAGEN = document.createElement("img");
    IMAGEN.className = "align-self-center"
    IMAGEN.src = IMAGEN_POKEBOLA;
    IMAGEN.alt = "pokebola";

    const CARTA_CUERPO = document.createElement("div");
    CARTA_CUERPO.className = "card-body";

    const CARTA_TITULO = document.createElement("h5");
    CARTA_TITULO.className = "card-title text-center";
    CARTA_TITULO.textContent = nombre;

    CARTA_CUERPO.appendChild(CARTA_TITULO);
    CARTA_POKEMON.appendChild(IMAGEN);
    CARTA_POKEMON.appendChild(CARTA_CUERPO);
    CONTENEDOR_POKEMON.appendChild(CARTA_POKEMON);

    document.querySelector("#pokemones").appendChild(CONTENEDOR_POKEMON);
}

const $BOTON_PREVIO = document.querySelector("#previo");
const $BOTON_SIGUIENTE = document.querySelector("#siguiente");

$BOTON_PREVIO.onclick = anteriorPagina;
$BOTON_SIGUIENTE.onclick = siguientePagina;

function anteriorPagina(){
    offset -= 15;
    if(offset <= 0){
        offset = 0;
        $BOTON_PREVIO.classList.add("oculto");
    };
    document.querySelector("#siguiente").classList.remove("oculto");
    eliminarCartasAnteriores();
    obtenerPokemones(offset);
    
}

function siguientePagina(){
    if(cantidadTotal < offset +15){
        document.querySelector("#siguiente").classList.add("oculto");
        return;
    }

    offset += 15;
    $BOTON_PREVIO.classList.remove("oculto");
    eliminarCartasAnteriores();
    obtenerPokemones(offset);
}

function eliminarCartasAnteriores(){
    let cartas = document.querySelector("#pokemones");
    while(cartas.firstChild){
        cartas.removeChild(cartas.firstChild);
    }
}
