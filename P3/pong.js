console.log("Ejecutando JS...");

//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//----- Dibujar la Bola
ctx.beginPath();
ctx.fillStyle='white';

//-- x,y, anchura, altura
ctx.rect(295, 200, 10, 10);
ctx.fill();

//------- Dibujar las raquetas
ctx.beginPath();
ctx.fillStyle='white';

//-- Raqueta izquierda
ctx.rect(30, canvas.height/2 - 10, 10, 40);

//-- Raqueta derecha
ctx.rect(canvas.width - 30, canvas.height/2 - 10, 10, 40);

//-- Pintar!
ctx.fill();

//--------- Dibujar la red
ctx.beginPath();

//-- Estilo de la linea: discontinua
//-- Trazos de 10 pixeles, y 10 de separacion
ctx.setLineDash([15,15]);
ctx.strokeStyle = 'white';
ctx.lineWidth = 5;
//-- Punto superior de la linea. Su coordenada x está en la mitad
//-- del canvas
ctx.moveTo(canvas.width/2, 10);

//-- Dibujar hasta el punto inferior
ctx.lineTo(canvas.width/2, canvas.height - 10);
ctx.stroke();

//------ Dibujar el tanteo

ctx.fillStyle = "white";
ctx.fillText("0", 200, 80);
ctx.fillText("1", 340, 80);
