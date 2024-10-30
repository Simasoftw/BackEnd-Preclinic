const express = require('express');
const router = express.Router();
const objModel = require("../../models/login");
const constants = require('../../constants');
const { object } = require('joi');

const resp = {

    listar: async (Object) => {
        try {

          let query = {
            "username": Object.username,
            "password": Object.password
          }
          
          let response = await objModel.find(query);
          
          console.log("Object",response)
            let status, failure_code, failure_message;
            status = constants.SUCCEEDED_MESSAGE;

            return {
                status: 200,
                datos: response,
                failure_code: failure_code,
                failure_message: failure_message
            }
        }
        catch {

        }
    },

    insertar: async (objData) => {
        try {
          let status, failure_code, failure_message;
          console.log(objData);
          //find object
          let response = await objModel.insertMany(objData);
    
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
}

module.exports = resp;