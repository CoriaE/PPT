//aqui declaro todas las variables//
let puntosUsuario = 0;
let puntosPC = 0;
let puntosOleadas = 0;
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario");
let contenedorPuntosPC = document.querySelector("#puntos-computadora");
let contenedorPuntosOleadas = document.querySelector("#marcador_oleadas");
let eleccion_usuario = document.querySelector("#eleccion-usuario");
let eleccion_PC = document.querySelector("#eleccion-PC");
var Pantalla_perder = document.getElementById("pantalla_perder");
var cartas = document.getElementById("armas");
var carta = document.querySelector("arma");
var elem = document.getElementById("Prota");
var enem = document.getElementById("enemigo");
var elem_C = document.getElementById("Prota");
var enem_C = document.getElementById("enemigo");
let botonesArmas = document.querySelectorAll(".arma");
const button = document.getElementById('armas');
const buttonP = document.getElementById('boton_perder');
const buttonC = document.getElementById('Boton_configuraciones');
let daltonismo = 1;
const buttonD = document.getElementById('boton_daltonismo');
const buttonSC = document.getElementById('boton_salir_configuraciones');
let contenedorGanaPunto = document.querySelector("#gana-punto");
const buttonM = document.getElementById('boton_reproductor');
var audio = document.getElementById("M_Fondo");
let volumen = 1;

window.addEventListener('load', function() {
    carta_apertura.style.animation = "Sta 2s forwards";
});

botonesArmas.forEach(boton => { 
    boton.addEventListener("click", iniciarTurno);
});
function iniciarTurno(e) { 
    let eleccionPC = Math.floor(Math.random() * 3);
    let eleccionUsuario = e.currentTarget.id;

    if (eleccionPC === 0) {
        eleccionPC = "piedra🪨";
    } else if (eleccionPC === 1) {
        eleccionPC = "papel📋"
    } else if (eleccionPC === 2) {
        eleccionPC = "tijera✂"
    }
    if (
        (eleccionUsuario === "piedra🪨" && eleccionPC === "tijera✂") ||
        (eleccionUsuario === "tijera✂" && eleccionPC === "papel📋") ||
        (eleccionUsuario === "papel📋" && eleccionPC === "piedra🪨")
    ) {
        setTimeout(ganaUsuario, 1000);
    } else if (
        (eleccionPC === "piedra🪨" && eleccionUsuario === "tijera✂") ||
        (eleccionPC === "tijera✂" && eleccionUsuario === "papel📋") ||
        (eleccionPC === "papel📋" && eleccionUsuario === "piedra🪨")
    ) {
        setTimeout(ganaPC, 1000);
    } else {
        setTimeout(empate, 1000);
    }
}
function Terminar_turno(){
    elem.style.animation = "idle 1.3s steps(2, start) infinite";
    enem.style.animation = "idle 1.3s steps(2, start) infinite";
}
function siguiente_nivel() {
    carta_apertura.style.animation = "En 2.5s linear forwards";
    cosas.style.animation = "Pro_win 1s linear";
    capa_personajes.style.animation = "Pro_win 1.5s linear";
    setTimeout(() => {
        if (puntosOleadas === 5) { // en caso de superar las 5 oleadas, se redirige a la pantalla de creditos //
            window.location. href="file:///C:/Users/coria/OneDrive/Escritorio/RPS/creditos.html";
        }
        puntosUsuario = 0;
        puntosPC = 0;
        contenedorPuntosUsuario.innerText = puntosUsuario;
        contenedorPuntosPC.innerText = puntosPC;
        elem.style.animation = "idle 1.3s steps(2, start) infinite";
        enem.style.animation = "idle 1.3s steps(2, start) infinite";
        mensaje.style.visibility = "hidden";
        contenedorGanaPunto.innerText = ".";
      }, 1500);
    setTimeout(() => {
        cosas.style.animation = "none";
        carta_apertura.style.animation = "none";
        capa_personajes.style.animation = "none";
        carta_apertura.style.visibility = "hidden";
    }, 2600);
}
//al actuar con el button, se aplicaran las animaciones de espera//
button.addEventListener('click', () => {
  button.classList.add('animate');
  setTimeout(() => {
    button.classList.remove('animate');
  }, 2500);
    elem.style.animation = "waiting 1.3s steps(2, start) infinite";
    enem.style.animation = "waiting 1.3s steps(2, start) infinite";
});

