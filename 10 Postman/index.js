const express = require('express');
const mirrow = require('./endpoints/mirrow');

//Vamos a hacer una instacia del sevidor
const app = express();
const port = 3000;

app.use(express.json()); //Middleware para parsear el body a JSON
//definimos cada una de las rutas
app.get('/',mirrow);
app.post('/',mirrow);
app.put('/',mirrow);
app.patch('/',mirrow);
app.delete('/',mirrow);
app.head('/',mirrow);

app.listen(port,() =>{
    console.log("Servidor escuchando");
});

app.listen(port,() =>{
    console.log("Servidor escuchando");
})