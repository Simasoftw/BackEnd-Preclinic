
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({codigo: String, nombre: String, descripcion: String})
    

const formularios_evaluciones = mongoose.model('formularios_evaluciones', Schema);
module.exports = formularios_evaluciones;