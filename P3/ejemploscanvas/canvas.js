console.log("Ejecutando JS...");

const canvas = document.getElementById("canvas");

//-- Definir el tamaño del convas
canvas.width = 700;
canvas.height = 700;

//-- Definir constante canvas desde html
const ctx = canvas.getContext("2d");

//-- rectangulo
ctx.rect(5,5, 100, 50);
ctx.rect(100,100, 100, 50);

//-- Cambiar el color de relleno
ctx.fillStyle = 'red';

//-- Cambiar el tamaño de la linea del trazo
ctx.lineWidth = 4;

//-- Línea horizontal
ctx.moveTo(10, 20);
ctx.lineTo(100, 20);

//-- Línea horizontal y vertical, unidas
ctx.moveTo(10, 80);
ctx.lineTo(150,80);
ctx.lineTo(150,20);

ctx.strokeStyle = 'blue';
//-- Cambiar el tamaño de la linea del trazo
ctx.lineWidth = 4;

ctx.beginPath();

ctx.fill();
ctx.stroke();
//-- Dibujar un circulo: coordenadas x,y del centro
//-- Radio, Angulo inicial y angulo final
ctx.arc(100, 50, 50, 0, 2 * Math.PI);
ctx.strokeStyle = 'blue';
ctx.lineWidth = 3;
ctx.fillStyle = 'yellow';

ctx.fill();
ctx.stroke();

//-- Texto solido
ctx.font = "25px Arial";
ctx.fillStyle = 'yellow'
ctx.fillText("Texo sólido", 10, 30);

//-- Texto trazo
ctx.strokeStyle = 'blue';
ctx.font = "50px Arial";
ctx.strokeText("Texto trazo", 0, 80);

//-- Leer la imagen del documento html
//-- Esta deshabilitada
var logo = document.getElementById("logo");

logo.onload = ()=> {
  //-- Insertar la imagen en el canvas, una vez que
  //-- ya esté cargada!
  ctx.drawImage(logo, 150,180);
};
