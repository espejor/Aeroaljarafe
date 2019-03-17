"use strict";

const Status = require("../models/statusModel");
const formidable = require("formidable");
const fs = require("fs");

function getStatus(req, res) {
  let statusId = req.params.statusId;
  Status.findById(statusId, (err, status) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!status)
      return res.status(404).send({ message: `No se encuentra en la BD` });
    res.status(200).send({ status });
  });
}

function getStatuss(req, res) {
  Status.find({}, (err, statuss) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!statuss)
      return res.status(404).send({ message: `No se existen Marcas en la BD` });
    res.locals.title = "Lista de Marcas";

    res.status(200).send({ statuss });
  });
}

function saveStatus(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (err) return res.status(500).send({ message: err.message });

    let extension = files.image.name.split(".").pop();

    // Creamos un nuevo objeto Marca
    let status = new Status();
    // Y le asignamos las propiedades pasados por POST
    status.status = fields.status;
    status.extension = extension;
    // Salvamos la nueva Marca en la BD
    status.save((err, statusStored) => {
      if (err)
        res.status(500).send({ message: `Error al guardar en la BD: ${err}` });
      let newFile = status._id + "." + extension;
      fs.rename(
        files.image.path,
        "./frontend/src/assets/images/" + newFile,
        function(err) {
          if (err) throw err;
          console.log("renamed complete");
        }
      );
      console.log(statusStored);
      //res.locals.status = statusStored
      res.status(200).send(statusStored);
    });
  });
}

function updateStatus(req, res) {
  let statusId = req.params.statusId;
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (err) 
      return res.status(500).send({ message: err.message });

    // Buscamos  la Marca en la BD
    Status.findById(statusId, (err, status) => {
      // Si hay error devolvemos mensaje de error 
      if (err)
        return res
          .status(500)
          .send({ message: `Error en la petición: ${err}` });
      // Si no se encuentra en la base de datos
      if (!status)
        return res.status(404).send({ message: `No se encuentra en la BD` });
      // Si lo encuentra le asignamos las propiedades pasados por POST
      // de los datos nuevos
      if (fields.status) status.status = fields.status;
      // Y tenemos que eliminar el fichero anterior y sustituirlo por el nuevo
      if (files.image.name) {
        // Capturamos el archivo anterior
        let oldFile = statusId + "." + status.extension;
        // Le ponemos la nueva extensión
        status.extension = files.image.name.split(".").pop();
        // Componemos el nombre del nuevo archivo de imagen
        let newFile = statusId + "." + status.extension;
        // borramos el archivo de imagen anterior
        fs.unlink("./frontend/src/assets/images/" + oldFile, err => {
          if (err){
            console.error(err.stack);
            res.status(500).send('Something broke!');
          }
        });
        // Movemos el nuevo archivo a la carpeta de imagenes
        fs.rename(
          files.image.path,
          "./frontend/src/assets/images/" + newFile,
          err => {
            if (err)
              throw err;
          }
        );
      }
      // Y guardamos los nuevos datos del registro en la BD
      status.save((err, statusStored) => {
        // let extension = files.image.name.split(".").pop();
        if (err)
          return res
            .status(500)
            .send({ message: `Error al guardar en la BD: ${err}` });
        console.log(statusStored);
        res.status(200).send(statusStored);
      });
    });
  });
}

function deleteStatus(req, res) {
  let statusId = req.params.statusId;
  Status.findById(statusId, (err, status) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!status)
      return res.status(404).send({ message: `No se encuentra en la BD` });

    status.remove(err => {
        if (err)
            throw err;
        else{
            console.log(`Elemento borrado: ${status}`);                   

            // Borramos el archivo de imagen de la carpeta public
            let oldFile = statusId + "." + status.extension;
            fs.unlink("./frontend/src/assets/images/" + oldFile, err => {
              if (err){
                console.error(err.stack);
                res.status(500).send('Something broke!');
              }else{
                    console.log(`Imagen borrada`);
                    res.send({ message: `Elemento borrado: ${status}`, status });
                }
            });
            
            
        }
    });
  });
}


module.exports = {
  getStatus,
  getStatuss,
  saveStatus,
  updateStatus,
  deleteStatus
};
