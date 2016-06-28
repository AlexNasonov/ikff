'use strict';
var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('main', {lang: "en", title: "International Kung-Fu Festival"});
});
router.get('/gallery', function (req, res, next) {
    res.render('gallery', {lang: "en", title: "IKFF Gallery"});
});
router.get('/tours', function (req, res, next) {
    res.render('tours', {lang: "en", title: "IKFF Tours"});
});

router.post('/tours', function (req, res) {

    var mailer = {
        name: "IKFF Tourist Request"
    };

    var poolConfig = {
        pool: true,
        host: "smtp.yandex.ru",
        port: 465,
        secure: true, // use SSL
        auth: {
            user: "mailer@itef.pro",
            pass: "itefitef"
        }
    };
    var transport = nodemailer.createTransport(poolConfig);

    var mailOptions = {
        from: 'IKFF Tourist Website <mailer@itef.pro>', // sender address
        to: 'nasonov@itef.pro, yanichev@kungfu-russia.ru', // list of receivers
        subject: 'IKFF Tourist Request', // Subject line
        text:   'Tourist: '+req.body.touristName + '\n'+
                'Tourist email: '+req.body.touristEmail + '\n'+
                'Tour name: '+req.body.tourName + '\n'+
                'Trip date: '+req.body.tripDate // plaintext body
    };

    transport.sendMail(mailOptions, function(error, info){
        if(error){
            res.status(501).send();
            return;
        }
        res.status(200).send();
        console.log('Message sent: ' + info.response);
    });
});

module.exports = router;
