var instrucciones = [
    "Utiliza las flechas de navegación para mover las piezas",
    "Para ordenar las piezas guíate por la imagen objetivo"
];

// Guardar movimientos
var movimientos = [];

// Matriz del rompecabezas
var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Posiciones correctas
var rompeCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

// Coordenadas de la pieza vacía
var filaVacia = 2;
var columnaVacia = 2;

// Mostrar instrucciones
function mostrarInstrucciones(instrucciones){
    for(var i = 0; i < instrucciones.length; i++){
        mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }
}

function mostrarInstruccionesLista(instruccion, idLista){
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

// Verificar si ganó
function checarSiGano(){
    for(var i = 0; i < rompe.length; i++){  
        for(var j = 0; j < rompe[i].length; j++){
            if(rompe[i][j] !== rompeCorrecta[i][j]){
                return false;
            }
        }
    }
    return true;
}

// Mostrar alerta de ganador
function mostrarCartelGanador(){
    alert("¡Felicidades, ganaste el juego!");
}

// Intercambiar posiciones en la matriz
function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2){
    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columnaPos2];
    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columnaPos2] = pos1;
}

// Actualizar posición vacía
function actualizarPosicionVacia(nuevaFila, nuevaColumna){
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

// Validar posición
function posicionValida(fila, columna){
    return fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2;
}

// Códigos de dirección
var codigosDireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
};

// Mover en dirección
function moverEnDireccion(direccion){
    var nuevaFila = filaVacia;
    var nuevaColumna = columnaVacia;

    if(direccion === codigosDireccion.ABAJO) nuevaFila++;
    else if(direccion === codigosDireccion.ARRIBA) nuevaFila--;
    else if(direccion === codigosDireccion.DERECHA) nuevaColumna++;
    else if(direccion === codigosDireccion.IZQUIERDA) nuevaColumna--;

    if(posicionValida(nuevaFila, nuevaColumna)){
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFila, nuevaColumna);
        actualizarPosicionVacia(nuevaFila, nuevaColumna);
        actualizarUltimoMovimiento(direccion);

        if(checarSiGano()){
            setTimeout(mostrarCartelGanador, 500);
        }
    }
}

// Intercambiar posiciones en matriz y DOM
function intercambiarPosiciones(fila1, col1, fila2, col2){
    var pieza1 = rompe[fila1][col1];
    var pieza2 = rompe[fila2][col2];

    intercambiarPosicionesRompe(fila1, col1, fila2, col2);
    intercambiarPoscionesDOM('pieza'+pieza1, 'pieza'+pieza2);
}

// Intercambiar posiciones en el DOM
function intercambiarPoscionesDOM(idPieza1, idPieza2){
    var pieza1 = document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);

    var padre = pieza1.parentNode;

    var clon1 = pieza1.cloneNode(true);
    var clon2 = pieza2.cloneNode(true);

    padre.replaceChild(clon1, pieza2);
    padre.replaceChild(clon2, pieza1);
}

// Actualizar último movimiento en DOM
function actualizarUltimoMovimiento(direccion){
    var ultimoMovimiento = document.getElementById("flecha");
    switch(direccion){
        case codigosDireccion.ARRIBA: ultimoMovimiento.textContent = "↑"; break;
        case codigosDireccion.ABAJO: ultimoMovimiento.textContent = "↓"; break;
        case codigosDireccion.DERECHA: ultimoMovimiento.textContent = "→"; break;
        case codigosDireccion.IZQUIERDA: ultimoMovimiento.textContent = "←"; break;
    }
}

// Mezclar piezas
function mezclarPiezas(veces){
    if(veces <= 0) return;

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];
    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];

    moverEnDireccion(direccion);

    setTimeout(function(){
        mezclarPiezas(veces - 1);
    }, 100);
}

// Capturar teclas
function capturarTeclas(){
    document.body.onkeydown = function(event){
        var key = event.which;
        if(key === codigosDireccion.ARRIBA || key === codigosDireccion.ABAJO || key === codigosDireccion.DERECHA || key === codigosDireccion.IZQUIERDA){
            moverEnDireccion(key);
            event.preventDefault();
        }
    };
}

// Iniciar juego
function iniciar(){
    mostrarInstrucciones(instrucciones);
    mezclarPiezas(30);
    capturarTeclas();
}

iniciar();
