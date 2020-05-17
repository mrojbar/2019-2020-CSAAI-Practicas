//-- Obtener el objeto canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
//-- Obtener el boton
const reset = document.getElementById("reset");
const saque = document.getElementById("saque");

//flag de colision
let flag_dentro = false;

// tamaño de la bola
let bola_tam = 10;

//-- Variables para la bola
let bola_x = canvas.width/2 - bola_tam/2;
let bola_y = canvas.height/2 - bola_tam/2;
let bola_vx = 0;
let bola_vy = 0;

// direccion inicial. 1 derecha y arriba -1 izquierda y abajo.
let direccionx = 1;
let direcciony = 1;

//tamaño de las raquetas
let raqueta_ancho = 10;
let raqueta_alto = 60;

//separacion de la raqueta del fondo
let raqueta_separacion = 30;
 
let raqueta1_altura = canvas.height/2 - raqueta_alto/2;
let raqueta2_altura = canvas.height/2 - raqueta_alto/2;

let vel_saque_x = 1.5;
let vel_saque_y = 1.1;

let vel_raqueta = 40;

let raqueta1_dir = 0; //dir es 1 para arriba y -1 para abajo.
let raqueta2_dir = 0;

let puntos1 = 0;
let puntos2 = 0;

let sentido = 0;

function sentidoInit(){
  sentido = -1;
  if (Math.round((Math.random())>0.5)){
    sentido = 1;
  }
}
sentidoInit();

//-- Funcion de movimiento de raqueta1
window.onkeydown = (e) => {
  raqueta1_dir = 0;
  raqueta2_dir = 0;

  if (e.key == 'w') {
    raqueta1_altura -= vel_raqueta;
    raqueta1_dir = 1;
  }
  if (e.key == '8') {
    raqueta2_altura -= vel_raqueta;
    raqueta2_dir = 1;
  }
  if (e.key == 's'){
    raqueta1_altura += vel_raqueta;
    raqueta1_dir = -1;
  }
  if (e.key == '5'){
    raqueta2_altura += vel_raqueta;
    raqueta2_dir = -1;
  }
  if (e.key == ' '){
    saqueFcn();
  }
}

reset.onclick = () => {
  resetFcn();
}

function saqueFcn(){
  //-- Añadir velocidad
  bola_vx = vel_saque_x*sentido;
  bola_vy = vel_saque_y;
  console.log("Sacar");
}

saque.onclick = () => {
  saqueFcn();
}

function puntos(){
  if(bola_x <= 0){
    puntos2 +=1;
    sentido = 1;
  }
  else if(bola_x > 0){
    puntos1 +=1;
    sentido = -1;
  }
  if(puntos1 == 5 || puntos2 == 5){
    puntos1 = 0;
    puntos2 = 0;
    return;
  }
}

function resetFcn(){
  //-- Resetear posicion
  bola_x = canvas.width/2 - bola_tam/2;
  bola_y = canvas.height/2 - bola_tam/2;
  bola_vx = 0;
  bola_vy = 0;
  direccionx = 1;
  direcciony = 1;
  raqueta1_altura = canvas.height/2 - raqueta_alto/2;
  raqueta2_altura = canvas.height/2 - raqueta_alto/2;
  console.log("Reset");
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
  ctx.lineWidth = 2;
  //-- Punto superior de la linea. Su coordenada x está en la mitad
  //-- del canvas
  ctx.moveTo(canvas.width/2, 10);

  //-- Dibujar hasta el punto inferior
  ctx.lineTo(canvas.width/2, canvas.height - 10);
  ctx.stroke();

  //------ Dibujar el tanteo
  ctx.font = "bold 40px courier";
  ctx.fillStyle = "white";
  ctx.fillText(puntos1, 240, 50);
  ctx.fillText(puntos2, 332, 50);
}

function cambioTrayectoria(raqueta){
  let vel_mod = Math.sqrt(Math.pow(bola_vx,2)+Math.pow(bola_vy,2));
  let vel_ang = Math.atan(bola_vy/bola_vx);

  console.log("Velmod: "+vel_mod+", Velang: "+vel_ang);

  if(raqueta == "raq1"){
    bola_vx = vel_mod * Math.cos(vel_ang + 0.15*raqueta1_dir);
    bola_vy = vel_mod * Math.sin(vel_ang + 0.15*raqueta1_dir);
  }
  else if(raqueta == "raq2"){
    bola_vx = vel_mod * Math.cos(vel_ang + 0.15*raqueta2_dir);
    bola_vy = vel_mod * Math.sin(vel_ang + 0.15*raqueta2_dir);
  }
}

//--- colisiones
function colision(){
  //deteccion de colision en raqueta1
  if(bola_x <= (raqueta_separacion + raqueta_ancho) && bola_x >= (raqueta_separacion - bola_tam)
  && bola_y >= raqueta1_altura - bola_tam && bola_y <= raqueta1_altura + raqueta_alto){//si la bola contacta con alguno de los lados de la raqueta
    if(bola_y <= raqueta1_altura - bola_tam + bola_tam/2 || bola_y >= raqueta1_altura + raqueta_alto - bola_tam/2){//si la bola esta dentro de la raqueta por debajo
      if(!flag_dentro){//cambiar de direccion si no se ha hecho ya.
        direccionx = -direccionx;
        direcciony = -direcciony;
        flag_dentro = true;
      }
    return;
    }
    else{
      if(!flag_dentro){//cambiar la direccion y angulo si no esta ya dentro
        direccionx = -direccionx;
        cambioTrayectoria("raq1");
        flag_detro = true;
      }
    return;
    }
  }
  //deteccion de colision en raqueta2
  else if(bola_x <= (canvas.width - raqueta_separacion) && bola_x >= (canvas.width - raqueta_separacion - raqueta_ancho -bola_tam)
  && bola_y >= raqueta2_altura - bola_tam && bola_y <= raqueta2_altura + raqueta_alto){
    if(bola_y <= raqueta2_altura - bola_tam + bola_tam/2 || bola_y >= raqueta2_altura + raqueta_alto - bola_tam/2){
      if(!flag_dentro){
        direccionx = -direccionx;
        direcciony = -direcciony;
        flag_dentro = true;
      }
    return;
    }
    else{
      if(!flag_dentro){
        direccionx = -direccionx;
        cambioTrayectoria("raq2");
        flag_detro = true;
      }
    return;
    }
  }
  //--deteccion de colision en paredes.
  else if(bola_x >= canvas.width -bola_tam || bola_x <= 0){//paredes frente y fondo
    puntos();
    resetFcn();
    return;
  }
  else if(bola_y >= canvas.height -bola_tam || bola_y <= 0){//paredes arriba y abajo
    direcciony = -direcciony;
    return;
  }
  else flag_dentro = false;
}

//---- Bucle principal de la animación
function animacion()
{
  colision();
  //--nueva posicion de la bola
  bola_x += bola_vx*direccionx;
  bola_y += bola_vy*direcciony;
  //log en consola para debug
  //console.log(bola_x);
  //console.log(bola_y);
  //-- Borrar el canvas
  ctx.clearRect(0,0, canvas.width, canvas.height);
  //-- Dibujar el nuevo frame
  draw();
  console.log("flag dentro: "+flag_dentro);
  console.log("Frame");
}

//-- Animación
setInterval(()=>{
  animacion();
},5);
