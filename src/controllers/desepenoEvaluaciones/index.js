
const listar = require('./listar');
const buscar = require('./buscar');
const insertar = require('./insertar');
const actualizar = require('./actualizar');
const eliminar = require('./eliminar');
const listarPorId = require('./listarPorId')
const consultar = require('./consultar')

module.exports = {
  listar,
  buscar,
  insertar,
  actualizar,
  eliminar,
  listarPorId,
  consultar
}