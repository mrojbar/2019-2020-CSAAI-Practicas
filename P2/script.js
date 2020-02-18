//-- Leer el párrafo identificado como test
const test = document.getElementById('test')
const test = document.getElementById('test2')
//-- Mostrar en la consola el contenido del párrafo
//-- (es la propiedad innerHTML)

console.log("Párrafo test leido. Dice:")

console.log(test.innerHTML)

test.onclick = () => {
  console.log("Click sobre el párrafo...")
}
