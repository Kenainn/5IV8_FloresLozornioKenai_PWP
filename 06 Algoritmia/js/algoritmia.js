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
