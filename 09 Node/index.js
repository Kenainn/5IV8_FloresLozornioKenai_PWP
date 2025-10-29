var http = require('http');

// vamos a crear nuestro propio servidor
var servidor = http.createServer(function (req, res) {
    // req -> request es una solicitud que viene por parte del cliente
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'}); // 200 es un código de éxito
    res.write('<h1>Hola Mundo desde Node.js</h1>');
    res.write('<h1>A mimir</h1>');
    res.write('<h1>A mimir x2</h1>');

    console.log('Hola, sí entró al servidor');
    res.end();
});

// es necesario tener un puerto de comunicación para el servidor
servidor.listen(3000);
console.log('Servidor corriendo en http://localhost:3000');
