
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({ 
    Nombre: String,
    Codigo: String,
    NombreCoordinador: String,
    IdPais: String,
    IdMunicipio: String,
    Direccion: String,
    Celular: String,
    Telefono: String,
    IdRegional: String,
    Estado: String,
    Pais: String,
    Municipio: String,
    IdEmpresa:  { type: schema.Types.ObjectId, ref: 'configuracion_empresas' }
})
    

const sedes = mongoose.model('sedes', Schema);
module.exports = sedes;