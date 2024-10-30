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

  // Aplica la validación JWT a todas las rutas debajo con authenticateJWT
  router.use('/interfaces', authenticateJWT);

  // FIN JWT
    

  //login
  requestsRouter.post("/login/insertar", loginController.insertar)

  //empresas
  requestsRouter.get("/empresas/:key/:value", empresasController.buscar);
  requestsRouter.post("/empresas/actualizar", empresasController.actualizar);
  requestsRouter.get("/empresas/consultar", empresasController.consultar);
  requestsRouter.post("/empresas/insertar", empresasController.insertar);
 
 

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
 

  //interfaces
  requestsRouter.get("/interfaces/", interfacesController.buscar);


  //roles
  requestsRouter.get("/roles/listar/:value", rolesController.listar);
  requestsRouter.get("/roles/:key/:value", rolesController.buscar);
  requestsRouter.post("/roles/insertar", rolesController.insertar);
  requestsRouter.post("/roles/eliminar", rolesController.eliminar);
  requestsRouter.post("/roles/actualizar", rolesController.actualizar);
  requestsRouter.post("/roles/consultar", rolesController.consultar);

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
