'use strict'

var validator = require('validator');
var bcrypt = require('bcrypt-node');
var User = require('../models/user');

var controller = {
    probando: function (req, res) {
        return res.status(200).send({
            message: "Soy el metodo probando"
        });
    },

    testeando: function (req, res) {
        return res.status(200).send({
            message: "Soy el metodo TESTEANDO"
        });
    },

    save: function (req, res) {
        // Recoger los parametros de la petición.
        var params = req.body;

        // Validar los datos.
        var validate_name = !validator.isEmpty(params.name);
        var validate_surname = !validator.isEmpty(params.surname);
        var validate_email = !validator.isEmpty(params.email) && validator.isEmail(params.email);
        var validate_password = !validator.isEmpty(params.password);

        // console.log(validate_name, validate_surname, validate_email, validate_password);

        if (validate_name && validate_surname && validate_email && validate_password) {
            // Crear el objeto de usuario.
            var user = new User();

            // Asignar valores al usuario.
            user.name = params.name;
            user.surname = params.surname;
            user.email = params.email.toLowerCase();
            user.role = 'ROLE_USER';
            user.image = null;

            // Comprobar si el usuario existe.
            User.findOne({ email: user.email }, (err, issetUser) => {
                if (err) {
                    return res.status(500).send({
                        message: "Error al comprobar duplicidad de usuario"
                    });
                }

                if (!issetUser) {
                    // Si no existe,

                    // Cifrar la contraseña.
                    bcrypt.hash(params.password, null, null, (err, hash) => {
                        user.password = hash;

                        // Guardar usuarios.
                        user.save((err, userStored) => {
                            if (err) {
                                return res.status(500).send({
                                    message: "Error al guardar el usuario"
                                });
                            }

                            if (!userStored) {
                                return res.status(400).send({
                                    message: "El usuario no se ha guardado"
                                });
                            }

                            // Devolver respuesta.
                            return res.status(200).send({
                                status: 'success',
                                user: userStored
                            });
                        }); // close save
                    }); // close bcrypt

                } else {
                    return res.status(500).send({
                        message: "El usuario ya está registrado"
                    });
                }
            });


        } else {
            return res.status(200).send({
                message: "Validación de los datos del usuario es incorrecta, intenta de nuevo"
            });
        }

    }

};

module.exports = controller;