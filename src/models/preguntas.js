
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({
    Codigo: String, 
    Nombre: String, 
    Descripcion: String, 
    IdEmpresa: String, 
    Tipo: String
})
    

const preguntas = mongoose.model('preguntas', Schema);
module.exports = preguntas;