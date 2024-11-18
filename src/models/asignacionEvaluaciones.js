
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({
    NombreEvaluacion:String,
    IdEvaluacion:String,
    IdLider:String,
    NombreLider:String,
    IdEmpresa:String,
    TotalColaboradores:String,
    createdAt: Date 
})
    

const asignacionEvaluaciones = mongoose.model('asignacionEvaluaciones', Schema);
module.exports = asignacionEvaluaciones;