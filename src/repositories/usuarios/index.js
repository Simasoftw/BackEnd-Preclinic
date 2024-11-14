const constants = require('../../constants');
const objModel = require('../../models/usuarios');
const objModelKey = require('../../models/clavesTemporales');
const mongo = require('mongodb');
const nodemailer = require('nodemailer');
const requests = require("request");
const jwt = require('jsonwebtoken');

const repo = {

  listar: async (objData) => {
    try {
      //find query
      let query = { "IdEmpresa": new mongo.ObjectID(objData.IdEmpresa) };

      //find object
      let response = await objModel.find(query).skip(objData.page * objData.rowsPerPage).limit(objData.rowsPerPage).sort('PrimerNombre');
      let totalRegistros = await objModel.count(query);
      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        totalRegistros: totalRegistros,
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

  validarCelular: async (Celular) => {
    try {
      //find query
      let query = { "Celular": Number(Celular) };

      //find object
      let response = await objModel.find(query).sort('PrimerNombre');

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
      let response = await objModel.find(query).populate('Empresa').sort('PrimerNombre');

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
      let response = await objModel.insertMany([objData]);

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

  actualizar: async (objData) => {
    try {

      let status, failure_code, failure_message;

      let objFiltro = { _id: objData._id };

      //find object
      response = await objModel.findOneAndUpdate(objFiltro, objData, { new: true }) // { new: true } para que retorne la data actualizada 

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

  eliminar: async (objdata) => {
    try {

      let status, failure_code, failure_message;

      let objFiltro = { _id: objdata._id };

      //find object
      let response = await objModel.findOneAndRemove(objFiltro, objdata);

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
 

  validarIngreso: async (findObject) => {
    try {

      let mensaje = "";
      let query = new Object({
        Usuario: findObject.Login
      });
      let status, failure_code, failure_message;

      //find object
      let response = await objModel.find(query, {
        _id: 1,
        Empresa: 1,
        Rol: 1,
        PrimerNombre: 1,
        SegundoNombre: 1,
        PrimerApellido: 1,
        SegundoApellido: 1,
        Cargo: 1,
        NombreCompleto: 1,
        Email: 1,
        Identificacion: 1,
        Departamento: 1,
        Dv: 1,
        CodigoTipoIdentificacion: 1,
        RolEvaluacion: 1,
        IdRolEvaluacion: 1,
        IdLider: 1,
      }).populate('IdRol');

      let token = null; 
      
      if (response.length > 0) {

        // const validPassword = await bcrypt.compare(findObject.Clave, response[0].Clave);
        const validPassword  = true

        if (!validPassword) {
          mensaje = "Password incorrecto"
          token = null;
          status = constants.NOT_FOUND_ERROR_MESSAGE
        } else {
          mensaje = "Usuario validado"
          token = jwt.sign({
            name: findObject.Login,
            id: response[0]._id,
            exp: Date.now() + 60 * 1000 * 60 * 6
          }, constants.TOKEN_SECRET)
          status = constants.SUCCEEDED_MESSAGE;
        }
      } else {
        mensaje = "Usuario no encontrado"
        token = null;
        status = constants.NOT_FOUND_ERROR_MESSAGE
      }

      //return response
      return {
        status: status,
        mensaje: mensaje,
        datos: response,
        token: token,
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



  listarPacientePorId: async (objParameters) => {
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
      let response = await objModel.find(query);



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

  consultar: async (findObject) => {
    try {

      //find query

      let queryEmpresa = { "IdEmpresa": new mongo.ObjectID(findObject.IdEmpresa) };
      let query = {};
      if (findObject.search) {
        query = {
          $or: [{ NombreCompleto: { $regex: ".*" + findObject.search.replace(new RegExp(' ', 'g'), '.*'), $options: "i" } },
          { Identificacion: { $regex: ".*" + findObject.search.replace(new RegExp(' ', 'g'), '.*'), $options: "i" } }]
        }

      }

      //find object
      let response = await objModel.aggregate(
        [
          { $match: queryEmpresa },
          { $match: query }
          , { $sort: { 'NombreCompleto': 1 } }
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
