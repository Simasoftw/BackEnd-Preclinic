const mongoose = require('mongoose');
const schema = mongoose.Schema;

const clavesTemporalesSchema = schema({
    Codigo: String,
    Nombres: String,
    CodigoCargo: String,
    Cargo: String,
    AntiguedadMeses: String,
    IdJefe: String,
    Jefe: String,
    CodigoCentroCosto: String,
    Sede: String,
    CodigoServicio: String,
    Servicio: String
});

const clavestemporales = mongoose.model('homologacion_asignaciones', clavesTemporalesSchema);
module.exports = clavestemporales;