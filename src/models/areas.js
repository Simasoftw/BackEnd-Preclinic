
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({codigo: String, nombre: String, descripcion: String})
    

const areas = mongoose.model('areas', Schema);
module.exports = areas;