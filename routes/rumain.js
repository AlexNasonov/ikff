'use strict';
var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('rumain', {lang: "ru", title: "Международный культурный фестиваль Кунг-Фу"});
});
router.get('/gallery', function (req, res, next) {
    res.render('gallery', {lang: "en", title: "IKFF Галерея"});
});

module.exports = router;