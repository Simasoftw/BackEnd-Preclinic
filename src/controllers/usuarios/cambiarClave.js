const repository = require('../../repositories/usuarios');
const constants = require('../../constants');

async function handler(req, res, next) {
    try { 
        
        let response = await repository.cambiarClave(req.body);

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
        oResponse.code = response.failure_code;
        oResponse.Error = true;
        oResponse.Mensaje = response.failure_message;
      }
  

        res.status(statusCode).send(oResponse);

    } catch (error) {
        next(error);
    }
}

module.exports = handler;
