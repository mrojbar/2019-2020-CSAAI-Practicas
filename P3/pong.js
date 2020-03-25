//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//-- Obtener el boton
const reset = document.getElementById("reset");
const saque = document.getElementById("saque");

//-- Variables para la bola
let bola_x = 295;
let bola_y = 200;
let bola_vx = 0;
let bola_vy = 0;

// direccion inicial. 1 derecha y arriba -1 izquierda y abajo.
let direccionx = 1;
let direcciony = 1;

// tamaño de la bola
let bola_tam = 10;

//tamaño de las raquetas
let raqueta_ancho = 10;
let raqueta_alto = 40;

//separacion de la raqueta del fondo
let raqueta_separacion = 30;

let raqueta1_altura = canvas.height/2 - 10;
let raqueta2_altura = canvas.height/2 - 10;

let vel_saque_x = -1;
let vel_saque_y = 0;

reset.onclick = () => {
  //-- Resetear posicion
  bola_x = 70;
  bola_y = 230;
  bola_vx = 0;
  bola_vy = 0;
  direccionx = 1;
  direcciony = 1;
  console.log("Reset");
}

saque.onclick = () => {
  //-- Incrementar la velocidad
  bola_vx += vel_saque_x;
  bola_vy += vel_saque_y;
  console.log("Sacar");
}

function draw(){

  //----- Dibujar la Bola
  ctx.beginPath();
  ctx.fillStyle='white';

  //-- x,y, anchura, altura
  ctx.rect(bola_x, bola_y, bola_tam, bola_tam);
  ctx.fill();

  //------- Dibujar las raquetas
  ctx.beginPath();
  ctx.fillStyle='white';

  //-- Raqueta izquierda
  ctx.rect(raqueta_separacion, raqueta1_altura, raqueta_ancho, raqueta_alto);

  //-- Raqueta derecha
  ctx.rect(canvas.width - raqueta_separacion - raqueta_ancho, raqueta2_altura, raqueta_ancho, raqueta_alto);

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
  ctx.font = "bold 40px courier";
  ctx.fillStyle = "white";
  ctx.fillText("0", 240, 50);
  ctx.fillText("0", 332, 50);
}

//---- Bucle principal de la animación
function animacion()
{
  //--deteccion de colision en paredes.
  if(bola_x >= canvas.width -bola_tam || bola_x <= 0){
    direccionx = -direccionx;
  }
  if(bola_y >= canvas.height -bola_tam || bola_y <= 0){
    direcciony = -direcciony;
  }
  //deteccion de colision en raquetas lado derecho
  if(bola_x <= (raqueta_separacion) && bola_y >= raqueta1_altura && bola_y <= (raqueta1_altura + raqueta_alto)){
    direccionx = -direccionx;
  }
  if(bola_x <= (raqueta_separacion + bola_tam) && bola_x >= (raqueta_separacion - bola_tam) && bola_y >= raqueta1_altura - bola_tam && bola_y <= raqueta1_altura + raqueta_alto){
    direcciony = -direcciony;
    direccionx = -direccionx;
  }
  //--nueva posicion de la bola
  bola_x += bola_vx*direccionx;
  bola_y += bola_vy*direcciony;
  //log en consola para debug
  console.log(bola_x);
  console.log(bola_y);
  //-- Borrar el canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
  //-- Dibujar el nuevo frame
  draw();
  console.log("Frame");
}

//-- Animación
setInterval(()=>{
  animacion();
},16);
