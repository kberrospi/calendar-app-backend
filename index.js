const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');
const path = require('path');

//crear el servidor de express
const app = express();

//Base de datos
dbConnection();

//CORS
app.use(cors());

//directorio publico
app.use( express.static('public') );

// Lectura y parseo del body
app.use(express.json());

//Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

/** Para cualquier otra petición */
app.get('*', ( req, res ) => {
  res.sendFile( path.join( __dirname+'/public/index.html' ) );
});

//TODO CRUD: eventos


//Escuchar peticiones
app.listen( process.env.PORT, () => {
  console.log( `Servidor corriendo en puerto ${ process.env.PORT }` )
});

