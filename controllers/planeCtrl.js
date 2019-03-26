"use strict";

const Plane = require("../models/planeModel");
const formidable = require("formidable");
const fs = require("fs");
const formatDate = require("../services/formatDate");

function getPlane(req, res) {
  let planeId = req.params.planeId;
  Plane.findById(planeId)
    .populate({ path: "model", populate: { path: "brand" } })
    .exec((err, plane) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error en la petición: ${err}` });
      if (!plane)
        return res.status(404).send({ message: `No se encuentra en la BD` });
      plane.nextMaintenanceFormated = formatDate(
        plane.nextMaintenance,
        "DD/MM/YYYY"
      );
          res.status(200).send({ plane });
    });
}

function getPlanes(req, res) {
  Plane.find({})
    .populate({ path: "model", populate: { path: "brand" } })
    .exec((err, planes) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error en la petición: ${err}` });
      if (!planes || planes.length == 0)
        return res.status(404).send({ message: `No existen aviones en la BD` });
      res.status(200).send({ planes });
    });
}

function savePlane(req, res) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      if (err) return res.status(500).send({ message: err.message });
      let extension = files.image.name.split(".").pop();
  
      // Creamos un nuevo objeto Marca
      let plane = new Plane();
      // Y le asignamos las propiedades pasados por POST
      plane.plate = fields.plate;
      plane.extension = extension;
      plane.model = fields.model;
      // Salvamos la nueva Marca en la BD
      plane.save((err, planeStored) => {
        if (err)
          return res.status(500).send({ message: `Error al guardar en la BD: ${err.message}` });
        let newFile = plane._id + "." + extension;
        fs.rename(
          files.image.path,
          "./frontend/src/assets/images/" + newFile,
          function(err) {
            if (err) throw err;
            console.log("renamed complete");
          }
        );
        console.log(planeStored);
        //res.locals.plane = planeStored
        res.status(200).send(planeStored);
      });
    });
  }

  function updatePlane(req, res) {
    let planeId = req.params.planeId;
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      if (err) res.status(500).send({ message: err.message });
  
      // Buscamos  el Planeo en la BD
      Plane.findById(planeId, (err, plane) => {
        if (err)
          return res
            .status(500)
            .send({ message: `Error en la petición: ${err}` });
        if (!plane)
          return res.status(404).send({ message: `No se encuentra en la BD` });
        // Y le asignamos las propiedades pasados por POST
        if (fields.plate) {
          plane.plate = fields.plate;
        }
        if (fields.model) {
          plane.model = fields.model;
        }
        if (files.image) {
          let oldFile = planeId + "." + plane.extension;
          plane.extension = files.image.name.split(".").pop();
          let newFile = planeId + "." + plane.extension;
          // borramos el archivo anterior
          fs.unlink("./frontend/src/assets/images/" + oldFile, err => {
            if (err) {
              console.error(err.stack);
              res.status(500).send("Something broke!");
            }
          });
          // Movemos el nuevo archivo a la carpeta de imagenes
          fs.rename(
            files.image.path,
            "./frontend/src/assets/images/" + newFile,
            err => {
              if (err) throw err;
            }
          );
        }
        // Y guardamos los nuevos datos del registro en la BD
        plane.save((err, planeStored) => {
          if (err)
            return res
              .status(500)
              .send({ message: `Error al guardar en la BD: ${err}` });
          console.log(planeStored);
          res.status(200).send(planeStored);
        });
      });
    });
  }
  
  function deletePlane(req, res) {
    let planeId = req.params.planeId;
    Plane.findById(planeId, (err, plane) => {
      if (err)
        return res.status(500).send({ message: `Error en la petición: ${err}` });
      if (!plane)
        return res.status(404).send({ message: `No se encuentra en la BD` });
  
      plane.remove(err => {
        if (err) throw err;
        else {
          console.log(`Elemento borrado: ${plane}`);
  
          // Borramos el archivo de imagen de la carpeta public
          let oldFile = planeId + "." + plane.extension;
          fs.unlink("./frontend/src/assets/images/" + oldFile, err => {
            if (err) {
              console.error(err.stack);
              res.status(500).send("Something broke!");
            } else {
              console.log(`Imagen borrada`);
              res.send({ message: `Elemento borrado: ${plane}`, plane });
            }
          });
        }
      });
    });
  }
  

module.exports = {
  getPlane,
  getPlanes,
  savePlane,
  updatePlane,
  deletePlane,
};
