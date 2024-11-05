
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({codigo: String, nombre: String, descripcion: String})
    

const cargos = mongoose.model('cargos', Schema);
module.exports = cargos;