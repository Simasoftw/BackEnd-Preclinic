
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({Codigo: String, Nombre: String, IdEmpresa: String})
    

const areas = mongoose.model('recursoshumanos_areasservicios', Schema);
module.exports = areas;