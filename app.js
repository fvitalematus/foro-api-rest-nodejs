'use strict'
// MVC: MODELO VISTA CONTROLADOR (ARQUITECTURA)
// Requires
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express
var app = express();

// Cargar archivos de rutas
var user_routes = require('./routes/user');
var topic_routes = require('./routes/topic');
var comment_routes = require('./routes/comment')

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Reescribir Rutas (request: lo que envio - response: lo que devuelvo)
app.use('/api', user_routes);
app.use('/api', topic_routes);
app.use('/api', comment_routes);

// Exportar modulo
module.exports = app;