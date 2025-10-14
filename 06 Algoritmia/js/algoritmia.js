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

//Problema 2
function problema2(){
    var p2_x1 = document.querySelector("#p2_x1").value;
    var p2_x2 = document.querySelector("#p2_x2").value;
    var p2_x3 = document.querySelector("#p2_x3").value;
    var p2_x4 = document.querySelector("#p2_x4").value;
    var p2_x5 = document.querySelector("#p2_x5").value;

    var p2_y1 = document.querySelector("#p2_y1").value;
    var p2_y2 = document.querySelector("#p2_y2").value;
    var p2_y3 = document.querySelector("#p2_y3").value;
    var p2_y4 = document.querySelector("#p2_y4").value;
    var p2_y5 = document.querySelector("#p2_y5").value;

    //creamos los vectores
    var v1 = [p2_x1,p2_x2,p2_x3,p2_x4,p2_x5]
    var v2 = [p2_y1,p2_y2,p2_y3,p2_y4,p2_y5]

    v1 = v1.sort(function(a,b){return b-a})
    v2 = v2.sort(function(a,b){return b-a})

    v2 = v2.reverse();

    var p2_producto = 0;
    for (var i=0; i<v1.length; i++){
        p2_producto += v1[i] * v2[i]
        
    }

    document.querySelector("#p2_output").innerHTML = "El producto escalar minimo es: " + p2_producto;
}

// Problema 3
function problema3(){
    let input = document.getElementById("p3-input").value.trim();
    if(input === ""){
        document.getElementById("p3-output").textContent = "No hay palabras";
        return;
    }
    let palabras = input.split(",");
    let maxUnicos = 0;
    let palabraMax = "";
    for(let palabra of palabras){
        let chars = new Set(palabra.toUpperCase().match(/[A-Z]/g));
        if(chars.size > maxUnicos){
            maxUnicos = chars.size;
            palabraMax = palabra;
        }
    }
    document.getElementById("p3-output").textContent = "Palabra con más caracteres únicos: " + palabraMax;
}

// Conectar botones
document.getElementById("p1-btn").onclick = problema1;
document.getElementById("p3-btn").onclick = problema3;
