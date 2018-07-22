let express = require('express'),
config = require('./config'),
morgan = require('morgan'), // Permite logs das requisições
cors = require('cors'), // Permite Cross-Origin resource sharing
helmet = require('helmet'), // Fornece um pouco de segurança a aplicação
bodyParser = require('body-parser'), // Facilita a manipulação das requisições
methodOverride = require('method-override'), // PUT, DELETE, POST em lugares onde o cliente não os suportam.

app = express();
const SixMonths = 15778476000;


function initMiddleware(app) {
    // Mostrando stack erros
    app.set('showStackError', true);

    // Permite jsonp
    app.enable('jsonp callback');
    if (config.environment === 'development') {
        // Permite logger (morgan)
        app.use(morgan('dev'));

        // Desabilita views cache
        app.set('view cache', false);
    } else if (config.environment === 'production') {
        app.locals.cache = 'memory';
    }

    // Algumas configurações do bodyParser
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true})); // Compreende urlencoded (tamanho limite)
    app.use(bodyParser.json({ limit: '50mb' })); // Compreende json (tamanho limite)
    app.use(methodOverride());


}

function initHelmetHeaders(app) {
    app.use(helmet.frameguard()); // Impede clickjacking
    app.use(helmet.xssFilter());  // Adiciona proteções XSS
    app.use(helmet.noSniff());    // Impedir que os clientes vejam os topos MINE
    app.use(helmet.ieNoOpen());   // Seta as opções de X-Download (IE8+)
    app.use(helmet.hsts({         // HTTP de segurança para transporte estrito  
        "maxAge": SixMonths,
        "includeSubdomains": true,
        "force": true
    }));
    app.disable("x-powered-by");
}

function initCrossDomain(app) {
app.use(cors());
app.use(function(req, res, next) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
    res.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
}

// Inicia as rotas
function initRoutes(app) {
app.use('/', require('./routes'));
}

// Inicia o banco de dados
function initDB() {
    if(config.seedDB) {
        require('./seed');
    }
}

// Inicia todas as funções do arquivo
function init() {
    let app = express();
    initMiddleware(app);
    initHelmetHeaders(app);
    initCrossDomain(app);
    initRoutes(app);
    initDB();
    return app;
}

// Exporta as funções acima
module.exports.init = init;
