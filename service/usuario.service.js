const usuarioDao = require('../dao/usuario.dao');

let service = {}
service.addUsuario = addUsuario;

module.exports = service;

function addUsuario(usuario){
    return new Promise((resolve, reject) => {
        usuarioDao.addUsuario(usuario)
        .then((resposta) => {
            resolve(resposta);
        })
        .catch((erro) => {
            reject(erro);
        })
    }) 
}