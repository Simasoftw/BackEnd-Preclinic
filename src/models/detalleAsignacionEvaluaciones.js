
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({
    IdEvaluacion: String,
    NombreEvaluacion:String, 
    IdLider: String,
    NombreLider:String, 
    IdEmpleado: String,
    NombreEmpleado: String, 
    Estado: Boolean, 
    NumeroDocumentoEmpleado: String
})
    

const detalleAsignacionEvaluaciones = mongoose.model('detalleAsignacionEvaluaciones', Schema);
module.exports = detalleAsignacionEvaluaciones;