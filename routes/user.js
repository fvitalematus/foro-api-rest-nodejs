'use strict'

var express = require('express');
var UserController = require('../controllers/user');

var router = express.Router();
var md_auth = require('../middlewares/authenticated'); // md: middleware

var crypto = require('crypto');
var multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/users');
    },
    filename(req, file = {}, cb) {
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        // cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + fileExtension);
        });
    },
});

var mul_upload = multer({ dest: './uploads/users', storage });
// var md_upload = multipart({ uploadDir: './uploads/users' }); // md: middleware

// Rutas de prueba
router.get('/probando', UserController.probando);
router.post('/testeando', UserController.testeando);

// Rutas de usuarios
router.post('/register', UserController.save);
router.post('/login', UserController.login);
router.put('/user/update', md_auth.authenticated, UserController.update); // middleware auth
router.post('/upload-avatar', [md_auth.authenticated, mul_upload.single('image')], UserController.uploadAvatar);
router.get('/avatar/:fileName', UserController.avatar);
router.get('/users', UserController.getUsers);
router.get('/user/:userId', UserController.getUser);


module.exports = router;

//('/upload-image-album/:id', 
//[md_auth.ensureAuth, mul_upload.single('image')], AlbumController.uploadImage);