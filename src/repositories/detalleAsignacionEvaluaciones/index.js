
const constants = require('../../constants');
const Model = require('../../models/detalleAsignacionEvaluaciones');
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
      // Construir query para IdEmpresa
      let query = { "IdEmpresa": idEmpresa };
  
      let response = await Model.aggregate([
        { $match: query },  
        {
          $lookup: {
            from: "resultadoevaluaciones",
            let: { localNumeroDocumento: "$NumeroDocumentoEmpleado", localIdAsignacion: { $toString: "$_id" } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$NumeroDocumentoEmpleado", "$$localNumeroDocumento"] },
                      { $eq: ["$IdAsignacion", "$$localIdAsignacion" ] }
                    ]
                  }
                }
              }
            ],
            as: "resultadoInfo"
          }
        },           
        {
          $unwind: {
            path: "$resultadoInfo",  
            preserveNullAndEmptyArrays: true  
          }
        },
        {
          $addFields: {
            promedioGeneralPorcentaje: {
              $ifNull: ["$resultadoInfo.promedioGeneralPorcentaje", null] 
            },
            createdAt: {
              $ifNull: ["$resultadoInfo.createdAt", null]  // Traer el campo createdAt de resultadoevaluaciones
            }
          }
        },
        { $sort: { Nombre: 1 } }  // Ordenar por Nombre
      ]);
  
      // Configurar los valores de respuesta
      let status = constants.SUCCEEDED_MESSAGE;
  
      // Retornar la respuesta
      return {
        status: status,
        datos: response,
        failure_code: null,
        failure_message: null,
      };
  
    } catch (error) {
      return {
        status: constants.INTERNAL_ERROR_MESSAGE,
        failure_code: error.code,
        failure_message: error.message,
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

  filter: async (filtros = {}) => {
    try {
      let query = { "IdEmpresa": filtros.IdEmpresa };
  
      if (filtros.CargoEmpleado) {
        query.CargoEmpleado = filtros.CargoEmpleado;
      }
      if (filtros.AreaServicioEmpleado) {
        query.AreaServicioEmpleado = filtros.AreaServicioEmpleado;
      }
      if ([false, true].includes(filtros.Estado)) {
        query.Estado = filtros.Estado;
      }

      if (filtros.IdLider) {
        query.IdLider = filtros.IdLider;
      } 

      if (filtros.NumeroDocumentoEmpleado) {
        query.NumeroDocumentoEmpleado = filtros.NumeroDocumentoEmpleado;
      } 
      
      
      // Ejecutamos la consulta  
      const response = await Model.aggregate([
        { $match: query },  
        {
          $lookup: {
            from: "resultadoevaluaciones",
            let: { localNumeroDocumento: "$NumeroDocumentoEmpleado", localIdAsignacion: { $toString: "$_id" } },
            pipeline: [
              {
                $match: {
                  $expr: {
                    $and: [
                      { $eq: ["$NumeroDocumentoEmpleado", "$$localNumeroDocumento"] },
                      { $eq: ["$IdAsignacion", "$$localIdAsignacion" ] }
                    ]
                  }
                }
              }
            ],
            as: "resultadoInfo"
          }
        },    
        {
          $unwind: {
            path: "$resultadoInfo",  
            preserveNullAndEmptyArrays: true  
          }
        },
        {
          $addFields: {
            promedioGeneralPorcentaje: {
              $ifNull: ["$resultadoInfo.promedioGeneralPorcentaje", null] 
            },
            createdAt: {
              $ifNull: ["$resultadoInfo.createdAt", null]  // Traer el campo createdAt de resultadoevaluaciones
            }
          }
        },
        { $sort: { Nombre: 1 } }  // Ordenar por Nombre
      ]);;
  
      // Configuramos los valores de retorno
      return {
        status: constants.SUCCEEDED_MESSAGE,
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

}; module.exports = repo;
