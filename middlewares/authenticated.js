'use strict'
// funcion require
var jwt = require('jwt-simple');
var moment = require('moment');
var secret = "clave-secreta-para-generar-el-token-9999";

// metodo auth (middleware) con 3 parametros req, res, next.
exports.authenticated = function (req, res, next) {

    // Comprobar si llega autorización.
    if (!req.headers.authorization) {
        return res.status(403).send({
            message: 'La petición no tiene la cabezera de authorization'
        });
    }

    // Limpiar el token y quitar comillas. (Funcion replace)
    var token = req.headers.authorization.replace(/['"]+/g, '');

    try {
        // Decodificar token.
        var payload = jwt.decode(token, secret);

        // Comprobar si el token ha expirado. (Fecha de expiracion es menor a la actual)
        if (payload.exp <= moment().unix()) {
            return res.status(404).send({
                message: 'El token ha expirado'
            });
        }

    } catch (ex) {
        return res.status(404).send({
            message: 'El token no es válido'
        });
    }

    // Adjuntar usuario idetificado a request.
    req.user = payload;

    // Pasar a la acción.
    next();
};