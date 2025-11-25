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

// Función de validación reutilizable
function validarDatos(datos) {
  const errores = {};
  
  // Validar instrumento (obligatorio, mínimo 3 caracteres, máximo 100)
  if(!datos.instrumento || datos.instrumento.trim().length === 0) {
    errores.instrumento = 'El nombre del instrumento es obligatorio';
  } else if(datos.instrumento.trim().length < 3) {
    errores.instrumento = 'El instrumento debe tener al menos 3 caracteres';
  } else if(datos.instrumento.trim().length > 100) {
    errores.instrumento = 'El instrumento no puede exceder 100 caracteres';
  }
  
  // Validar fecha de calibración actual (obligatoria)
  if(!datos.fecha_calibracion_actual || datos.fecha_calibracion_actual.trim().length === 0) {
    errores.fecha_calibracion_actual = 'La fecha de calibración actual es obligatoria';
  } else {
    // Verificar que sea una fecha válida
    const fecha = new Date(datos.fecha_calibracion_actual);
    if(isNaN(fecha.getTime())) {
      errores.fecha_calibracion_actual = 'Ingrese una fecha válida';
    }
  }
  
  // Validar última calibración (si existe)
  if(datos.ultima_calibracion && datos.ultima_calibracion.trim().length > 0) {
    const fecha = new Date(datos.ultima_calibracion);
    if(isNaN(fecha.getTime())) {
      errores.ultima_calibracion = 'Ingrese una fecha válida';
    }
    // Verificar que la última calibración sea anterior a la actual
    if(datos.fecha_calibracion_actual && !isNaN(fecha.getTime())) {
      const fechaActual = new Date(datos.fecha_calibracion_actual);
      if(fecha > fechaActual) {
        errores.ultima_calibracion = 'La última calibración debe ser anterior a la actual';
      }
    }
  }
  
  // Validar próxima calibración (si existe)
  if(datos.proxima_calibracion && datos.proxima_calibracion.trim().length > 0) {
    const fecha = new Date(datos.proxima_calibracion);
    if(isNaN(fecha.getTime())) {
      errores.proxima_calibracion = 'Ingrese una fecha válida';
    }
    // Verificar que la próxima calibración sea posterior a la actual
    if(datos.fecha_calibracion_actual && !isNaN(fecha.getTime())) {
      const fechaActual = new Date(datos.fecha_calibracion_actual);
      if(fecha < fechaActual) {
        errores.proxima_calibracion = 'La próxima calibración debe ser posterior a la actual';
      }
    }
  }
  
  // Validar estándar de referencia (si existe, mínimo 3, máximo 100)
  if(datos.estandar_referencia && datos.estandar_referencia.trim().length > 0) {
    if(datos.estandar_referencia.trim().length < 3) {
      errores.estandar_referencia = 'El estándar debe tener al menos 3 caracteres';
    } else if(datos.estandar_referencia.trim().length > 100) {
      errores.estandar_referencia = 'El estándar no puede exceder 100 caracteres';
    }
  }
  
  // Validar certificado (si existe, máximo 50 caracteres)
  if(datos.certificado && datos.certificado.trim().length > 50) {
    errores.certificado = 'El certificado no puede exceder 50 caracteres';
  }
  
  // Validar descripción (si existe, máximo 500 caracteres)
  if(datos.descripcion && datos.descripcion.trim().length > 500) {
    errores.descripcion = 'La descripción no puede exceder 500 caracteres';
  }
  
  return errores;
}

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
  
  // Validar datos
  const errores = validarDatos(d);
  
  if(Object.keys(errores).length > 0){
    return res.render('form', { item: d, errors: errores });
  }

  const q = `INSERT INTO bitacora_calibraciones
    (instrumento, ultima_calibracion, fecha_calibracion_actual, estandar_referencia, lectura_antes, lectura_despues, certificado, proxima_calibracion, descripcion)
    VALUES (?,?,?,?,?,?,?,?,?)`;

  const params = [
    d.instrumento.trim(),
    d.ultima_calibracion || null,
    d.fecha_calibracion_actual,
    d.estandar_referencia ? d.estandar_referencia.trim() : null,
    d.lectura_antes || null,
    d.lectura_despues || null,
    d.certificado ? d.certificado.trim() : null,
    d.proxima_calibracion || null,
    d.descripcion ? d.descripcion.trim() : null
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
  
  // Validar datos
  const errores = validarDatos(d);
  
  if(Object.keys(errores).length > 0) {
    return res.render('form', { item: Object.assign(d, {id: req.params.id}), errors: errores });
  }

  const q = `UPDATE bitacora_calibraciones SET
    instrumento=?, ultima_calibracion=?, fecha_calibracion_actual=?, estandar_referencia=?, lectura_antes=?, lectura_despues=?, certificado=?, proxima_calibracion=?, descripcion=?
    WHERE id=?`;

  const params = [
    d.instrumento.trim(),
    d.ultima_calibracion || null,
    d.fecha_calibracion_actual,
    d.estandar_referencia ? d.estandar_referencia.trim() : null,
    d.lectura_antes || null,
    d.lectura_despues || null,
    d.certificado ? d.certificado.trim() : null,
    d.proxima_calibracion || null,
    d.descripcion ? d.descripcion.trim() : null,
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