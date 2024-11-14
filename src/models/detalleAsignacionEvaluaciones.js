
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({ 
    NombreEvaluacion: String,
    IdAsignacion: String,
    IdEvaluacion: String,
    IdLider: String,
    NombreLider: String,
    NumeroDocumentoEmpleado: String,
    NombreEmpleado: String,
    IdEmpleado: String,
    IdEmpresa: String,
    NombreUsuarioLogin: String,
    IdUsuarioLogin: String,
    Estado: Boolean,
    CargoEmpleado: Object,
    AreaServicioEmpleado: Object,
    resultadoInfo: Object,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
    

const detalleAsignacionEvaluaciones = mongoose.model('detalleAsignacionEvaluaciones', Schema);
module.exports = detalleAsignacionEvaluaciones;