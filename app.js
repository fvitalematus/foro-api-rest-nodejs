'use strict'

// Requires
var express = require('express');
var bodyParser = require('body-parser');

// Ejecutar express
var app = express();

// Cargar archivos de rutas

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS

// Reescribir Rutas (request: lo que envio - response: lo que devuelvo)

// Ruta - metodo de prueba (request: lo que envio - response: lo que devuelvo)
app.get('/prueba', (req, res) => {
    return res.status(200).send("<h1>Hellow Word from back-end with NodeJS</h1>");
    /*
    return res.status(200).send({
        nombre: "Franco Vitale",
        message: 'Hellow Word from back-end with NodeJS'
    });
    */
});

// Exportar modulo
module.exports = app;