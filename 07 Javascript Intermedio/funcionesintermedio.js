
/*
JS Maneja variables del siguiente modo
var -> una variable de acceso local y global dependiendo de donde se declare
let -> es una variable "protegida" solo se puede hacer uso dentro de la funcion o bloque donde se declara
const -> es una variable que no puede cambiar su valor, es decir es una constante


let x = "hola";
let x = "habia una vez";

console.log(x);

como usamos las funciones


function suma(n1,n2){
    return n1 + n2;
}
console.log(`Esta suma es de: ${suma(5,3)}`);

Las funciones flecha nos ayudan a poder realizar operaciones de una forma mucho mas sencilla de acuerdo a la siguieente estructrua

//"cadena" -> id,clase,metodo,nombre,atributo
const suma = (n1,n2) => n1 + n2;
console.log(`Esta suma es de: ${suma(5,3)}`);


const razasdePerros = [
    "pastor aleman",
    "labrador",
    "bulldog",
    "beagle",
    "poodle",
    "rottweiler",
    "chihuahua",
    "boxer",
]
//formas de recorrer e imprimir un arreglo
//for clasico
for(let i=0; i<razasdePerros.length; i++){
    console.log(razasdePerros[i]);
}


//for of
for(const raza of razasdePerros){
    console.log(raza);
}

//for in
for(const indice in razasdePerros){
    console.log(razasdePerros[indice]);
}

//forEach Itera sobre los elementos del arreglo y no devuelve nada
//todos los foreach son funciones flecha por defecto
razasdePerros.forEach((raza) => console.log(raza));
//la estructura general del foreach es
//argumento.foreach((raza,indice,arregloOriginal) => {codigo a ejecutar})
razasdePerros.forEach((raza,indice,arregloOriginal) => {
    console.log(`El indice es: ${indice} y la raza es: ${raza}`);
    console.log(arregloOriginal);
});
*/
//funcion mapa -> iterar sobre los elemtnos del arreglo y devuelve un nuevo arreglo con el cual podemos jugar

const razasdePerrosMayusculas = razasdePerros.map((raza) => raza.toUpperCase());
console.log(razasdePerrosMayusculas);

//find -> nos permite realizar una busqueda de un elemento dentro del arreglo , si lo encuentrea lo devuelve y si no lo encuentra devuelve undefined
const perroBuscado = razasdePerros.find((raza) => raza === "beagle");
console.log(perroBuscado);
//find index -> nos permite realizar una busqueda de un elemento dentro del arreglo , si lo encuentra devuelve el indice y si no lo encuentra devuelve -1, esta funcion es particularmente util cuando necesitamos modificar o eliminar de un arreglo original dentro de una copia del mismo
const indiceChihuahua = razasdePerros.findIndex((raza) => raza === "chihuahua");
console.log(indiceChihuahua);
if(indiceChihuahua > -1){
    razasdePerros[indiceChihuahua] = "chihuahua modificado";
    console.log(razasdePerros[indiceChihuahua]);

    //agregar texto 
    razasdePerros([indiceChihuahua] += "chillones y pequeños";
    console.log(razasdePerros[indiceChihuahua]);
    console.log(razasdePerros);
}


