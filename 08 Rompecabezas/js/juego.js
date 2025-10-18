var instrucciones = [
    "Utiliza las flechas de navegacion para mover las piezas,",
    "Para ordenar las piezas guiate por la imagen Objetivo"
];

//vamos a guardar dentro de una variable los movimiento del rompecabezas
var movimientos = [];

//vamos a crear una matriz para saber las posiciones del rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//vamos a tener que crear una matriz donde tengamos las posiciones correctas
var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//primero necesito saber las coordenadas de la pieza vacia
var filaVacia = 2;
var columnaVacia = 2;

//necesitamos una funcion que se encarge de mostrar las instrucciones
function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones")
    ;}
}

//esta funcion se encarga de crear el componente li y agregar la lista de dichas funciones
function mostrarInstruccionesLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

function iniciar() {
    //mezclar las piezas
    //capturar el ultimo movimiento
}

//mandamos a llamar la funcion
mostrarInstrucciones(instrucciones);

//vamos a crear una funcion para saner si gano
function checarSiGano() {
    for (var i = 0; i < rompe.length; i++) {
        for (var j = 0; j < rompe[i].length; j++){
            var rompeactual = rompe[i][j];
            if(rompeactual !== rompeCorrecta[i][j]){
                return false;
            }
        }
    }
    return true;
}

//mostrar en html si se gano
function mostrarCartelGanador() {
    if(checarSiGano()){
        alert("Felicidades, ganaste el juego");
    }
    return false;
}
/*
Necesitamos una funcion que se encargue de intercambiar las pieza vacia vs cualquiera, para esto tenemos que hacer el uso :
arreglo[][] = poscicion[][]
//intercambiar
poscision[][] = arreglo[][]
*/
function intercambiarPosicionesRompe(filaPos1,columnaPos1,filaPos2,columnaPos2){
    var pos1 = rompe[filaPos1,columnaPos1]
    var pos2 = rompe[filaPos2,columnaPos2]

    //intercambio
    rompe[filaPos1,columnaPos1] = pos2;
    rompe[filaPos2,columnaPos2] = pos1;
}