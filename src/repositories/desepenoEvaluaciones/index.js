
const constants = require('../../constants');
const Model = require('../../models/resultadoEvaluacion');
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
      let query = [
        {
          $match: { "IdEmpresa": idEmpresa }
        },
        {
          $addFields: {
            clasificacion: {
              $switch: {
                branches: [
                  {
                    case: { $gte: ["$promedioTotal", 100] },
                    then: "ALTO RENDIMIENTO - ALTO POTENCIAL"
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioTotal", 90] }, { $lt: ["$promedioTotal", 100] }] },
                    then: "RENDIMIENTO MODERADO - ALTO POTENCIAL"
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioTotal", 85] }, { $lt: ["$promedioTotal", 90] }] },
                    then: "ALTO RENDIMIENTO - POTENCIAL MODERADO"
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioTotal", 80] }, { $lt: ["$promedioTotal", 85] }] },
                    then: "BAJO RENDIMIENTO - ALTO POTENCIAL"
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioTotal", 75] }, { $lt: ["$promedioTotal", 80] }] },
                    then: "ALTO RENDIMIENTO - BAJO POTENCIAL"
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioTotal", 70] }, { $lt: ["$promedioTotal", 75] }] },
                    then: "RENDIMIENTO MODERADO - POTENCIAL MODERADO"
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioTotal", 60] }, { $lt: ["$promedioTotal", 70] }] },
                    then: "BAJO RENDIMIENTO - POTENCIAL MODERADO"
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioTotal", 55] }, { $lt: ["$promedioTotal", 60] }] },
                    then: "RENDIMIENTO MODERADO - BAJO POTENCIAL"
                  },
                  {
                    case: { $lt: ["$promedioTotal", 55] },
                    then: "BAJO RENDIMIENTO - BAJO POTENCIAL"
                  }
                ],
                default: "NO CLASIFICADO"
              }
            }
          }
        },
        {
          $group: {
            _id: "$clasificacion",
            documentos: { $push: "$$ROOT" }
          }
        }
      ];
      
     
      //find object
      let response = await Model.aggregate(query);

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

  listarPorId: async (objParameters) => {
    try {
      //find query

      // let query = {
      //   "IdEmpresa": new mongo.ObjectID(objParameters.value),
      //   "_id": new mongo.ObjectID(objParameters.key)
      // };


      let query = {
        'IdEmpresa': new mongo.ObjectID(objParameters.value),
        '_id': new mongo.ObjectID(objParameters.key)
      };

      console.log('query --->', query);
      // query = {};

      //let query = { "Codigo": "001" };

      //find object
      let response = await Model.find(query);



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
