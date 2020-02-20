//-- Leer el párrafo identificado como test
const pantalla = document.getElementById('pantalla')
const boton1 = document.getElementById('boton1')
const boton2 = document.getElementById('boton2')
//-- Mostrar en la consola el contenido del párrafo
//-- (es la propiedad innerHTML)

//-- Configurar el manejador para el evento de
//-- pulsación de botón
//vars
clicked1 = false;

botonclear.onclick = () => {
    pantalla.innerHTML = 0;
}

boton1.onclick = () => {
  add = document.createElement("P");
  num = 1;
  add.innerHTML = num.toString(10);
  document.getElementById("pantalla").appendChild(add);
}

boton2.onclick = () => {
  add = document.createElement("P");
  num = 2;
  add.innerHTML = num.toString(10);
  document.getElementById("pantalla").appendChild(add);
}
