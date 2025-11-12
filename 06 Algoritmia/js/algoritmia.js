// Problema 1
function problema1(){
    let input = document.getElementById("p1-input").value.trim();
    if(input === ""){
        document.getElementById("p1-output").textContent = "No hay palabras para invertir";
        return;
    }
    let palabras = input.split(" ");
    palabras.reverse();
    document.getElementById("p1-output").textContent = palabras.join(" ");
}

// Problema 2
function problema2(){
    // Corrección 1: Usar los IDs correctos del HTML (p2-x1, etc.)
    // Corrección 2: Convertir los valores a número (parseFloat o Number) antes de usarlos
    var p2_x1 = parseFloat(document.querySelector("#p2-x1").value) || 0;
    var p2_x2 = parseFloat(document.querySelector("#p2-x2").value) || 0;
    var p2_x3 = parseFloat(document.querySelector("#p2-x3").value) || 0;
    var p2_x4 = parseFloat(document.querySelector("#p2-x4").value) || 0;
    var p2_x5 = parseFloat(document.querySelector("#p2-x5").value) || 0;

    var p2_y1 = parseFloat(document.querySelector("#p2-y1").value) || 0;
    var p2_y2 = parseFloat(document.querySelector("#p2-y2").value) || 0;
    var p2_y3 = parseFloat(document.querySelector("#p2-y3").value) || 0;
    var p2_y4 = parseFloat(document.querySelector("#p2-y4").value) || 0;
    var p2_y5 = parseFloat(document.querySelector("#p2-y5").value) || 0;

    // Creamos los vectores
    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v2 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    // Para obtener el mínimo producto escalar, se debe multiplicar el vector
    // ordenado de forma DESCENDENTE por el vector ordenado de forma ASCENDENTE.

    // Ordenar v1 descendente
    v1 = v1.sort(function(a, b){ return b - a; });
    
    // Ordenar v2 ascendente
    v2 = v2.sort(function(a, b){ return a - b; });

    var p2_producto = 0;
    for (var i = 0; i < v1.length; i++){
        p2_producto += v1[i] * v2[i];
    }

    document.querySelector("#p2-output").innerHTML = "El producto escalar minimo es: " + p2_producto;
}

// Problema 3
function problema3(){
    let input = document.getElementById("p3-input").value.trim();
    if(input === ""){
        document.getElementById("p3-output").textContent = "No hay palabras";
        return;
    }
    // La coma puede ir seguida o precedida de espacios, lo manejo para robustez
    let palabras = input.split(",").map(p => p.trim()).filter(p => p.length > 0);
    let maxUnicos = -1;
    let palabraMax = "";
    
    // Iteramos sobre las palabras válidas
    for(let palabra of palabras){
        // Mantenemos la lógica de mayúsculas y filtrado de A-Z
        let chars = new Set(palabra.toUpperCase().match(/[A-Z]/g) || []);
        
        if(chars.size > maxUnicos){
            maxUnicos = chars.size;
            palabraMax = palabra;
        } else if (chars.size === maxUnicos) {
            // Si hay un empate, prioriza la primera palabra o puedes dejar la original
            // Dejaré la que encontró primero el máximo
        }
    }
    
    if (palabraMax === "") {
        document.getElementById("p3-output").textContent = "No se encontraron palabras válidas (solo letras A-Z).";
    } else {
        document.getElementById("p3-output").textContent = "Palabra con más caracteres únicos (" + maxUnicos + "): " + palabraMax;
    }
}

// Conectar botones
// Se agregó un ID para el botón de Problema 2 y se corrigieron los IDs de los botones del HTML
document.getElementById("p1-btn").onclick = problema1;
document.getElementById("p2-btn").onclick = problema2; // ¡Agregado!
document.getElementById("p3-btn").onclick = problema3;