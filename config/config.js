'use strict';

var config = {};

config.environment = process.env.NODE_ENV || 'development';

//Popula o DB com dados simples
config.seedDB = false;

//Configurações do Server (IP e Porta)
config.server = {
    host: process.env.IP || 'localhost',
    port: process.env.PORT || 3000
};

//Configurações do MongoDB (URI configurado no MongoDB)
config.mongodb = {
    dbURI: "localhost:27017/fitnesshouse"
};

// Export configuration object
module.exports = config;
