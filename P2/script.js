const teclas = {

  botonSuma : document.getElementById('botonSuma'),
  botonResta : document.getElementById('botonResta'),
  botonMult : document.getElementById('botonMult'),
  botonDiv : document.getElementById('botonDiv'),
  botonIgual : document.getElementById('botonIgual'),
  botonClear : document.getElementById('botonClear'),
  botonParent1 : document.getElementById('botonParent1'),
  botonParent2 : document.getElementById('botonParent2'),
  botonNum : document.getElementsByClassName("botonNum"), //botones numericos
  botonPunto : document.getElementById('botonPunto'),
  botonBorrar : document.getElementById('botonBorrar'),
  botonAns : document.getElementById('botonAns'),
  botonExp : document.getElementById('botonExp'),
}

const interfaz = {

  pantalla: document.getElementById('pantalla'),
  pantallaOp : document.getElementById('pantallaOp'),
  pantallaSol : document.getElementById('pantallaSol'),
  ERROR : "ERROR DE SINTAXIS", //mensaje de error
  TAMPANTALLA : 30, //tamaño de pantalla
  pantallaLista : [], //array de objetos en pantalla
  operacion : "", //cadena que contiene la operacion
  resultado : 0, //ultimo this.resultado

  //error de sintaxis
  parseError : function (){
    this.resetValor(0);
    this.pantalla.innerHTML = this.ERROR;
  },

  // funcion clear/reset
  resetTotal : function (){
    this.pantallaLista = [];
    this.resetValor(0);
    this.operacion = "";
    this.resultado = 0;

    this.pantalla.innerHTML = 0;
    this.pantallaSol.innerHTML = "&nbsp";
    this.pantallaOp.innerHTML = "&nbsp";
  },

  //reset del array a valor dado y borrado de ultimo resultado
  resetValor : function (valor){
    this.pantallaLista = [];
    this.pantallaLista.push(valor);
    this.actualizaPantalla();
  },

  //funcion de input de la calculadora
  escribeBoton : function (objeto){
    if (this.pantalla.innerHTML == 0 || this.pantalla.innerHTML == this.ERROR){
      this.resetValor(objeto);
    }
    else {
      if (this.pantallaLista.length == this.TAMPANTALLA) //memoria de 30 caracteres.
        return;
      else {
        this.meteValor(objeto);
      }
    }
  },

  //coloca el ultimo resultado en la entrada.
  escribeAns : function (){
    if(isNaN(this.resultado) || this.resultado == Infinity || this.operacion == ""){//ans no validas
      return;
    }
    arrayResultado = this.resultado.toString(10).split(''); //variable temporal
      if((arrayResultado.length + this.pantallaLista.length) > this.TAMPANTALLA){//si la pantalla se llena
        return;
      }
      else if (this.pantallaLista.length == 1 && this.pantallaLista[0]==0){//sustituir la pantalla a 0 por vacia
        this.pantallaLista.shift();
      }
    this.pantallaLista = this.pantallaLista.concat(arrayResultado);//concatenar pantalla con ans
    this.actualizaPantalla();
  },

  //conversion del array y escritura en html
  actualizaPantalla : function (){
    this.pantalla.innerHTML = (this.pantallaLista.toString()).replace(/,/g, "");
  },

  //escritura pantalla de resultados
  actualizaUltPantalla : function (){
    this.pantallaOp.innerHTML = this.operacion + " = ";
    this.pantallaSol.innerHTML = this.resultado;
  },

  //mete valor al array
  meteValor : function (valor){
    this.pantallaLista.push(valor);
    this.actualizaPantalla();
  },

  //borra el ultimo valor, si vacia se pone a 0
  borraUltValor : function (){
    this.pantallaLista.pop();
    if (this.pantallaLista.length == 0) this.pantallaLista.push(0);
    this.actualizaPantalla();
  },

  //funcion de output de la calculadora
  calcularSol : function (){
    if (this.operacion != "" && isNaN(this.pantallaLista[0]) && !isNaN(this.resultado) && this.resultado != Infinity) {//si hay una solucion anterior y tenemos simbolo nuevo: añadir
      this.pantallaLista.unshift(this.resultado);
      }
    this.operacion = this.pantallaLista.toString().replace(/,/g, "");

    try {
      this.resultado = Number((eval(this.operacion)).toFixed(9))
      }
    catch (evalError){
      console.log(evalError);
      this.parseError();
      return;
      }

    console.log(this.resultado);//log en consola
    this.resetValor(0);
    this.actualizaUltPantalla();
    this.operacion = this.resultado;
  },
}

//-----acciones de las teclas

teclas.botonBorrar.onclick = function () {interfaz.borraUltValor()};
teclas.botonClear.onclick = function () {interfaz.resetTotal()};
teclas.botonAns.onclick = function () {interfaz.escribeAns()};
teclas.botonIgual.onclick = function () {interfaz.calcularSol()};
teclas.botonSuma.onclick = function () {interfaz.escribeBoton("+")};
teclas.botonResta.onclick = function () {interfaz.escribeBoton("-")};
teclas.botonMult.onclick = function () {interfaz.escribeBoton("*")};
teclas.botonDiv.onclick = function () {interfaz.escribeBoton("/")};
teclas.botonPunto.onclick = function () {interfaz.escribeBoton(".")};
teclas.botonParent1.onclick = function () {interfaz.escribeBoton("(")};
teclas.botonParent2.onclick = function () {interfaz.escribeBoton(")")};
teclas.botonExp.onclick = function () {interfaz.escribeBoton("e")};

for (var i = 0; i < teclas.botonNum.length; i++) { //botones numericos
  teclas.botonNum[i].onclick = function (ev){
    interfaz.escribeBoton(ev.target.value);
  }
}
