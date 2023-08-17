export default class Pokemon {
  constructor(nombre, altura, peso, imagen, estadisticas = [], habilidades = []) {
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
    this.imagen = imagen;
    this.estadisticas = estadisticas;
    this.habilidades = habilidades;
  }
}
