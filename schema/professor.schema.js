var mongoose = require('mongoose');

let msgErro = " é obrigatório";
var professorSchema = new mongoose.Schema({
    nome: {type: String, required: [true, "Nome" + msgErro]},
    email: {type: String, required: [true, "E-mail" + msgErro]},
    senha: {type: String, required: [true, "Senha" + msgErro]},
    idade: Number,
    sexo: {type: String, required: [true, "Senha" + msgErro]},
    alunos: [{
        idAluno: {type: String, required: [true, "idAluno" + msgErro]},
        nomeAluno: {type: String, required: [true, "Nome do aluno" + msgErro]},
        emailAluno: {type: String, required: [true, "Senha" + msgErro]}
    }],
    agenda: [{
        data: {type: Date, required: [true, "Data " + msgErro]},
        descricao: {type: String, required: [true, "Descricao" + msgErro]}
    }]

}, {versionKey: false});

module.exports = mongoose.model('Professor', professorSchema);