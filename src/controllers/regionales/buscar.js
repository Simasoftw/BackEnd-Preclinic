
const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const Repository = require('../../repositories/regionales');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
  try {

    let findObject = {
      key: req.params.key,
      value: req.params.value
    }

    //find
    let response = await Repository.buscar({ findObject });

    //set status code
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
    //Response Object
    let oResponse = {
      datos: response.datos,
      Error: false,
      Mensaje: "OK"
    }

    //return response
    if (statusCode !== 200) {
      oResponse.status = response.status;
      oResponse.error = {
        code: response.failure_code,
        message: response.failure_message
      }
    }

    res.status(statusCode).send(oResponse);

  } catch (error) {
    next(error);
  }
}

module.exports = [validate, handler];
