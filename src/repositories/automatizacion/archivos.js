// Plantilla 3
const index = () => `
const listar = require('./listar');
const buscar = require('./buscar');
const insertar = require('./insertar');
const actualizar = require('./actualizar');
const eliminar = require('./eliminar');
const consultar = require('./consultar')

module.exports = {
  listar,
  buscar,
  insertar,
  actualizar,
  eliminar,
  consultar
}`;

// Plantilla 1
const listar = (nombreArchivo) => `
const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const repository = require('../../repositories/${nombreArchivo}');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
  try {

    //find
    let response = await repository.listar(req.params.value);

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

module.exports = [validate, handler];
`;

// Plantilla 2
const actualizar = (nombreArchivo) => `
const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const Repository = require('../../repositories/${nombreArchivo}');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
  try {
    const objData = req.body;

    // Call the update function
    const response = await Repository.actualizar(objData);

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
      datos: response.datos,
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
`;

// Plantilla 3
const consultar = (nombreArchivo) => `
const repository = require('../../repositories/${nombreArchivo}');
const constants = require('../../constants');

async function handler(req, res, next) {
    try {

        let findObject = {
            search: req.body.search
            , IdEmpresa: req.body.IdEmpresa
        };

        let response = await repository.consultar({ findObject });

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
`;

// Plantilla 3
const eliminar = (nombreArchivo) => `
const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const Repository = require('../../repositories/${nombreArchivo}');
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
`;
// Plantilla 3
const insertar = (nombreArchivo) => `
const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const Repository = require('../../repositories/${nombreArchivo}');
const constants = require('../../constants');

const validate = inputValidation.validate(schema);

async function handler(req, res, next) {
  try { 

    //find
    let response = await Repository.insertar(req.body);

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

`;

// Plantilla 3
const buscar = (nombreArchivo) => `
const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./find.schema');
const Repository = require('../../repositories/${nombreArchivo}');
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
`;

// Plantilla 3
const indexRepositori = (nombreArchivo) => `
const constants = require('../../constants');
const Model = require('../../models/${nombreArchivo}');
const uuidv1 = require('../../../node_modules/uuid/v1');
const mongo = require('mongodb'); 

const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date().getTime(),
  nsecs: 5678
};

uuidv1(v1options);

const repo = {

  listar: async (idEmpresa) => {
    try {
      //find query
      let query = {"IdEmpresa": new mongo.ObjectID(idEmpresa)};
     
      //find object
      let response = await Model.find(query).sort('Nombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  buscar: async ({ findObject }) => {
    try {
      //find query
      let query = {};
      query[findObject.key] = findObject.value;

      //find object
      let response = await Model.find(query).sort('Nombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  insertar: async (objData) => {
    try {

      let status, failure_code, failure_message;

      //find object
      let response = await Model.insertMany([objData]);

      //set values
      if (response != null && response.length > 0) {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      } else {
        //Set status
        status = constants.SUCCEEDED_MESSAGE;
      }

      //return response
      return {
        status: status,
        datos: response,
        failure_code: failure_code,
        failure_message: failure_message,
      };

    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },

  async actualizar(objData) {
    try {
      const objFiltro = { _id: objData._id };
  
      const response = await Model.findOneAndUpdate(objFiltro, objData, { new: true }); 
  
      // Set status
      const status = response ? constants.SUCCEEDED_MESSAGE : constants.NOT_FOUND_ERROR_MESSAGE;
  
      return {
        status: status,
        datos: response, 
        failure_code: null,
        failure_message: null,
      };
  
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },
  
  eliminar: async (objData) => {
    try {
      let status, failure_code, failure_message;
  
      let objFiltro = { _id: objData._id }; 
  
      let response = await Model.findOneAndRemove(objFiltro);
  
      if (response) {
        status = constants.SUCCEEDED_MESSAGE;
      } else {
        status = constants.NOT_FOUND_ERROR_MESSAGE;
      }
  
      // Retornar respuesta
      return {
        status: status,
        datos: response ? [response] : [],
        failure_code: failure_code,
        failure_message: failure_message,
      };
  
    } catch (e2) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: e2.code,
        failure_message: e2.message,
      };
    }
  },


  consultar: async ({ findObject }) => {
    try {

        //find query

        let queryEmpresa = { "IdEmpresa": new mongo.ObjectID(findObject.IdEmpresa) };
        let query = {};
        if (findObject.search) {
          query =  { $or: [
            { Codigo: { $regex: ".*" + findObject.search.replace(new RegExp(' ', 'g'), '.*'), $options: "i" } }, 
            { Nombre: { $regex: ".*" + findObject.search.replace(new RegExp(' ', 'g'), '.*'), $options: "i" }}
           ] 
          } 

        }

        //find object
        let response = await Model.aggregate(
            [
                { $match: queryEmpresa }
                , { $match: query}
                , { $sort:{ 'Nombre': 1 } }
            ]
        ); 


        //set values
        let status, failure_code, failure_message;

        status = constants.SUCCEEDED_MESSAGE;

        //return response
        return {
          status: status,
          datos: response,
          failure_code: failure_code,
          failure_message: failure_message,
        };

    } catch (e2) {
        return {
            status: constants.INTERNAL_ERROR_MESSAGE,
            failure_code: e2.code,
            failure_message: e2.message
        };
    }
  },

}; module.exports = repo;
`;
 
const Model = (nombreArchivo, ObjModel) => `
const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = schema(${ObjModel})
    

const ${nombreArchivo} = mongoose.model('${nombreArchivo}', Schema);
module.exports = ${nombreArchivo};`;


const findSchema =   `const joi = require('joi');

const schema = {
}

module.exports = schema;
;`;
// Exportar las plantillas
module.exports = {
  actualizar,
  insertar,
  index,
  buscar,
  consultar,
  eliminar,
  listar,
  indexRepositori,
  Model,
  findSchema
};
