
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({codigo: String, nombre: String, descripcion: String})
    

const centrosCostos = mongoose.model('centrosCostos', Schema);
module.exports = centrosCostos;