//al actuar con el buttonP, se reiniciara la pantalla//
buttonP.addEventListener('click', () => {
    location. reload();
});

//al actuar con el buttonC, la pantalla de confiruaciones se hara visible//
buttonC.addEventListener('click', () => {
    pantalla_configuraciones.style.visibility = "visible";
});

//al actuar con el buttonSC, la pantalla de confiruaciones se ocultara//
buttonSC.addEventListener('click', () => {
    pantalla_configuraciones.style.visibility = "hidden";
});

//al actuar con el buttonD, se sumara un digito a la variable "daltonismo", en caso de que el valor sea par se aplicada un filto de escala de grises, y en caso contrario el filtro se apagara//
buttonD.addEventListener('click', () => {
    daltonismo ++;
    if (daltonismo % 2 == 0){
        pantalla.style.filter = "grayscale(1)";
    }
    else{
        pantalla.style.filter = "grayscale(0)";
    }
});

buttonM.addEventListener('click', () => {
    volumen ++;
    if (volumen % 2 == 0){
        audio.play();
    }
    else{
        audio.pause();
    }
});
   
function ganaUsuario() { //al ganar el usuario, se suma un punto en "puntosUsuario", y se reproducen las respectivas animaciones//
    puntosUsuario++;
    contenedorPuntosUsuario.innerText = puntosUsuario;
        elem.style.animation = "win 1.3s steps(2, start) infinite";
        enem.style.animation = "lose 1.3s steps(2, start) infinite";
    if (puntosUsuario === 5) { //y en caso de que los puntos del usuario lleguen al limite indicado, ganara el usuario, y se mostraran las respectivas animaciones//
        contenedorGanaPunto.innerText = "¡Ganaste la ronda :) !";
        puntosOleadas++;
        contenedorPuntosOleadas.innerText = puntosOleadas;
        enem.style.animation = "enelose 3s ease-out";
        setTimeout(siguiente_nivel, 1000); //luego del delay indicado por el setTimeout, se llamara a la funcion "siguiente_nivel"//
    }
    else{ //y en caso de que esto no sea asi, simplemente seguira la oleada//
        contenedorGanaPunto.innerText = "¡Ganaste un punto! 🔥";
        setTimeout(Terminar_turno, 1500);
    }
}

function ganaPC() { //al ganar la pc, se suma un punto en "puntoPc", y se reproducen las respectivas animaciones//
    puntosPC++;
    contenedorPuntosPC.innerText = puntosPC;
        elem.style.animation = "lose 1.3s steps(2, start) infinite";
        enem.style.animation = "win 1.3s steps(2, start) infinite";
    if (puntosPC === 5) { //y en caso de que los puntos de la pc lleguen al limite indicado, ganara la pc, y se mostraran las respectivas animaciones//
        contenedorGanaPunto.innerText = "¡Perdiste la partida :( !";
        elem.style.animation = "prolose 1s ease-out forwards";
        cartas.style.animation = "example 1s ease-out forwards";
        setTimeout(() => { //luego del delay indicado por el setTimeout, la pantalla de derrota se hara visible//
            Pantalla_perder.style.visibility = "visible";
          }, 1500);
    }
    else{ //y en caso de que esto no sea asi, simplemente seguira la oleada//
        contenedorGanaPunto.innerText = "¡La computadora ganó un punto! 😭";
        setTimeout(Terminar_turno, 1500);
    }
}

function empate() {
    elem.style.animation = "emp 1s steps(2, start) infinite";
    enem.style.animation = "emp 1s steps(2, start) infinite";
    contenedorGanaPunto.innerText = "¡Empate! 😱";
    setTimeout(Terminar_turno, 1500);
}