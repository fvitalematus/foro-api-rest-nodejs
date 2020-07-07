// UN MODELO es una clase o un esquema que nos permite interactuar con la base de datos.
// Sirve para crear objetos basados del esquema con el fin de crear objetos similares.
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    surname: String,
    email: String,
    password: String,
    image: String,
    role: String
});

module.exports = mongoose.model('User', UserSchema);
                            // lowercase y pluralizar el nombre.
                            // user -> documentos (schema).