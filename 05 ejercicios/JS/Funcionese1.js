//validar el numero(de un evento(e))
function validarn(e){
    var teclado = (document.all)? e.keyCode : e.which
    if (teclado == 8) return true
    var patron = /[0-9\d .]/;
    
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

//Funcion para calcular el interes

function interes(){
    var valor = document.getElementById("cantidadi").value;
    
    var parseo = parseFloat(valor);
    alert (parseo);

    var interes = parseo*(0.085); //LIMITE A 2 DECIMALES

    alert (interes);

    var total = interes + parseo;
    alert (total);

    document.getElementById("saldoi").value = "$ " + total;  //LIMITE A 2 DECIMALES
}

function borrari(){
    
    document.getElementById("saldoi").value = "";
    
    document.getElementById("cantidadi").value = "";    
}


//De el ejercicio tenemos que agregar el campo numero de meses y sera una inversion de maximo 18 meses


/*
Ejercicio 2

Se debe de ingresar 3 ventas, un sueldo base y despues calcular el monto total debde de aparecer cuanto cobra por comision y la suma total
*/

/*
Ejercicio 3
Se debe de ingresar un producto con su precio y aplicarle el 15% y el sistema debe de mostar el producto el precio el descuento y el total a pagar 
*/

/*
Ejercicio 4
Se debe de ingresar calif1 , calif2 ,calif3 , se aplica el promedio y el porcentaje , se ingresa trabajo final y se aplica un porcentaje y un examen final y se aplica un porcentaje, se debe de mostrar el total de calificacion 
*/

/*
Ejercicio 5
Se debe de ingresar cantidad de hombres y mujeres y mostrar sus % correspondientes
*/


/*
Ejercicio 6 
Calcular la edad de una persona
*/