const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({
    titulo: String, 
    descripcion: String, 
    arrayCompetencias: Array,
    arrayPreguntasLibres: Array,
    IdEmpresa: String,
    NombreColaborador: String,
    NombreLider: String,
    IdLider: String,
    NumeroDocumentoEmpleado: String,
    CargoEmpleado: Object,
    AreaServicioEmpleado: Object,
    IdEvaluacion: String,
    IdEmpleado: String,
    descripcion: String,
    fecha: String,
    area:String,
    Sede:String,
    promedioGeneral: String,
    promedioGeneralPorcentaje: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
    

const evaluciones = mongoose.model('resultadoEvaluaciones', Schema);
module.exports = evaluciones;