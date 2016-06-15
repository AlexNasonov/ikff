/**
 * Created by Alexey on 04.11.2015.
 */
var config = require('../config'),
    dbsettings = config.get('database'),
    Sequelize = require('sequelize'),
    sequelize = new Sequelize(
        dbsettings['name'],
        dbsettings['username'],
        dbsettings['password'], {
            host: dbsettings['host'],
            port: config.get('dbport'),
            dialect: config.get('dialect'),
            dialectOptions: {
                ssl: true
            },
            pool: {
                max: 5,
                min: 0,
                idle: 10000
            }
        });

exports.sequelize = sequelize;
