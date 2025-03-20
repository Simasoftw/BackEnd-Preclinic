
const listar = require('./listar');
const buscar = require('./buscar');
const insertar = require('./insertar');
const actualizar = require('./actualizar');
const eliminar = require('./eliminar');
const consultar = require('./consultar')
const insertarMasivo = require('./insertarMasivo')

module.exports = {
  listar,
  buscar,
  insertar,
  actualizar,
  eliminar,
  consultar,
  insertarMasivo
}