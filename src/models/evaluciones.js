
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({
    Titulo: String, 
    Descripcion: String, 
    tipoEvaluacion: String,
    arrayCompetencias: Array,
    arrayPreguntasLibres: Array,
    IdEmpresa: String
})
    

const evaluciones = mongoose.model('evaluciones', Schema);
module.exports = evaluciones;