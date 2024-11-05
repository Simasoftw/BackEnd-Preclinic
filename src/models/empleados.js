
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({ 
    IDEN1: String
    ,Identificacion: Number
    ,PrimerNombre: String
    ,PrimerApellido: String
    ,SegundoApellido: String
    ,NombreCompleto: String
    ,Direccion: String
    ,Telefono1: Number
    ,Telefono2: Number
    ,FechaNacimiento: String
    ,Sexo: String
    ,EstadoCivil: String
    ,NivelEstudio: String
    ,NoHijos: Number
    ,PersonasACargo: Number
    ,Email: String
    ,IdEmpresa: String
})
    

const empleados = mongoose.model('empleados', Schema);
module.exports = empleados;