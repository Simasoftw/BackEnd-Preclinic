
const constants = require('../../constants');
const Model = require('../../models/asignacionEvaluaciones');
const ModelDetalle = require('../../models/detalleAsignacionEvaluaciones');
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
      let query = {"IdEmpresa": idEmpresa};
     
      
      //find object
      let response = await Model.find(query).sort('Titulo');

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

      var dt = new Date();
      var fechaActual = `${(dt.getMonth() + 1).toString().padStart(2, "0")}/${dt
        .getDate()
        .toString()
        .padStart(2, "0")}/${dt.getFullYear().toString().padStart(4, "0")} ${dt
        .getHours()
        .toString()
        .padStart(2, "0")}:${dt.getMinutes().toString().padStart(2, "0")}:${dt
        .getSeconds()
        .toString()
        .padStart(3, "0")}Z`; 
        
      //find object
      let response = await Model.insertMany([{
        NombreEvaluacion: objData.Evaluacion.label,
        IdEvaluacion: objData.Evaluacion.value,
        IdLider: objData.Lider.value,
        NombreLider: objData.Lider.label,
        IdEmpresa: objData.IdEmpresa,
        TotalColaboradores: objData.ArrayEmpleados?.length,
        createdAt: fechaActual
      }]);
      
      if (response.length > 0) {
        let arrayDetalle = [];
        for (const element of objData.ArrayEmpleados) {
          let objDetalle = {};
          objDetalle.NombreEvaluacion = objData.Evaluacion.label;
          objDetalle.IdAsignacion = response[0]._id;
          objDetalle.IdEvaluacion = objData.Evaluacion.value;
          objDetalle.IdLider = objData.Lider.value;
          objDetalle.NombreLider = objData.Lider.label;
          objDetalle.NumeroDocumentoEmpleado = element.Identificacion;
          objDetalle.CargoEmpleado = element.Cargo;
          objDetalle.AreaServicioEmpleado = element.AreaServicio; 
          objDetalle.NombreEmpleado = element.label;
          objDetalle.IdEmpleado = element.value;
          objDetalle.IdEmpresa = objData.IdEmpresa;
          objDetalle.NombreUsuarioLogin = objData.usuario.NombreCompleto;
          objDetalle.IdUsuarioLogin = objData.usuario._id;
          objDetalle.createdAt = fechaActual;
          objDetalle.Estado = false
          arrayDetalle.push(objDetalle)
        }
        await ModelDetalle.insertMany(arrayDetalle)
      }

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
