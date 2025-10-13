function validarn(e){
    var teclado = (document.all)? e.keyCode : e.which;
    if (teclado == 8) return true;
    var patron = /[0-9.]/;
    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}


function interes(){
    var valor = parseFloat(document.getElementById("cantidadi").value);
    var meses = parseInt(document.getElementById("mesesi").value);

    if(isNaN(valor) || valor<=0 || isNaN(meses) || meses<=0 || meses>18){
        alert("Verifica los datos: cantidad válida y meses entre 1 y 18.");
        return;
    }

    var tasaMensual = 0.0805 / 12;
    var interes = valor * tasaMensual * meses;
    var total = valor + interes;
    document.getElementById("saldoi").value = "$ " + total.toFixed(2);
}
function borrari(){
    document.getElementById("cantidadi").value = "";
    document.getElementById("mesesi").value = "";
    document.getElementById("saldoi").value = "";
}


function ej2_comisiones(){
    var base = parseFloat(document.getElementById("sueldo_base").value);
    var v1 = parseFloat(document.getElementById("venta1").value);
    var v2 = parseFloat(document.getElementById("venta2").value);
    var v3 = parseFloat(document.getElementById("venta3").value);

    if(isNaN(base)||isNaN(v1)||isNaN(v2)||isNaN(v3)){
        alert("Completa todos los campos numéricos.");
        return;
    }

    var comision = (v1+v2+v3) * 0.10;
    var total = base + comision;
    document.getElementById("comision_total").value = "$ " + comision.toFixed(2);
    document.getElementById("sueldo_total").value = "$ " + total.toFixed(2);
}


function ej3_descuento(){
    var compra = parseFloat(document.getElementById("compra_total").value);
    if(isNaN(compra) || compra<=0){
        alert("Introduce un monto válido.");
        return;
    }
    var descuento = compra * 0.15;
    var total = compra - descuento;
    document.getElementById("pago_final").value = "$ " + total.toFixed(2);
}


function ej4_calificacion(){
    var c1 = parseFloat(document.getElementById("calif1").value);
    var c2 = parseFloat(document.getElementById("calif2").value);
    var c3 = parseFloat(document.getElementById("calif3").value);
    var ex = parseFloat(document.getElementById("examen").value);
    var tr = parseFloat(document.getElementById("trabajo").value);

    if([c1,c2,c3,ex,tr].some(isNaN)){
        alert("Introduce todas las calificaciones.");
        return;
    }

    var promedio = (c1+c2+c3)/3;
    var final = promedio*0.55 + ex*0.30 + tr*0.15;
    document.getElementById("calif_final").value = final.toFixed(2);
}


function ej5_porcentajes(){
    var h = parseInt(document.getElementById("hombres").value);
    var m = parseInt(document.getElementById("mujeres").value);
    if(isNaN(h)||isNaN(m)|| (h+m)==0){
        alert("Introduce números válidos.");
        return;
    }
    var total = h+m;
    var ph = (h/total)*100;
    var pm = (m/total)*100;
    document.getElementById("ph").value = ph.toFixed(1)+"%";
    document.getElementById("pm").value = pm.toFixed(1)+"%";
}


function ej6_edad(){
    var nac = parseInt(document.getElementById("anio_nac").value);
    var actual = parseInt(document.getElementById("anio_act").value);
    if(isNaN(nac)||isNaN(actual)|| actual<nac){
        alert("Verifica los años ingresados.");
        return;
    }
    var edad = actual - nac;
    document.getElementById("edad").value = edad + " años";
}
