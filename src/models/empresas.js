const mongoose = require('mongoose');
const schema = mongoose.Schema;

const empresaSchema = schema({
    IdEmpresa: String
    ,Identificacion: String
    ,Nit: String
    ,TipoIdentificacion: String
    ,DigitoVerificacion: String
    ,Nombre: String
    ,Direccion: String
    ,Telefono1: String
    ,Telefono2: String
    ,Celular: String
    ,Correo: String
    ,IdPais : String
    ,Pais : String
    ,IdMunicipio : String
    ,Municipio: Object
    ,Logo: String
    ,LogoInicioSesion: String
    ,LogoImpresion: String
    ,FechaActualizacion: Date
    ,UsuarioActualizacion: String
    ,PaginaWeb: String
    ,Activo: Boolean
    ,Regimen: String
    ,ArrayImgCarrusel: []
    ,ArrayModulos: []
    ,ImgBanner:{}
    ,ImgInicio:{}
    ,ImgLogo:{}
    ,objConexiones: {}
    ,SolicitudCambioClave: Boolean
    ,EstadoCreacionUsuario: Boolean
    ,EstadoEnvioCorreo: Boolean
    ,VideoInstructivo: String
});

const empresa = mongoose.model('empresas', empresaSchema);
module.exports = empresa;