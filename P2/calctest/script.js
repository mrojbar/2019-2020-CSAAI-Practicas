const pantalla = document.getElementById('pantalla')
const pantallaSol = document.getElementById('pantallaSol')
const botonSuma = document.getElementById('botonSuma')
const botonResta = document.getElementById('botonResta')
const botonMult = document.getElementById('botonMult')
const botonDiv = document.getElementById('botonDiv')
const botonIgual = document.getElementById('botonIgual')
const botonClear = document.getElementById('botonClear')
const boton1 = document.getElementById('boton1')
const boton2 = document.getElementById('boton2')
const boton3 = document.getElementById('boton3')
const boton4 = document.getElementById('boton4')
const boton5 = document.getElementById('boton5')
const boton6 = document.getElementById('boton6')
const boton7 = document.getElementById('boton7')
const boton8 = document.getElementById('boton8')
const boton9 = document.getElementById('boton9')
const botonPunto = document.getElementById('botonPunto')
const botonBorrar = document.getElementById('botonBorrar')

const ERROR = "ERROR DE SINTAXIS"

//-----TECLAS
botonBorrar.onclick = function () {borraUltValor()};
botonClear.onclick = function () {resetTotal(0)};
botonIgual.onclick = function () {calcularSol()};
botonSuma.onclick = function () {escribeBoton("+")};
botonResta.onclick = function () {escribeBoton("-")};
botonMult.onclick = function () {escribeBoton("*")};
botonDiv.onclick = function () {escribeBoton("/")};
botonPunto.onclick = function () {escribeBoton(".")};
boton1.onclick = function () {escribeBoton(1)};
boton2.onclick = function () {escribeBoton(2)};
boton3.onclick = function () {escribeBoton(3)};
boton4.onclick = function () {escribeBoton(4)};
boton5.onclick = function () {escribeBoton(5)};
boton6.onclick = function () {escribeBoton(6)};
boton7.onclick = function () {escribeBoton(7)};
boton8.onclick = function () {escribeBoton(8)};
boton9.onclick = function () {escribeBoton(9)};

pantallaLista = []; //array de objetos en pantalla
numarray = []; //array temporal para los numeros de entrada
memoria = []; //lista de objetos a calcular
memFinal = "";
resultado = 0; //ultimo resultado
flagResultado = false; //se pone a true cuando acabamos de obtener solucion

function resetTotal(){
  pantallaLista = [];
  resetValor(0);
  numarray = [];
  memoria = [];
  memFinal = "";
  resultado = 0;
  flagResultado = false;

  pantalla.innerHTML = 0;
  pantallaSol.innerHTML = "_"
}

//error de sintaxis
function parseError(){
  resetValor(0);
  pantalla.innerHTML = ERROR;
  pantallaLista = [];
  numarray = [];
  memoria = [];
}

function actualizaUltPantalla(){
  pantallaSol.innerHTML = memFinal + " = " + resultado;
}

//-----FUNCIONES ARRAY PANTALLA
//conversion del array y escritura en html
function actualizaPantalla(){
  pantalla.innerHTML = (pantallaLista.toString()).replace(/,/g, "");
}

//reset del array a valor dado y borrado de ultimo resultado
function resetValor(valor){
  pantallaLista = [];
  pantallaLista.push(valor);
  actualizaPantalla();
}
//mete valor al array
function meteValor(valor){
  pantallaLista.push(valor);
  actualizaPantalla();
}

//borra el ultimo valor, vacia se pone a 0
function borraUltValor(){
  pantallaLista.pop();
  if (pantallaLista.length == 0) pantallaLista.push(0);
  actualizaPantalla();
}

//-----I/O
//funcion de input de la calculadora
function escribeBoton (objeto){
  if (pantalla.innerHTML == 0 || pantalla.innerHTML == ERROR){
    resetValor(objeto);
  }
  else {
    if (pantallaLista.length == 30) //memoria de 30 caracteres.
      return;
    else {
      meteValor(objeto);
    }
  }
}

//ejecuta el calculo si parse correcto
function calcular (){
  if(parsePantalla()) solucion();
  else parseError();
}

//calcula la solucion de lo que haya en memoria
function solucion (){
  memFinal = memoria.toString().replace(/,/g, "");
  resultado = Number((eval(memFinal)).toFixed(9));
  flagResultado = true;
  console.log(resultado);//log solucion en consola
  resetValor(0);
  actualizaUltPantalla();
}

function calcularSol (){
  memFinal = pantallaLista.toString().replace(/,/g, "");
  try {
    resultado = Number((eval(memFinal)).toFixed(9))
    console.log(resultado);
  }
  catch {
    console.log("error");
  }
}

//funcion de parsing de caracteres de entrada (guarda en variable memoria) y control de errores
//devuelve false si error, true si correcto.
function parsePantalla (){
  //reseteo de las memorias
  numarray = [];
  memoria = [];
  longPLista = pantallaLista.length;//guardado de longitud de pantallaLista
  longPListaMen = longPLista-1;

  //recorrido del array pantalla.
  for (var i = 0; i < longPLista; i++) {

    if(i == longPListaMen){//si el caracter es el ultimo del array...
      if (!isNaN(pantallaLista[i])) {//si es un numero guardar numarray en memoria como float
        numarray.push(pantallaLista[i]);
        memoria.push(parseFloat((numarray.toString()).replace(/,/g, "")));
        numarray = [];
        continue;
      }
      else
        return false;
    }

    if(i == 0){//si el caracter es el primero del array...
      if (isNaN(pantallaLista[0]) && pantallaLista[0] != ".") {//si es un simbolo...
        if (memFinal != "") {//si hay una solucion anterior: añadir
          memoria.push(resultado);
          //y meter simbolo en memoria
          memoria.push(pantallaLista[0]);
          continue;
        }
        else if (pantallaLista[i]=="-"){//si el primer simbolo es -
          memoria.push(pantallaLista[0]);//mete solo el - en memoria
          continue;
        }
        return false; // si no: error
      }
    }

    if(!isNaN(pantallaLista[i]) || pantallaLista[i]=="."){//si el caracter es un numero o punto...
      if(i>0){
        if (pantallaLista[i] == "." && pantallaLista[i-1] == ".") {//si tenemos 2 puntos seguidos: error
          return false;
        }
      }

      //meter numero o punto en memoria temporal
      numarray.push(pantallaLista[i]);
    }
    else{//si el caracter es un simbolo...
      if(i>0){
        if (isNaN(pantallaLista[i-1]) && pantallaLista[i] != "-") {//si tenemos un simbolo (no -) no precedido por numero: error
          return false;
        }
        else if (pantallaLista[i] == "-" && pantallaLista[i-1] != "-"  && isNaN(pantallaLista[i-1]) && !isNaN(pantallaLista[i-2]) && i>1) { //tenemos un - precedido por un simbolo precedido por numero: correcto
          memoria.push(pantallaLista[i]);//mete solo el - en memoria
          continue;
        }
        else if (pantallaLista[i] == "-" && pantallaLista[i-1] == "-"){
          return false;
        }
      }

      //guardar el numero numarray en memoria como float
      memoria.push(parseFloat((numarray.toString()).replace(/,/g, "")));
      numarray = [];

      //meter simbolo en memoria
      memoria.push(pantallaLista[i]);
    }
  }
  //log de datos de la memoria.
  for (var i = 0; i < memoria.length; i++) {
  console.log("dato "+ i +": " + memoria[i]);
  }
  return true;
}
