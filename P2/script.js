const pantalla = document.getElementById('pantalla')
const botonSuma = document.getElementById('botonSuma')
const boton1 = document.getElementById('boton1')
const boton2 = document.getElementById('boton2')

//funcion de escritura de valor en pantalla
function escribeBoton (objeto){
  if (pantalla.innerHTML == 0)
    pantalla.innerHTML = objeto;
  else {
  add = document.createTextNode(objeto);
  document.getElementById("pantalla").appendChild(add);
  }
}
//limpiar pantalla CLEAR
botonclear.onclick = () => {
    pantalla.innerHTML = 0;
}
//eventos de botones
botonSuma.onclick = function () {escribeBoton("+")};
boton1.onclick = function () {escribeBoton(1)};
boton2.onclick = function () {escribeBoton(2)};
