const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const ejs = require('ejs');


require('dotenv').config({path: './.env'});

// === INICIO DEPURACIÓN ===
console.log('Ruta de .env cargada:', './.env');
console.log('Valor de BD_USER:', process.env.BD_USER);
console.log('Valor de BD_PASSWORD:', process.env.BD_PASSWORD);
// === FIN DEPURACIÓN ===

const app = express();
const port = 3000;

// configuración de mysql
const bd = mysql.createConnection({
    host: process.env.BD_HOST,
    user: process.env.BD_USER,
    password: process.env.BD_PASSWORD,
    database: process.env.BD_NAME
});

// conectar a la base de datos
bd.connect((err) => {
    if (err) {
        console.error('Error de conexión: ' + err);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// vistas
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// carpeta pública
app.use(express.static(__dirname));

// ruta principal: mostrar estudiantes
app.get('/', (req, res) => {
    const query = 'SELECT * FROM estudiantes';

    bd.query(query, (err, results) => {
        if (err) {
            console.error("Error al obtener los estudiantes: " + err);
            res.status(500).send('Error al obtener los estudiantes');
            return;
        }

        res.render('index', { estudiantes: results });
    });
});

// crear estudiante
app.post('/estudiantes', (req, res) => {
    const { nombre, edad, curso } = req.body;

    const query = `
        INSERT INTO estudiantes (nombre, edad, curso)
        VALUES ('${nombre}', ${edad}, '${curso}')
    `;

    bd.query(query, (err, result) => {
        if (err) {
            console.error('Error al insertar el estudiante: ' + err);
            res.status(500).send('Error al insertar el estudiante');
            return;
        }
        res.redirect('/');
    });
});

//ruta para eliminar estudiante
app.get('/estudiantes/delete/:id', (req, res) => {
    const estudianteId = req.params.id;
    const query = `DELETE FROM estudiantes WHERE id = ${estudianteId}`;
    bd.query(query, (err, result) => {
        if (err) {
            console.error('Error al eliminar el estudiante: ' + err);
            res.status(500).send('Error al eliminar el estudiante');
            return;
        }
        res.redirect('/');
    }
    );
});

//ruta para buscar y actualizar estudiante
app.get('/estudiantes/edit/:id', (req, res) => {
    const estudianteId = req.params.id;
    const query = `SELECT * FROM estudiantes WHERE id = ${estudianteId}`;
    bd.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener el estudiante: ' + err);
            res.status(500).send('Error al obtener el estudiante');
            return;
        }
        res.render('edit', { estudiante: results[0] });
    });
});

app.post('/estudiantes/update/:id', (req, res) => {
    const estudianteId = req.params.id;
    const { nombre, edad, curso } = req.body;
    const query = `
        UPDATE estudiantes
        SET nombre = '${nombre}', edad = ${edad}, curso = '${curso}'
        WHERE id = ${estudianteId}`;

    bd.query(query, (err, result) => {
        if (err) {
            console.error('Error al actualizar el estudiante: ' + err);
            res.status(500).send('Error al actualizar el estudiante');
            return;
        }
        res.redirect('/');
    });
});

// servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
