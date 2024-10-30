const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const repository = require('../../repositories/login');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
  try {

    var objData = req.body
    //find
    let response = await repository.listar(objData);

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

    let token = null;
    
    if(response.datos.length > 0) {
      token = jwt.sign({response}, "Stack", {
        expiresIn: "2m"
      });
      console.log(token);  // Para verificar que se generó el token correctamente
    } else {
      console.log('response.datos está vacío o no existe');
    }

    console.log("token2", token)

    // Response Object
    let oResponse = {
      token: token,
      datos: response.datos,
      Error: false,
      Mensaje: "OK"
    }

    // return response
    if (statusCode !== 200) {
      oResponse.status = response.status;
      oResponse.code = response.failure_code;
      oResponse.Error = true;
      oResponse.Mensaje = response.failure_message;
    }

    res.status(statusCode).send(oResponse);

  } 
  catch (error) {
    next(error);
  }
}

module.exports = [validate, handler];
