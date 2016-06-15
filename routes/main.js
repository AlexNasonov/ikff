'use strict';
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('main', {page: "home", title: "International Kung-Fu Festival"});
});


/* LOGOUT */
router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
});

module.exports = router;
