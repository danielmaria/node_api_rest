const ususarioService = require('../service/usuario.service');
const UsuarioSchema = require('../schema/usuario.schema');

let dao = {};
dao.addUsuario = addUsuario;

module.exports = dao;

function addUsuario(usuario){
    return new Promise((resolve, reject) => {
        UsuarioSchema.create(usuario)
        .then((result) => {
            resolve(result);
        })
        .catch((erro) => {
            reject(erro);
        });
    })
}