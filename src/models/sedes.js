
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({ 
    Nombre: String,
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
    IdEmpresa: String
})
    

const sedes = mongoose.model('sedes', Schema);
module.exports = sedes;