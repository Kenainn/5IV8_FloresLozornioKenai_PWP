function validar(formulario) {
    formulario.nombre.value = formulario.nombre.value.trim();
    formulario.correo.value = formulario.correo.value.trim();
    formulario.edad.value = formulario.edad.value.trim();

    var nombre = formulario.nombre.value;
    if (nombre.length < 4 || nombre.length > 20) {
        alert("El nombre debe tener entre 4 y 20 caracteres");
        formulario.nombre.focus();
        return false;
    }
    if (!/^[a-zA-ZñÑ\s]+$/.test(nombre)) {
        alert("Escribe únicamente letras en el campo nombre");
        formulario.nombre.focus();
        return false;
    }

    var edad = parseInt(formulario.edad.value, 10);
    if (isNaN(edad) || edad <= 0 || edad > 120) {
        alert("Ingresa una edad válida (entre 1 y 120 años)");
        formulario.edad.focus();
        return false;
    }

    var email = formulario.correo.value;
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Correo electrónico inválido");
        formulario.correo.focus();
        return false;
    }

    var dominiosProhibidos = ["spam.com", "test.com"];
    for (var i = 0; i < dominiosProhibidos.length; i++) {
        if (email.endsWith("@" + dominiosProhibidos[i])) {
            alert("Correo con dominio no permitido");
            formulario.correo.focus();
            return false;
        }
    }

    alert("¡Registro exitoso!");
    formulario.reset(); 
    return false; 
}
