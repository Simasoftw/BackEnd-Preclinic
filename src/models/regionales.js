
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema({
    Codigo: String, 
    Nombre: String, 
    UrlApiArmadoCuenta: String
})
    

const regionales = mongoose.model('regionales', Schema);
module.exports = regionales;