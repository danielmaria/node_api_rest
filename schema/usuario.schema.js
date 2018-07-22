var mongoose = require('mongoose');

let msgErro = " é obrigatório";
var alunoSchema = new mongoose.Schema({
    nome: {type: String, required: [true, "Nome" + msgErro]},
    email: {type: String, required: [true, "E-mail" + msgErro]},
    senha: {type: String, required: [true, "Senha" + msgErro]},
    idade: Number,
    sexo: {type: String, required: [true, "Senha" + msgErro]},
    treinos: [{
        objetivo: {type: String, required: [true, "Objetivo" + msgErro]},
        dataFimPrevisto: {type: Date, required: [true, "Senha" + msgErro]},
        qtdRepeticoes: Number,
        nomeProfessor: String,
        subTreinos : [{
            nome: {type: String, required: [true, "Nome" + msgErro]},
            intensidade: Number,
            exercicios: [{
                nome: {type: String, required: [true, "Nome" + msgErro]},
                descricao: {type: String, required: [true, "Descrição" + msgErro]},
                foto: String,
                tipo: String,
                observacoes: [String],
                series: [{
                    carga: Number,
                    repeticoes: Number,
                    qtdSeries: Number
                }]
            }],
            datasRealizadas: {
                data: Date
            }
        }]
    }],
    feedbacks: [{
        nomeProfessor: {type: String, required: [true, "Nome professor" + msgErro]},
        descricao: {type: String, required: [true, "Descrição" + msgErro]},
        anonimo: Boolean
    }],
    mensagens: [{
        nomeProfessor: {type: String, required: [true, "Nome professor" + msgErro]},
        descricao: {type: String, required: [true, "Descrição" + msgErro]}
    }],
    professor: {
        nome: String,
        ativo: Boolean
    }
}, {versionKey: false});

module.exports = mongoose.model('Aluno', alunoSchema);