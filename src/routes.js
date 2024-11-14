/* const { request } = require('express'); */
const express = require("express");
const router = express.Router();

module.exports = () => {
  //index
  const indexRouter = express.Router();
  indexRouter.get("/", (req, res) => {
    res.status(200).json({ response: "Mongo API is working properly." });
  });

  const { authenticateJWT } =  require('./middlewares/authentication');


  const requestsRouter = express.Router();
  const empresasController = require("./controllers/empresas");
  const usuariosController = require("./controllers/usuarios");
  const interfacesController = require("./controllers/interfaces");
  const rolesController = require("./controllers/roles");   
  const loginController = require("./controllers/login");       
  const areasController = require("./controllers/areas");
  const automatizacionController = require("./controllers/automatizacion");       
  const centrosCostosController = require("./controllers/centrosCostos");   
  const cargosController = require("./controllers/cargos");   
  const competenciasController = require("./controllers/competencias");   
  const sedesController = require("./controllers/sedes");   
  const evalucionesController = require("./controllers/evaluciones");   
  const formularios_evalucionesController = require("./controllers/formularios_evaluciones");   
  const empleadosController = require("./controllers/empleados");   
  const regionalesController = require("./controllers/regionales");   
  const preguntasController = require("./controllers/preguntas");   
  const asignacionEvaluacionesController = require("./controllers/asignacionEvaluaciones");  
  const detalleAsignacionEvaluacionesController = require("./controllers/detalleAsignacionEvaluaciones");
  const resultadoEvaluacionController = require("./controllers/resultadoEvaluacion");
  const desempenoController = require("./controllers/desepenoEvaluaciones")

  // Aplica la validación JWT a todas las rutas debajo con authenticateJWT
  router.use('/interfaces', authenticateJWT);

  // FIN JWT
    
  //automatizacion
  requestsRouter.post("/automatizacion/crearMaestro", automatizacionController.crearMaestro);

  //login
  requestsRouter.post("/login/insertar", loginController.insertar)

  //empresas
  requestsRouter.get("/empresas/:key/:value", empresasController.buscar);
  requestsRouter.post("/empresas/actualizar", empresasController.actualizar);
  requestsRouter.get("/empresas/consultar", empresasController.consultar);
  requestsRouter.post("/empresas/insertar", empresasController.insertar);
 
  //areas
  requestsRouter.get("/areas/listar/:value", areasController.listar);
  requestsRouter.get("/areas/:key/:value", areasController.buscar);
  requestsRouter.post("/areas/insertar", areasController.insertar);
  requestsRouter.post("/areas/eliminar", areasController.eliminar);
  requestsRouter.post("/areas/actualizar", areasController.actualizar);
  requestsRouter.post("/areas/consultar", areasController.consultar)

  //centros de Costos
  requestsRouter.get("/centrosCostos/listar/:value", centrosCostosController.listar);
  requestsRouter.get("/centrosCostos/:key/:value", centrosCostosController.buscar);
  requestsRouter.post("/centrosCostos/insertar", centrosCostosController.insertar);
  requestsRouter.post("/centrosCostos/eliminar", centrosCostosController.eliminar);
  requestsRouter.post("/centrosCostos/actualizar", centrosCostosController.actualizar);
  requestsRouter.post("/centrosCostos/consultar", centrosCostosController.consultar)

  //cargos
  requestsRouter.get("/cargos/listar/:value", cargosController.listar);
  requestsRouter.get("/cargos/:key/:value", cargosController.buscar);
  requestsRouter.post("/cargos/insertar", cargosController.insertar);
  requestsRouter.post("/cargos/eliminar", cargosController.eliminar);
  requestsRouter.post("/cargos/actualizar", cargosController.actualizar);
  requestsRouter.post("/cargos/consultar", cargosController.consultar)

  requestsRouter.get("/sedes/listar/:value", sedesController.listar);
  requestsRouter.get("/sedes/:key/:value", sedesController.buscar);
  requestsRouter.post("/sedes/insertar", sedesController.insertar);
  requestsRouter.post("/sedes/eliminar", sedesController.eliminar);
  requestsRouter.post("/sedes/actualizar", sedesController.actualizar);
  requestsRouter.post("/sedes/consultar", sedesController.consultar)

  //competencias
  requestsRouter.get("/competencias/listar/:value", competenciasController.listar);
  requestsRouter.get("/competencias/:key/:value", competenciasController.buscar);
  requestsRouter.post("/competencias/insertar", competenciasController.insertar);
  requestsRouter.post("/competencias/eliminar", competenciasController.eliminar);
  requestsRouter.post("/competencias/actualizar", competenciasController.actualizar);
  requestsRouter.post("/competencias/consultar", competenciasController.consultar)

  //evaluciones
  requestsRouter.get("/evaluciones/listar/:value", evalucionesController.listar);
  requestsRouter.get("/evaluciones/:key/:value", evalucionesController.buscar);
  requestsRouter.post("/evaluciones/insertar", evalucionesController.insertar);
  requestsRouter.post("/evaluciones/eliminar", evalucionesController.eliminar);
  requestsRouter.post("/evaluciones/actualizar", evalucionesController.actualizar);
  requestsRouter.get("/evalucionesListarPorId/:value/:key", evalucionesController.listarPorId);
  requestsRouter.post("/evaluciones/consultar", evalucionesController.consultar)

  //formularios evaluciones
  requestsRouter.get("/formularios_evaluciones/listar/:value", formularios_evalucionesController.listar);
  requestsRouter.get("/formularios_evaluciones/:key/:value", formularios_evalucionesController.buscar);
  requestsRouter.post("/formularios_evaluciones/insertar", formularios_evalucionesController.insertar);
  requestsRouter.post("/formularios_evaluciones/eliminar", formularios_evalucionesController.eliminar);
  requestsRouter.post("/formularios_evaluciones/actualizar", formularios_evalucionesController.actualizar);
  requestsRouter.post("/formularios_evaluciones/consultar", formularios_evalucionesController.consultar)

  //empleados
  requestsRouter.get("/empleados/listar/:value", empleadosController.listar);
  requestsRouter.get("/empleados/:key/:value", empleadosController.buscar);
  requestsRouter.post("/empleados/insertar", empleadosController.insertar);
  requestsRouter.post("/empleados/eliminar", empleadosController.eliminar);
  requestsRouter.post("/empleados/actualizar", empleadosController.actualizar);
  requestsRouter.post("/empleados/consultar", empleadosController.consultar)

  //regionales
  requestsRouter.get("/regionales/listar/:value", regionalesController.listar);
  requestsRouter.get("/regionales/:key/:value", regionalesController.buscar);
  requestsRouter.post("/regionales/insertar", regionalesController.insertar);
  requestsRouter.post("/regionales/eliminar", regionalesController.eliminar);
  requestsRouter.post("/regionales/actualizar", regionalesController.actualizar);
  requestsRouter.post("/regionales/consultar", regionalesController.consultar)

  //preguntas
  requestsRouter.get("/preguntas/listar/:value", preguntasController.listar);
  requestsRouter.get("/preguntas/:key/:value", preguntasController.buscar);
  requestsRouter.post("/preguntas/insertar", preguntasController.insertar);
  requestsRouter.post("/preguntas/eliminar", preguntasController.eliminar);
  requestsRouter.post("/preguntas/actualizar", preguntasController.actualizar);
  requestsRouter.post("/preguntas/consultar", preguntasController.consultar)

  //resultado evaluacion 
  requestsRouter.get("/resultadoEvaluacion/listar/:value", resultadoEvaluacionController.listar);
  requestsRouter.get("/resultadoEvaluacion/:key/:value", resultadoEvaluacionController.buscar);
  requestsRouter.post("/resultadoEvaluacion/insertar", resultadoEvaluacionController.insertar);
  requestsRouter.post("/resultadoEvaluacion/eliminar", resultadoEvaluacionController.eliminar);
  requestsRouter.post("/resultadoEvaluacion/actualizar", resultadoEvaluacionController.actualizar);
  requestsRouter.post("/resultadoEvaluacion/consultar", resultadoEvaluacionController.consultar)

  //usuarios
  requestsRouter.post("/usuarios/listar", usuariosController.listar);
  requestsRouter.get("/usuarios/:key/:value", usuariosController.buscar);
  requestsRouter.post("/usuarios/insertar", usuariosController.insertar);
  requestsRouter.post("/usuarios/eliminar", usuariosController.eliminar);
  requestsRouter.post("/usuarios/actualizar", usuariosController.actualizar);
  requestsRouter.post("/usuarios/validarIngreso",usuariosController.validarIngreso);
  requestsRouter.get("/usuarios/listarPorIdentificacion/:value/:key",usuariosController.listarPorIdentificacion);
  requestsRouter.post("/usuarios/consultar", usuariosController.consultar);
  requestsRouter.get("/usuarios/listarPacientePorId/:value/:key",usuariosController.listarPacientePorId);
 
  //asignacion Evaluaciones
  requestsRouter.get("/asignacionEvaluaciones/listar/:value", asignacionEvaluacionesController.listar);
  requestsRouter.get("/asignacionEvaluaciones/:key/:value", asignacionEvaluacionesController.buscar);
  requestsRouter.post("/asignacionEvaluaciones/insertar", asignacionEvaluacionesController.insertar);
  requestsRouter.post("/asignacionEvaluaciones/eliminar", asignacionEvaluacionesController.eliminar);
  requestsRouter.post("/asignacionEvaluaciones/actualizar", asignacionEvaluacionesController.actualizar);
  requestsRouter.post("/asignacionEvaluaciones/consultar", asignacionEvaluacionesController.consultar)

  //detalle Asignacion Evaluaciones
  requestsRouter.get("/detalleAsignacionEvaluaciones/listar/:value", detalleAsignacionEvaluacionesController.listar);
  requestsRouter.get("/detalleAsignacionEvaluaciones/:key/:value", detalleAsignacionEvaluacionesController.buscar);
  requestsRouter.post("/detalleAsignacionEvaluaciones/insertar", detalleAsignacionEvaluacionesController.insertar);
  requestsRouter.post("/detalleAsignacionEvaluaciones/eliminar", detalleAsignacionEvaluacionesController.eliminar);
  requestsRouter.post("/detalleAsignacionEvaluaciones/actualizar", detalleAsignacionEvaluacionesController.actualizar);
  requestsRouter.post("/detalleAsignacionEvaluaciones/consultar", detalleAsignacionEvaluacionesController.consultar)

  //interfaces
  requestsRouter.get("/interfaces/", interfacesController.buscar);


  //roles
  requestsRouter.get("/roles/listar/:value", rolesController.listar);
  requestsRouter.get("/roles/:key/:value", rolesController.buscar);
  requestsRouter.post("/roles/insertar", rolesController.insertar);
  requestsRouter.post("/roles/eliminar", rolesController.eliminar);
  requestsRouter.post("/roles/actualizar", rolesController.actualizar);
  requestsRouter.post("/roles/consultar", rolesController.consultar);
  
  // desempeño evaluaciones
  requestsRouter.get("/desepeno/listar/:value", desempenoController.listar);

  //estado Empresas
  // requestsRouter.get(
  //   "/estadoEmpresas/listar/:value",
  //   estadoEmpresasController.listar
  // );

  //request
  router.use("/", indexRouter);
  router.use("/", requestsRouter);

  return router;
};
