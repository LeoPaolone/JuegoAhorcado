var  palabras = ["JAVA","REACT","RUBY","PYTHON","SQL","HTML","JSON","VIRUS","CSS","NODE"];

let respuesta = '';
let intentos = 10;
let errores = 0;
let correctas = [];
let palabrasEstado = null;


function palabraAleatoria(){
  respuesta = palabras[Math.floor(Math.random()*palabras.length)];
}

function generarBotones() {
  let buttonsHTML = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map(
      (letter) =>
        `
      <button
        class="btn btn-outline-primary"
        id='` +
        letter +
        `'
        onClick="handleGuess('` +
        letter +
        `')"
      >
        ` +
        letter +
        `
      </button>
    `
    )
    .join("");

  document.getElementById("teclado").innerHTML = buttonsHTML;
}

function handleGuess(chosenLetter){
  correctas.indexOf(chosenLetter) === -1 ? correctas.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled',true);

  if(respuesta.indexOf(chosenLetter) >= 0){
    palabraCorrectas();
    checkIfGameWon();
  }else if (respuesta.indexOf(chosenLetter) === -1){
    errores++;
    updateErrores();
    checkIfGameLost();
    updateAhorcadoFoto();
  }

}

function updateAhorcadoFoto(){
  document.getElementById('ahorcado').src ='./Imagenes/' + errores + '.jpg';
}

function checkIfGameWon(){
     if(palabrasEstado === respuesta){
       document.getElementById('teclado').innerHTML = "Has ganado";
     }
}

function checkIfGameLost(){
   if(errores === intentos){
     document.getElementById("palabraDestacada").innerHTML = "La respuesta era:  " + respuesta;
     document.getElementById('teclado').innerHTML = "Has perdido";
   }
}

function palabraCorrectas(){
  palabrasEstado = respuesta.split('').map(letter => (correctas.indexOf(letter) >= 0 ? letter: "_")).join('');

  document.getElementById('palabraDestacada').innerHTML = palabrasEstado;

}

function updateErrores(){
  document.getElementById('errores').innerHTML = errores;
}

function reset(){
  errores = 0;
  correctas = [];
  document.getElementById('ahorcado').src = './Imagenes/0.jpg';

  palabraAleatoria();
  palabraCorrectas();
  updateErrores();
  generarBotones();
}

document.getElementById('intentos').innerHTML = intentos;

palabraAleatoria();
generarBotones();
palabraCorrectas();