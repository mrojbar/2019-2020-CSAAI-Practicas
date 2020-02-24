const pantalla = document.getElementById('pantalla')
const pantallaSol = document.getElementById('pantallaSol')
const botonSuma = document.getElementById('botonSuma')
const botonResta = document.getElementById('botonResta')
const botonMult = document.getElementById('botonMult')
const botonDiv = document.getElementById('botonDiv')
const botonIgual = document.getElementById('botonIgual')
const botonClear = document.getElementById('botonClear')
const botonParent1 = document.getElementById('botonParent1')
const botonParent2 = document.getElementById('botonParent2')
const boton0 = document.getElementById('boton0')
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
const botonAns = document.getElementById('botonAns')
const botonExp = document.getElementById('botonExp')

const ERROR = "ERROR DE SINTAXIS"

//-----TECLAS
botonBorrar.onclick = function () {borraUltValor()};
botonClear.onclick = function () {resetTotal()};
botonAns.onclick = function () {escribeAns()};
botonIgual.onclick = function () {calcularSol()};
botonSuma.onclick = function () {escribeBoton("+")};
botonResta.onclick = function () {escribeBoton("-")};
botonMult.onclick = function () {escribeBoton("*")};
botonDiv.onclick = function () {escribeBoton("/")};
botonPunto.onclick = function () {escribeBoton(".")};
botonParent1.onclick = function () {escribeBoton("(")};
botonParent2.onclick = function () {escribeBoton(")")};
botonExp.onclick = function () {escribeBoton("e+")};

boton0.onclick = function () {escribeBoton(0)};
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
operacion = ""; //cadena que contiene la operacion
resultado = 0; //ultimo resultado

// funcion clear/reset
function resetTotal(){
  pantallaLista = [];
  resetValor(0);
  operacion = "";
  resultado = 0;

  pantalla.innerHTML = 0;
  pantallaSol.innerHTML = "_"
}

//error de sintaxis
function parseError(){
  resetValor(0);
  pantalla.innerHTML = ERROR;
}

//-----FUNCIONES ARRAY PANTALLA

//coloca el ultimo resultado en la entrada.
function escribeAns(){
  if(isNaN(resultado) || resultado == Infinity || operacion == ""){//ans no validas
    return;
  }
  arrayResultado = resultado.toString(10).split('');
    if((arrayResultado.length + pantallaLista.length) > 30){//si la pantalla se llena
      return;
    }
    else if (pantallaLista.length == 1 && pantallaLista[0]==0){//sustituir la pantalla a 0 por vacia
      pantallaLista.shift();
    }
  pantallaLista = pantallaLista.concat(arrayResultado);//concatenar pantalla con ans
  actualizaPantalla();
}

//conversion del array y escritura en html
function actualizaPantalla(){
  pantalla.innerHTML = (pantallaLista.toString()).replace(/,/g, "");
}

//escritura pantalla de resultados
function actualizaUltPantalla(){
  pantallaSol.innerHTML = operacion + " = " + resultado;
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

//funcion de output de la calculadora
function calcularSol (){
  if (operacion != "" && isNaN(pantallaLista[0]) && !isNaN(resultado) && resultado != Infinity) {//si hay una solucion anterior y tenemos simbolo nuevo: añadir
    pantallaLista.unshift(resultado);
    }
  operacion = pantallaLista.toString().replace(/,/g, "");

  try {
    resultado = Number((eval(operacion)).toFixed(9))
    }
  catch (evalError){
    console.log(evalError);
    parseError();
    return;
    }

  console.log(resultado);//log en consola
  resetValor(0);
  actualizaUltPantalla();
  operacion = resultado;
}
