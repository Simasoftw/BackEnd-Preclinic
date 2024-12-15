const constants = require('../../constants'); 
const uuidv1 = require('../../../node_modules/uuid/v1');  
const fs = require('fs'); 
const objContenido = require('./archivos')
const path = require('path');

const v1options = {
  node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
  clockseq: 0x1234,
  msecs: new Date().getTime(),
  nsecs: 5678
};

uuidv1(v1options);

const repo = {

  crearMaestro: async (objData) => {
    try {
      
      
      //crear Controllers 
      const archivos = ['listar', 'actualizar','buscar','eliminar','consultar','insertar','index','find.schema']; 
      const carpeta = path.resolve(__dirname, '../../controllers/', objData.nombre);

      fs.mkdir(carpeta, { recursive: true }, (err) => {
        if (err) {
          return console.error(`Error al crear la carpeta: ${err.message}`);
        }
         
         // Generar el contenido del archivo con las variables

        for (const archivo of archivos) {
          // Crear el archivo .js con el contenido
          const contenido = archivo == "find.schema"? objContenido['findSchema'] : objContenido[archivo](objData.nombre); 

          fs.writeFile(carpeta+'/'+archivo+'.js', contenido, (err) => {
            if (err) {
              return console.error(`Error al crear el archivo: ${err.message}`);
            }
          });
        }  
      }); 

      //crear repositories
      const carpetaR = path.resolve(__dirname, '../', objData.nombre);
      fs.mkdir(carpetaR, { recursive: true }, (err) => {
        if (err) {
          return console.error(`Error al crear la carpeta: ${err.message}`);
        }
         
         // Generar el contenido del archivo con las variables 
        const contenido = objContenido.indexRepositori(objData.nombre);
        // Crear el archivo .js con el contenido
        fs.writeFile(carpetaR+'/index.js', contenido, (err) => {
          if (err) {
            return console.error(`Error al crear el archivo: ${err.message}`);
          } 
        }); 
      }); 

      //crear models 
      // Generar el contenido del archivo con las variables
      const contenido = objContenido.Model(objData.nombre,objData.model); 
      const ArchivoM = path.resolve(__dirname, '../../models/', objData.nombre);

      fs.writeFile(ArchivoM+'.js', contenido, (err) => {
        if (err) {
          return console.error(`Error al crear el archivo: ${err.message}`);
        }
      });  

      //set values
      let status, failure_code, failure_message;

      status = constants.SUCCEEDED_MESSAGE;

      //return response
      return {
        status: status,
        datos: `
          const ${objData.nombre}Controller = require("./controllers/${objData.nombre}");   

          requestsRouter.get("/${objData.nombre}/listar/:value", ${objData.nombre}Controller.listar);
          requestsRouter.get("/${objData.nombre}/:key/:value", ${objData.nombre}Controller.buscar);
          requestsRouter.post("/${objData.nombre}/insertar", ${objData.nombre}Controller.insertar);
          requestsRouter.post("/${objData.nombre}/eliminar", ${objData.nombre}Controller.eliminar);
          requestsRouter.post("/${objData.nombre}/actualizar", ${objData.nombre}Controller.actualizar);
          requestsRouter.post("/${objData.nombre}/consultar", ${objData.nombre}Controller.consultar)`,
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
  }
}; module.exports = repo;
