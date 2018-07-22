'use strict';

var logger   = require('mm-node-logger')(module);
var mongoose = require('mongoose');
var config   = require('./config');

function createMongooseConnection(cb) {
    //Criação do database de conexão
    mongoose.Promise = global.Promise;

    mongoose.connect(config.mongodb.dbURI);

    //Quando conexão bem sucedida
    mongoose.connection.on('connected', function () {
        logger.info('Mongoose conectado a ' + config.mongodb.dbURI);
    });

    //Se a conexão disparar algum erro
    mongoose.connection.on('error', function (err) {
        logger.error('Erro de conexão do Mongoose: ' + err);
    });

    //Quando a conexão for fechada
    mongoose.connection.on('disconnected', function () {
        logger.info('Mongoose desconectado');
    });

    //Quando a conexão for aberta
    mongoose.connection.once('open', function () {
        if(cb && typeof(cb) === 'function') {cb();}
    });

    //Se o processo Node finalizar, fechar as conexões do Mongoose
    process.on('SIGINT', function() {
        mongoose.connection.close(function () {
            logger.info('Mongoose desconectado por meio da finalização do aplicativo');
            mongoose.disconnect();
            process.exit(0);
        });
    });
}

module.exports = createMongooseConnection;
