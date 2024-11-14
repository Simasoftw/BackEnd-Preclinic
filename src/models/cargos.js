
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({
    Nombre: String,
    Codigo: String
})
    

const cargos = mongoose.model('recursoshumanos_cargos', Schema);
module.exports = cargos;