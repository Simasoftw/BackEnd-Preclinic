const constants = require('../../constants');
const rolesModel = require('../../models/roles');
const uuidv1 = require('../../../node_modules/uuid/v1');
const mongo = require('mongodb');
const objModel = require('../../models/usuarios');

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
      let query = {"Empresa": new mongo.ObjectID(idEmpresa)};
     
      //find object
      let response = await rolesModel.find(query).sort('Nombre');

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
      let response = await rolesModel.find(query).sort('Nombre');

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        roles: response,
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

  insertar: async (objRol) => {
    try {

      let status, failure_code, failure_message;

      //find object
      let response = await rolesModel.insertMany([objRol]);

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
        roles: response,
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

  async actualizar(objRol) {
    try {
      const objFiltro = { _id: objRol._id };
  
      const response = await rolesModel.findOneAndUpdate(objFiltro, objRol, { new: true }); 
  
      // Set status
      const status = response ? constants.SUCCEEDED_MESSAGE : constants.NOT_FOUND_ERROR_MESSAGE;
  
      return {
        status: status,
        roles: response, 
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
  
  eliminar: async (objRol) => {
    try {
      let status, failure_code, failure_message;
  
      let objFiltro = { _id: objRol._id };
  
      let usuariosConRol = await objModel.find({ IdRol: objRol._id });
      

      if (usuariosConRol.length>0) {
        status = constants.SUCCEEDED_MESSAGE;
        return {
          status: status,
          roles: null,
          mensaje: 'No se puede eliminar el rol porque está asignado a uno o más usuarios.',
          failure_code: failure_code,
          failure_message: failure_message,
        };
      }
    
  
      let response = await rolesModel.findOneAndRemove(objFiltro);
  
      if (response) {
        status = constants.SUCCEEDED_MESSAGE;
      } else {
        status = constants.NOT_FOUND_ERROR_MESSAGE;
      }
  
      // Retornar respuesta
      return {
        status: status,
        roles: response ? [response] : [],
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

        // let query = { "Empresa": new mongo.ObjectID(findObject.IdEmpresa) };
        let query = {};
        if (findObject.search) {
          query =  { $or: [{ Codigo: { $regex: ".*" + findObject.search.replace(new RegExp(' ', 'g'), '.*'), $options: "i" } }, { Nombre: { $regex: ".*" + findObject.search.replace(new RegExp(' ', 'g'), '.*'), $options: "i" }}] } 

        }

        //find object
        let response = await rolesModel.aggregate(
            [
                // { $match: query }
                { $match: query}
                , { $sort:{ 'Nombre': 1 } }
            ]
        );
        
        // .find(query,{ $or: [ { quantity: { $lt: 20 } }, { price: 10 } ] } ).sort({ 'NombreCompleto': 1 }).skip(Number(findObject.start) > 0 ? Number(findObject.start) : 0).limit(Number(findObject.length));
         
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
