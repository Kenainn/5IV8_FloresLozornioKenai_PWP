const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

const db = mysql.createConnection({
  host: process.env.BD_HOST,
  user: process.env.BD_USER,
  password: process.env.BD_PASSWORD,
  database: process.env.BD_NAME
});

db.connect(err=>{
  if(err) console.error('BD err', err);
  else console.log('BD conectada');
});

app.set('view engine','ejs');
app.set('views', __dirname + '/views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

// lista
app.get('/', (req, res)=>{
  db.query('SELECT * FROM bitacora_calibraciones ORDER BY id DESC', (err, rows)=>{
    if(err) return res.status(500).send('Error BD');
    res.render('index', { items: rows });
  });
});

// form nuevo
app.get('/nuevo', (req,res)=>{
  res.render('form', { item: null, errors: {} });
});

// crear
app.post('/crear', (req,res)=>{
  const d = req.body;

  // validación básica (backend)
  const errores = {};
  if(!d.instrumento || d.instrumento.trim().length < 2) errores.instrumento = 'Instrumento requerido';
  if(!d.fecha_calibracion_actual) errores.fecha_calibracion_actual = 'Fecha actual requerida';

  if(Object.keys(errores).length){
    return res.render('form', { item: d, errors: errores });
  }

  const q = `INSERT INTO bitacora_calibraciones
    (instrumento, ultima_calibracion, fecha_calibracion_actual, estandar_referencia, lectura_antes, lectura_despues, certificado, proxima_calibracion, descripcion)
    VALUES (?,?,?,?,?,?,?,?,?)`;

  const params = [
    d.instrumento,
    d.ultima_calibracion || null,
    d.fecha_calibracion_actual,
    d.estandar_referencia || null,
    d.lectura_antes || null,
    d.lectura_despues || null,
    d.certificado || null,
    d.proxima_calibracion || null,
    d.descripcion || null
  ];

  db.query(q, params, (err)=>{
    if(err) return res.status(500).send('Error al crear');
    res.redirect('/');
  });
});

// editar - mostrar
app.get('/editar/:id', (req,res)=>{
  db.query('SELECT * FROM bitacora_calibraciones WHERE id = ?', [req.params.id], (err, rows)=>{
    if(err) return res.status(500).send('Error BD');
    if(!rows.length) return res.status(404).send('No existe');
    res.render('form', { item: rows[0], errors: {} });
  });
});

// actualizar
app.post('/actualizar/:id', (req,res)=>{
  const d = req.body;
  const errores = {};
  if(!d.instrumento || d.instrumento.trim().length < 2) errores.instrumento = 'Instrumento requerido';
  if(!d.fecha_calibracion_actual) errores.fecha_calibracion_actual = 'Fecha actual requerida';
  if(Object.keys(errores).length) return res.render('form', { item: Object.assign(d,{id: req.params.id}), errors: errores });

  const q = `UPDATE bitacora_calibraciones SET
    instrumento=?, ultima_calibracion=?, fecha_calibracion_actual=?, estandar_referencia=?, lectura_antes=?, lectura_despues=?, certificado=?, proxima_calibracion=?, descripcion=?
    WHERE id=?`;

  const params = [
    d.instrumento,
    d.ultima_calibracion || null,
    d.fecha_calibracion_actual,
    d.estandar_referencia || null,
    d.lectura_antes || null,
    d.lectura_despues || null,
    d.certificado || null,
    d.proxima_calibracion || null,
    d.descripcion || null,
    req.params.id
  ];

  db.query(q, params, (err)=>{
    if(err) return res.status(500).send('Error al actualizar');
    res.redirect('/');
  });
});

// borrar
app.get('/borrar/:id', (req,res)=>{
  db.query('DELETE FROM bitacora_calibraciones WHERE id = ?', [req.params.id], (err)=>{
    if(err) return res.status(500).send('Error al borrar');
    res.redirect('/');
  });
});

// servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});