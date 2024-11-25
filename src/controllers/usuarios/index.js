const listar = require('./listar');
const buscar = require('./buscar');
const insertar = require('./insertar');
const actualizar = require('./actualizar');
const eliminar = require('./eliminar');
const validarIngreso = require('./validarIngreso');
const listarPorIdentificacion = require('./listarPorIdentificacion');
const consultar = require('./consultar');
const validarCelular = require('./validarCelular');
const listarPacientePorId = require('./listarPacientePorId')
const cambiarClave = require('./cambiarClave')

module.exports = {
  listar,
  buscar,
  insertar,
  actualizar,
  eliminar,
  validarIngreso,
  listarPorIdentificacion,
  consultar,
  validarCelular,
  listarPacientePorId,
  cambiarClave
}
