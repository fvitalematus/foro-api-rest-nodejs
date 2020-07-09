'use strict'

var validator = require('validator');
var Topic = require('../models/topic');

var controller = {

    test: function (req, res) {
        return res.status(200).send({
            message: 'Soy el metodo test'
        });
    },

    save: function (req, res) {

        // Recoger parametros por post
        var params = req.body;

        // Validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
            var validate_lang = !validator.isEmpty(params.lang);

        } catch (err) {
            return res.status(200).send({
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content & validate_lang) {

            // Crear objeto a guardar
            var topic = new Topic();

            // Asignar valores
            topic.title = params.title;
            topic.content = params.content;
            topic.code = params.code;
            topic.lang = params.lang;
            topic.user = req.user.sub;

            // Guardar el topic
            topic.save((err, topicStored) => {

                if (err || !topicStored) {
                    return res.status(404).send({
                        status: 'error',
                        message: 'El tema no se ha guardado'
                    });
                }

                // Devolver una respuesta
                return res.status(200).send({
                    status: 'success',
                    topic: topicStored
                });
            });

        } else {
            return res.status(200).send({
                message: 'Los datos no son válidos'
            });
        }

    },

    getTopics: function (req, res) {

        // Cargar la libreria de paginación en la clase. (Modelo)
        // Recoger la página actual.
        if (!req.params.page || req.params.page == 0 || req.params.page == "0" || req.params.page == null || req.params.page == undefined) {
            var page = 1;
        } else {
            var page = parseInt(req.params.page);
        }

        // Indicar las opciones de paginación.
        var options = {
            sort: { date: -1 }, // Orden descendente (-1)
            populate: 'user',
            limit: 5,
            page: page
        };

        // Find paginado.
        Topic.paginate({}, options, (err, topics) => {

            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al hacer la consulta'
                });
            }

            if (!topics) {
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay topics'

                });
            }

            // Devolver resultado. (topics, total de topic, total de páginas)
            return res.status(200).send({
                status: 'success',
                topics: topics.docs,
                totalDocs: topics.totalDocs,
                totalPages: topics.totalPages
            });

        });

    },

    getTopicsByUser: function (req, res) {

        // Conseguir con una condición de usuario.
        var userId = req.params.user;

        // Find con una condición de usuario.
        Topic.find({
            user: userId
        })
            .sort([['date', 'descending']])
            .exec((err, topics) => {

                if (err) {
                    // Devolver resultado
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición'
                    });
                }

                if (!topics) {
                    // Devolver resultado
                    return res.status(404).send({
                        status: 'error',
                        message: 'No hay temas para mostrar'
                    });
                }

                // Devolver resultado
                return res.status(200).send({
                    status: 'success',
                    topics
                });
            });

    },

    getTopic: function (req, res) {

        // Sacar el id del topic de la url.
        var topicId = req.params.id;

        // Find por id del topic.
        Topic.findById(topicId)
            .populate('user')
            .exec((err, topic) => {

                if (err) {
                    res.status(500).send({
                        status: 'error',
                        message: 'Error en la petición'
                    });
                }

                if (!topic) {
                    res.status(404).send({
                        status: 'error',
                        message: 'No existe el tema'
                    });
                }

                // Devolver resultado.
                return res.status(200).send({
                    status: 'success',
                    topic
                });
            });
    }

};

module.exports = controller;