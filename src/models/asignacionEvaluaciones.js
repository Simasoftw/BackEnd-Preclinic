
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({IdEvaluacion: String,NombreEvaluacion:String, IdLider: String})
    

const asignacionEvaluaciones = mongoose.model('asignacionEvaluaciones', Schema);
module.exports = asignacionEvaluaciones;