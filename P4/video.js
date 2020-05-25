//----- Videos
var video1 = document.getElementById("video1")
video1.width=427;  //-- Tamaño de la pantalla de video
video1.height=240;

const video2 = document.getElementById("video2")
video2.width=213;
video2.height=120;

const video3 = document.getElementById("video3")
video3.width=213;
video3.height=120;

const video4 = document.getElementById("video4")
video4.width=213;
video4.height=120;

video1.poster="https://i.ytimg.com/vi/ayf1sYiNLhQ/maxresdefault.jpg";

video2.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente1.mp4"
video4.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente2.mp4"
video3.src="https://gsyc.urjc.es/jmplaza/csaai/realizador-fuente3.mp4"

//-- var global de modo
var FlagModoNormal = true; //true normal, false auto.

//-- Botones
const ModoNormal = document.getElementById("modonormal");
const ModoAuto = document.getElementById("modoauto");
const play1 = document.getElementById("play1");
const play2 = document.getElementById("play2");
const play3 = document.getElementById("play3");

//-- Funciones

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function coloreaMarcoFuente(num){
  if (num == 0){
    document.getElementById("video2").style.border = "thick solid rgba(255,51,51,0)";
    document.getElementById("video3").style.border = "thick solid rgba(255,51,51,0)";
    document.getElementById("video4").style.border = "thick solid rgba(255,51,51,0)";
  }
  else if (num == 1){
    document.getElementById("video2").style.border = "thick solid rgba(255,51,51,1)";
    document.getElementById("video3").style.border = "thick solid rgba(255,51,51,0)";
    document.getElementById("video4").style.border = "thick solid rgba(255,51,51,0)";
  }
  else if (num == 2){
    document.getElementById("video2").style.border = "thick solid rgba(255,51,51,0)";
    document.getElementById("video3").style.border = "thick solid rgba(255,51,51,1)";
    document.getElementById("video4").style.border = "thick solid rgba(255,51,51,0)";
  }
  else if (num == 3){
    document.getElementById("video2").style.border = "thick solid rgba(255,51,51,0)";
    document.getElementById("video3").style.border = "thick solid rgba(255,51,51,0)";
    document.getElementById("video4").style.border = "thick solid rgba(255,51,51,1)";
  }
}

ModoNormal.onclick = () => {
  document.getElementById("modonormal").style.border = "thick solid rgba(255,51,51,1)";
  document.getElementById("modonormal").style.color = "rgba(255,51,51,1)";
  document.getElementById("modoauto").style.border = "thick solid rgba(255,51,51,0)";
  document.getElementById("modoauto").style.color = "white";
  FlagModoNormal = true;
  normal();
}

ModoAuto.onclick = () => {
  document.getElementById("modoauto").style.border = "thick solid rgba(255,51,51,1)";
  document.getElementById("modoauto").style.color = "rgba(255,51,51,1)";
  document.getElementById("modonormal").style.border = "thick solid rgba(255,51,51,0)";
  document.getElementById("modonormal").style.color = "white";
  FlagModoNormal = false;
  auto();
}

async function auto(){

  video2.play();
  video3.play();
  video4.play();

  coloreaMarcoFuente(0);

  while(FlagModoNormal == false){

    if(FlagModoNormal == true) break;

    video1.src = video2.src;
    video1.currentTime = video2.currentTime;
    coloreaMarcoFuente(1);
    video1.play();

    await sleep(3000);

    if(FlagModoNormal == true) break;

    video1.src = video3.src;
    video1.currentTime = video3.currentTime;
    coloreaMarcoFuente(2);
    video1.play();

    await sleep(3000);

    if(FlagModoNormal == true) break;

    video1.src = video4.src;
    video1.currentTime = video4.currentTime;
    coloreaMarcoFuente(3);
    video1.play();

    await sleep(3000);
  }
}

function normal(){
  video2.play();
  video3.play();
  video4.play();

  play1.onclick = () => {
    if (FlagModoNormal == true){
      console.log("Play video 1");
      coloreaMarcoFuente(1);
      video1.src = video2.src;
      video1.currentTime = video2.currentTime;
      video1.play();
    }
  };

  play2.onclick = () => {
    if (FlagModoNormal == true){
      console.log("Play video 1");
      video1.src = video3.src;
      coloreaMarcoFuente(2);
      video1.currentTime = video3.currentTime;
      video1.play();
    }
  };

  play3.onclick = () => {
    if (FlagModoNormal == true){
      console.log("Play video 1");
      coloreaMarcoFuente(3);
      video1.src = video4.src;
      video1.currentTime = video4.currentTime;
      video1.play();
    }
  };
}

normal();
