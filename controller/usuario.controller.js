const usuarioService = require('../service/usuario.service');

let controller = {}
controller.addUsuario = addUsuario;

module.exports = controller;

function addUsuario(req, res, next){
    usuarioService.addUsuario(req.body)
    .then((resposta) => {
        res.status(200)
        res.json(resposta);
    })
    .catch((error) => {
        res.status(400);
        res.json(error);
    })
}