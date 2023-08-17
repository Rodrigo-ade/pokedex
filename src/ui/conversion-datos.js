/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
export function obtenerPesoEnKilos(peso) {
  peso = peso.toString();
  peso = Number(`${peso.slice(0, -1)}.${peso.slice(-1)}`);
  return peso;
}

export function obtenerAlturaEnCentimetros(altura) {
  altura = altura.toString();
  altura = Number(`${altura.slice(0, -1)}.${altura.slice(-1)}`);
  return altura;
}
