"use strict";

const Availability = require("../models/availabilityModel");
const formidable = require("formidable");
const fs = require("fs");

function getAvailability(req, res) {
  let availabilityId = req.params.availabilityId;
  Availability.findById(availabilityId, (err, availability) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!availability)
      return res.status(404).send({ message: `No se encuentra en la BD` });
    res.status(200).send({ availability });
  });
}

function getAvailabilities(req, res) {
  Availability.find({}, (err, availabilities) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!availabilities)
      return res.status(404).send({ message: `No se existen Marcas en la BD` });
    res.locals.title = "Lista de Marcas";

    res.status(200).send({ availabilities });
  });
}

function saveAvailability(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (err) return res.status(500).send({ message: err.message });

    let extension = files.image.name.split(".").pop();

    // Creamos un nuevo objeto Marca
    let availability = new Availability();
    // Y le asignamos las propiedades pasados por POST
    availability.availability = fields.availability;
    availability.extension = extension;
    // Salvamos la nueva Marca en la BD
    availability.save((err, availabilityStored) => {
      if (err)
        res.status(500).send({ message: `Error al guardar en la BD: ${err}` });
      let newFile = availability._id + "." + extension;
      fs.rename(
        files.image.path,
        "./frontend/src/assets/images/" + newFile,
        function(err) {
          if (err) throw err;
          console.log("renamed complete");
        }
      );
      console.log(availabilityStored);
      //res.locals.availability = availabilityStored
      res.status(200).send(availabilityStored);
    });
  });
}

function updateAvailability(req, res) {
  let availabilityId = req.params.availabilityId;
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (err) 
      return res.status(500).send({ message: err.message });

    // Buscamos  la Marca en la BD
    Availability.findById(availabilityId, (err, availability) => {
      // Si hay error devolvemos mensaje de error 
      if (err)
        return res
          .status(500)
          .send({ message: `Error en la petición: ${err}` });
      // Si no se encuentra en la base de datos
      if (!availability)
        return res.status(404).send({ message: `No se encuentra en la BD` });
      // Si lo encuentra le asignamos las propiedades pasados por POST
      // de los datos nuevos
      if (fields.availability) availability.availability = fields.availability;
      // Y tenemos que eliminar el fichero anterior y sustituirlo por el nuevo
      if (files.image.name) {
        // Capturamos el archivo anterior
        let oldFile = availabilityId + "." + availability.extension;
        // Le ponemos la nueva extensión
        availability.extension = files.image.name.split(".").pop();
        // Componemos el nombre del nuevo archivo de imagen
        let newFile = availabilityId + "." + availability.extension;
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
      availability.save((err, availabilityStored) => {
        // let extension = files.image.name.split(".").pop();
        if (err)
          return res
            .status(500)
            .send({ message: `Error al guardar en la BD: ${err}` });
        console.log(availabilityStored);
        res.status(200).send(availabilityStored);
      });
    });
  });
}

function deleteAvailability(req, res) {
  let availabilityId = req.params.availabilityId;
  Availability.findById(availabilityId, (err, availability) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!availability)
      return res.status(404).send({ message: `No se encuentra en la BD` });

    availability.remove(err => {
        if (err)
            throw err;
        else{
            console.log(`Elemento borrado: ${availability}`);                   

            // Borramos el archivo de imagen de la carpeta public
            let oldFile = availabilityId + "." + availability.extension;
            fs.unlink("./frontend/src/assets/images/" + oldFile, err => {
              if (err){
                console.error(err.stack);
                res.status(500).send('Something broke!');
              }else{
                console.log(`Imagen borrada`);
                res.send({ message: `Elemento borrado: ${availability}`, availability });
              }
            });
            
            
        }
    });
  });
}


module.exports = {
  getAvailability,
  getAvailabilities,
  saveAvailability,
  updateAvailability,
  deleteAvailability
};
