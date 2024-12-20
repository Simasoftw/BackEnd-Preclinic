const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({
    titulo: String, 
    descripcion: String, 
    tipoEvaluacion: String,
    arrayCompetencias: Array,
    arrayPreguntasLibres: Array,
    IdEmpresa: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const evaluciones = mongoose.model('evaluciones', Schema);
module.exports = evaluciones;
