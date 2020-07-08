'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();
var md_auth = require('../middlewares/authenticated'); // md: middleware

var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' }); // md: middleware

// Rutas de prueba
router.get('/probando', UserController.probando);
router.post('/testeando', UserController.testeando);

// Rutas de usuarios
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/update', md_auth.authenticated, UserController.update); // middleware auth
router.post('/upload-avatar', [md_auth.authenticated, md_upload], UserController.uploadAvatar);


module.exports = router;