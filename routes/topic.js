'use strict'

var express = require('express');
var TopicController = require('../controllers/topic');

var router = express.Router();
var md_auth = require('../middlewares/authenticated'); // md: middleware

// Métodos = GET: Sacar Datos - POST: Enviar Datos.
// Métodos Http = PUT: Actualizar datos - DELETE: Eliminar Recursos del Backend.
router.get('/test', TopicController.test);
router.post('/topic', md_auth.authenticated, TopicController.save);
router.get('/topics/:page?', TopicController.getTopics);
router.get('/user-topics/:user', TopicController.getTopicsByUser);
router.get('/topic/:id', TopicController.getTopic);
router.put('/topic/:id', md_auth.authenticated, TopicController.update);
router.delete('/topic/:id', md_auth.authenticated, TopicController.delete);
router.get('/search/:search', TopicController.search);

module.exports = router;