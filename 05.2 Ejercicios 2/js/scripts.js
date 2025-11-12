function ejercicio1() {
  let n1 = parseFloat(document.getElementById("num1").value);
  let n2 = parseFloat(document.getElementById("num2").value);
  let r;

  if (isNaN(n1) || isNaN(n2)) {
    r = "⚠️ Ingresa ambos números";
  } else if (n1 === n2) {
    r = `Son iguales → multiplicación = ${n1 * n2}`;
  } else if (n1 > n2) {
    r = `El primero es mayor → resta = ${n1 - n2}`;
  } else {
    r = `El primero es menor → suma = ${n1 + n2}`;
  }

  document.getElementById("res1").innerText = r;
}

function ejercicio2() {
  let a = parseFloat(document.getElementById("a").value);
  let b = parseFloat(document.getElementById("b").value);
  let c = parseFloat(document.getElementById("c").value);
  let r;

  if (isNaN(a) || isNaN(b) || isNaN(c)) {
    r = "⚠️ Ingresa los tres números";
  } else {
    let mayor = Math.max(a, b, c);
    r = `El número mayor es: ${mayor}`;
  }

  document.getElementById("res2").innerText = r;
}

function ejercicio3() {
  let horas = parseFloat(document.getElementById("horas").value);
  let pago = parseFloat(document.getElementById("pagoHora").value);
  let total = 0;
  let extra = 0;

  if (isNaN(horas) || isNaN(pago)) {
    document.getElementById("res3").innerText = "⚠️ Ingresa las horas y el pago.";
    return;
  }

  if (horas <= 40) {
    total = horas * pago;
  } else {
    extra = horas - 40;
    if (extra <= 8) {
      total = 40 * pago + extra * pago * 2;
    } else {
      total = 40 * pago + 8 * pago * 2 + (extra - 8) * pago * 3;
    }
  }

  document.getElementById("res3").innerText = `Total a recibir: $${total.toFixed(2)}`;
}

function ejercicio4() {
  let salario = parseFloat(document.getElementById("salario").value);
  let años = parseFloat(document.getElementById("antiguedad").value);
  let porcentaje = 0;

  if (isNaN(salario) || isNaN(años)) {
    document.getElementById("res4").innerText = "⚠️ Ingresa todos los datos.";
    return;
  }

  if (años < 1) porcentaje = 0.05;
  else if (años < 2) porcentaje = 0.07;
  else if (años < 5) porcentaje = 0.10;
  else if (años < 10) porcentaje = 0.15;
  else porcentaje = 0.20;

  let utilidad = salario * porcentaje;
  document.getElementById("res4").innerText = `Utilidad anual: $${utilidad.toFixed(2)} (${porcentaje * 100}%)`;
}
