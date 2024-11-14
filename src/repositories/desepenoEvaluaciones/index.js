
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
                    case: { $gte: ["$promedioGeneralPorcentaje", 100] },
                    then: {nombre : "ALTO RENDIMIENTO - ALTO POTENCIAL", rango: "100%"}
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioGeneralPorcentaje", 90] }, { $lt: ["$promedioGeneralPorcentaje", 100] }] },
                    then: {nombre : "RENDIMIENTO MODERADO - ALTO POTENCIAL", rango: "90%"}
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioGeneralPorcentaje", 85] }, { $lt: ["$promedioGeneralPorcentaje", 90] }] },
                    then: {nombre: "ALTO RENDIMIENTO - POTENCIAL MODERADO", rango: "85%"}
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioGeneralPorcentaje", 80] }, { $lt: ["$promedioGeneralPorcentaje", 85] }] },
                    then: {nombre :"BAJO RENDIMIENTO - ALTO POTENCIAL", rango: "80%"}
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioGeneralPorcentaje", 75] }, { $lt: ["$promedioGeneralPorcentaje", 80] }] },
                    then: {nombre: "ALTO RENDIMIENTO - BAJO POTENCIAL", rango: "75%"}
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioGeneralPorcentaje", 70] }, { $lt: ["$promedioGeneralPorcentaje", 75] }] },
                    then: {nombre: "RENDIMIENTO MODERADO - POTENCIAL MODERADO", rango: "70%"}
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioGeneralPorcentaje", 60] }, { $lt: ["$promedioGeneralPorcentaje", 70] }] },
                    then: {nombre: "BAJO RENDIMIENTO - POTENCIAL MODERADO", rango: "60%"}
                  },
                  {
                    case: { $and: [{ $gte: ["$promedioGeneralPorcentaje", 55] }, { $lt: ["$promedioGeneralPorcentaje", 60] }] },
                    then: {nombre : "RENDIMIENTO MODERADO - BAJO POTENCIAL", rango: "55%"}
                  },
                  {
                    case: { $lt: ["$promedioGeneralPorcentaje", 55] },
                    then: {nombre:"BAJO RENDIMIENTO - BAJO POTENCIAL", rango: "<55%"}
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
      let query = findObject.value;
      let key = findObject.key;
      // query[findObject.key] = findObject.value;
      //find object
      let response = await objModel.find({
        $or: [
          { [key]: { $regex: query, $options: 'i' } }, // Búsqueda dinámica por clave
          { Referencia: { $regex: query, $options: 'i' } },
          { Descripcion: { $regex: query, $options: 'i' } } // Búsqueda por el campo PrimerNombre
        ]
      }).populate('Empresa');
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
