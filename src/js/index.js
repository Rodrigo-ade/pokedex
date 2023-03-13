const $CONTENEDOR_CARTAS = document.querySelector(".contenedor-cartas");
const MAXIMO_CARTAS_POR_FILA = 5;
let filaDeCartas = [];
let cartasCreadas = 0;

function crearCarta(nombre,numero,link){
    const COLUMNA_CARTA = document.createElement("div");
    COLUMNA_CARTA.classList.add("col-sm");

    const CARTA = document.createElement("div");
    CARTA.classList.add("carta");
    CARTA.setAttribute("link", `${link}`);

    const CARTA_NUMERO = document.createElement("div");
    CARTA_NUMERO.classList.add("contenedor-numero");
    CARTA_NUMERO.textContent = `# ${numero + 1}`;

    const CARTA_NOMBRE = document.createElement("div");
    CARTA_NOMBRE.classList.add("contenedor-numbre");
    CARTA_NOMBRE.textContent = `${nombre}`.toUpperCase();

    CARTA.appendChild(CARTA_NUMERO);
    CARTA.appendChild(CARTA_NOMBRE);
    COLUMNA_CARTA.appendChild(CARTA);

    return COLUMNA_CARTA;
}

function crearFila(){
    const FILA_CARTAS = document.createElement("div");
    FILA_CARTAS.classList.add("row");
    return FILA_CARTAS;
}

function manejarCreacionCartas(pokemones){
    pokemones.forEach((pokemon, indice) => {
        let cartaCreada = crearCarta(pokemon.name, indice, pokemon.url);
        filaDeCartas.push(cartaCreada);
        cartasCreadas++;

        if(cartasCreadas === MAXIMO_CARTAS_POR_FILA){
            let fila = crearFila();
            filaDeCartas.forEach(carta => {
                fila.appendChild(carta);
            })
            $CONTENEDOR_CARTAS.appendChild(fila);
    
            cartasCreadas = 0;
            filaDeCartas = [];
        }
    });
};

fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
.then(respuesta => respuesta.json())
.then(respuestaJson => manejarCreacionCartas(respuestaJson.results)) 
.catch(error => console.log("Falló", error));
