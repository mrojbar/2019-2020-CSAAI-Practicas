//-- Leer el párrafo identificado como test
const test1 = document.getElementById('test1')
const test2 = document.getElementById('test2')
const boton1 = document.getElementById('boton1')
const numero1 = document.getElementById('numero1')
const boton2 = document.getElementById('boton2')
const numero2 = document.getElementById('numero2')
//-- Mostrar en la consola el contenido del párrafo
//-- (es la propiedad innerHTML)

//-- Configurar el manejador para el evento de
//-- pulsación de botón
//vars
clicked1 = false;

//funcion de texto
test2.onclick = () => {
  if (clicked1) {
    test1.innerHTML = "¡TEXTO AZUL!"
    test1.style.backgroundColor = "blue";
    clicked1 = false;
  }
  else {
  console.log("Click sobre el párrafo 2...")
  //-- Cambiar su texto
  test1.innerHTML = "¡TEXTO AMARILLO!"
  test1.style.backgroundColor = "yellow";
  clicked1 = true;
  }
  console.log(test1.innerHTML);
}
//funcion  de Boton aleatorio
boton1.onclick = () => {
    numRand = Math.floor(Math.random()*11);
    numero1.innerHTML = numRand.toString(10);
}
//funcion  de Boton aleatorio añadir
boton2.onclick = () => {
    //creando parrafo
    para = document.createElement("P");
    //creando numero aleatorio y metiendo en parrafo
    numRand = Math.floor(Math.random()*11);
    para.innerHTML = numRand.toString(10);
    //metiendo parrafo en el padre
    document.getElementById("numero2").appendChild(para);
}
