
const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const Repository = require('../../repositories/formularios_evaluciones');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
  try {
      const objData = req.body;
 
      let response = await Repository.eliminar(objData);

      // Establecer código de estado HTTP
      let statusCode;
      switch (response.status) {
          case constants.NOT_FOUND_ERROR_MESSAGE:
              statusCode = 404;
              break;
          case constants.INTERNAL_ERROR_MESSAGE:
              statusCode = 500;
              break;
          default:
              statusCode = 200;
      }

      // Preparar objeto de respuesta
      let oResponse = {
          datos: response.datos,
          Error: false,
          Mensaje: "OK"
      };

      // Agregar detalles de error si no es estado 200
      if (statusCode !== 200) {
          oResponse.status = response.status;
          oResponse.error = {
              code: response.failure_code,
              message: response.failure_message
          };
      }

      // Enviar respuesta
      res.status(statusCode).send(oResponse);

  } catch (error) {
      next(error);
  }
}

module.exports = [validate, handler];
