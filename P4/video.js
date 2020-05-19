console.log("Ejecutando JS...");

//----- Obtener elemento de video y configurarlo
var video1 = document.getElementById("video1")
video1.width=480;  //-- Tamaño de la pantalla de video
video1.height=240;

const video2 = document.getElementById("video2")
video2.width=240;
video2.height=120;

const video3 = document.getElementById("video3")
video3.width=240;
video3.height=120;

const video4 = document.getElementById("video4")
video4.width=240;
video4.height=120;

//-- Imagen estática a mostrar cuando el video no
//-- ha arrancado
video1.poster="https://github.com/myTeachingURJC/2019-2020-CSAAI/raw/master/L10/test.png";

video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4"
video4.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4"
video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4"


//-- Obtener los botones
const play1 = document.getElementById("play1");
const play2 = document.getElementById("play2");
const play3 = document.getElementById("play3");

//-- Función de retrollamada del botón de ver
play1.onclick = () => {
  console.log("Play video 1");
  video1.src = video2.src;
  video1.currentTime = video2.currentTime;
  video1.play();
};

play2.onclick = () => {
  console.log("Play video 1");
  video1.src = video3.src;
  video1.currentTime = video3.currentTime;
  video1.play();
};

play3.onclick = () => {
  console.log("Play video 1");
  video1.src = video4.src;
  video1.currentTime = video4.currentTime;
  video1.play();
};

//-- Funcion de retrollamada del boton de parar
stop.onclick = () => {
  video1.pause();
  //-- Quitar la fuente de video, para que se muestre la
  //-- imagen definida en el atributo poster
  video1.src=null;
}

function inicio(){
  video2.play();
  video3.play();
  video4.play();
}

inicio();
