console.log("Ejecutando JS....")

//-- Obtener elementos del DOM
const canvas = document.getElementById('canvas');
const img = document.getElementById('imagesrc');
const ctx = canvas.getContext('2d');

//-- Acceso al deslizador
var deslizadorR = document.getElementById('deslizadorR');
var deslizadorG = document.getElementById('deslizadorG');
var deslizadorB = document.getElementById('deslizadorB');

//-- Valor del deslizador
const range_valueR = document.getElementById('range_valueR');
const range_valueG = document.getElementById('range_valueG');
const range_valueB = document.getElementById('range_valueB');

//-- Botones
const botonGrises = document.getElementById('grises');
const botonOriginal = document.getElementById('original');

//bandera de escala de botonGrises
var grisesOn = false;

//-- Función de retrollamada de imagen cargada
//-- La imagen no se carga instantaneamente, sino que
//-- lleva un tiempo. Sólo podemos acceder a ella una vez
//-- que esté totalmente cargada
img.onload = function () {

  //-- Se establece como tamaño del canvas el mismo
  //-- que el de la imagen original
  canvas.width = img.width;
  canvas.height = img.height;

  //-- Situar la imagen original en el canvas
  //-- No se han hecho manipulaciones todavia
  ctx.drawImage(img, 0,0);

  console.log("Imagen lista.");
};

deslizadorR.oninput = () => {
  colores();
}

deslizadorG.oninput = () => {
  colores();
}

deslizadorB.oninput = () => {
  colores();
}

//-- Deslizador de colores.
function colores(){
  if (grisesOn == false){
    //-- Mostrar el nuevo valor del deslizador
    range_valueR.innerHTML = deslizadorR.value;
    range_valueG.innerHTML = deslizadorG.value;
    range_valueB.innerHTML = deslizadorB .value;

    //-- Situar la imagen original en el canvas
    //-- No se han hecho manipulaciones todavia
    ctx.drawImage(img, 0,0);

    //-- Obtener la imagen del canvas en pixeles
    let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    //-- Obtener el array con todos los píxeles
    let data = imgData.data

    //-- Obtener el umbral del desliador
    umbralR = deslizadorR.value
    umbralG = deslizadorG.value
    umbralB = deslizadorB.value

    //-- Filtrar la imagen según nuevos umbrales
    for (let i = 0; i < data.length; i+=4) {
      if (data[i] > umbralR)
        data[i] = umbralR;
      if (data[i + 1] > umbralG)
        data[i + 1] = umbralG;
      if (data[i + 2] > umbralB)
        data[i + 2] = umbralB;
    }

    //-- Poner la imagen modificada en el canvas
    ctx.putImageData(imgData, 0, 0);
  }
}

botonGrises.onclick = () => {
  grisesOn = true;
  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Obtener el array con todos los píxeles
  let data = imgData.data

  for (let i = 0; i < data.length; i+=4) {
      brillo = (3 * data[i] + 4 * data[i + 1] + data[i + 2])/8;
      data[i] = brillo;
      data[i+1] = brillo;
      data[i+2] = brillo;
  }

  //-- Poner la imagen modificada en el canvas
  ctx.putImageData(imgData, 0, 0);
}

botonOriginal.onclick = () => {
  grisesOn = false;
  //-- restaurar deslizadores
  document.getElementById("deslizadorR").value = "255";
  document.getElementById("deslizadorG").value = "255";
  document.getElementById("deslizadorB").value = "255";
  range_valueR.innerHTML = 255;
  range_valueG.innerHTML = 255;
  range_valueB.innerHTML = 255;

  //-- Obtener la imagen del canvas en pixeles
  let imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //-- Poner la imagen original en el canvas
  ctx.drawImage(img, 0,0);

}
