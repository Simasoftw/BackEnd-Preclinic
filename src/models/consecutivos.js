
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({
    Prefijo: String,
    Valor: Number,
    IdEmpresa: { type: schema.Types.ObjectId, ref: 'configuracion_empresas' },
})
    

const cargos = mongoose.model('configuracion_consecutivos', Schema);
module.exports = cargos;