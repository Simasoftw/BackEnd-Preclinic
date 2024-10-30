const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const rolesRepository = require('../../repositories/roles');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
  try {
    const objRol = req.body;

    // Call the update function
    const response = await rolesRepository.actualizar(objRol);

    // Set status code
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

    // Prepare the response object
    const oResponse = {
      roles: response.roles,
      status: response.status,
      error: response.status !== constants.SUCCEEDED_MESSAGE ? {
        code: response.failure_code,
        message: response.failure_message,
      } : undefined,
    };

    // Send the response
    res.status(statusCode).send(oResponse);

  } catch (error) {
    next(error);
  }
}


module.exports = [validate, handler];
