const mongoose = require('mongoose');
const schema = mongoose.Schema;

const clavesTemporalesSchema = schema({
    IndentificacionPaciente : String,
    Clave : String,
    IdEmpesa: { type: schema.Types.ObjectId, ref: 'empresas' } 
});

const clavestemporales = mongoose.model('clavestemporales', clavesTemporalesSchema);
module.exports = clavestemporales;