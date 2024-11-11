
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({
    Codigo: String, 
    Nombre: String, 
    Descripcion: String,
    Tipo: String,
    IdEmpresa: String
})
    

const competencias = mongoose.model('competencias', Schema);
module.exports = competencias;