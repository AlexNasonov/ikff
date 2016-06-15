/**
 * Created by Alexey on 04.11.2015.
 */
'use strict';

var winston = require('winston');
var env = process.env.NODE_ENV;

function getLogger (module) {

    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: env === 'development' ? 'debug' : 'error',
                label: module.filename
            }),
            new winston.transports.File({
                name: 'itef-info',
                colorize: true,
                level: 'info',
                filename: 'logs/main.log',
                maxsize: 100000,
                label: module.filename
            }),
            new winston.transports.File({
                name: 'itef-error',
                colorize: true,
                level: 'error',
                filename: 'logs/error.log',
                maxsize: 100000,
                label: module.filename
            })
        ]
    });

}

module.exports = getLogger;