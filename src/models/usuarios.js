const mongoose = require('mongoose');
const schema = mongoose.Schema;

const usuariosSchema = schema({
    Id: String,
    IdEmpresa: { type: schema.Types.ObjectId, ref: 'empresas' },
    NumeroIdentificacion: String,
    UrlResultado: String,
    IdRelacional: String,
    Fecha: Date,
    FechaNacimiento: Date,
    Tipo: String,
    Clase: String,
    Descripcion: String,
    Usuarios: String,
    PrimerNombre: String,
    SegundoNombre: String,
    PrimerApellido: String,
    SegundoApellido: String,
    NombreCompleto: String,
    Filtro: String,
    TipoIdentificacion: String,
    NombreTipoIdentificacion: String,
    Usuario: String,
    Clave: String,
    Correo: String,
    Celular: Number,
    Direccion: String,
    Sexo: String,
    Telefono: String,
    IdPaciente: String,
    IdRol:{ type: schema.Types.ObjectId, ref: 'roles' },
    FechaCreacion: Date,
    FechaNacimiento: String,
    CodigoRegional: String,
    CodigoSede: String,
    EstadoCambioClave: Boolean,
    CarqueAutomatico: Boolean,
    RolEvaluacion: String,
    IdRolEvaluacion: String,
    IdLider: String
});

const usuarios = mongoose.model('usuarios', usuariosSchema);
module.exports = usuarios;