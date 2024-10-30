const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const rolesRepository = require('../../repositories/roles');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
  try {
      const objRol = req.body;

      // Enviar objeto a eliminar
      let response = await rolesRepository.eliminar(objRol);

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
          roles: response.roles
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
