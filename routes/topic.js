'use strict'

var express = require('express');
var TopicController = require('../controllers/topic');

var router = express.Router();
var md_auth = require('../middlewares/authenticated'); // md: middleware

router.get('/test', TopicController.test);
router.post('/topic', md_auth.authenticated, TopicController.save);

module.exports = router;