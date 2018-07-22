
var express = require('express');
var router = express.Router();

const usuarioController = require('../controller/usuario.controller');

router.get('/',function(req, res){
    res.send("Hello World");
})

router.post('/add/usuario', usuarioController.addUsuario)

module.exports = router;
