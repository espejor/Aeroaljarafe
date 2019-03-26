"use strict";

const Brand = require("../models/brandModel");
const formidable = require("formidable");
const fs = require("fs");

function getBrand(req, res) {
  let brandId = req.params.brandId;
  Brand.findById(brandId, (err, brand) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!brand)
      return res.status(404).send({ message: `No se encuentra en la BD` });
    res.status(200).send({ brand });
  });
}

function getBrands(req, res) {
  Brand.find({}, (err, brands) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!brands)
      return res.status(404).send({ message: `No existen Marcas en la BD` });
    res.locals.title = "Lista de Marcas";

    res.status(200).send({ brands });
  });
}

function saveBrand(req, res) {
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (err) return res.status(500).send({ message: err.message });

    let extension = files.image.name.split(".").pop();

    // Creamos un nuevo objeto Marca
    let brand = new Brand();
    // Y le asignamos las propiedades pasados por POST
    brand.brand = fields.brand;
    brand.extension = extension;
    // Salvamos la nueva Marca en la BD
    brand.save((err, brandStored) => {
      if (err)
        return res.status(500).send({ message: `Error al guardar en la BD: ${err.message}` });
      let newFile = brand._id + "." + extension;
      fs.rename(
        files.image.path,
        "./frontend/src/assets/images/" + newFile,
        function(err) {
          if (err) throw err;
          console.log("renamed complete");
        }
      );
      console.log(brandStored);
      //res.locals.brand = brandStored
      res.status(200).send(brandStored);
    });
  });
}

function updateBrand(req, res) {
  let brandId = req.params.brandId;
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (err) 
      return res.status(500).send({ message: err.message });

    // Buscamos  la Marca en la BD
    Brand.findById(brandId, (err, brand) => {
      // Si hay error devolvemos mensaje de error 
      if (err)
        return res
          .status(500)
          .send({ message: `Error en la petición: ${err}` });
      // Si no se encuentra en la base de datos
      if (!brand)
        return res.status(404).send({ message: `No se encuentra en la BD` });
      // Si lo encuentra le asignamos las propiedades pasados por POST
      // de los datos nuevos
      if (fields.brand) brand.brand = fields.brand;
      // Y tenemos que eliminar el fichero anterior y sustituirlo por el nuevo
      if (files.image) {
        // Capturamos el archivo anterior
        let oldFile = brandId + "." + brand.extension;
        // Le ponemos la nueva extensión
        brand.extension = files.image.name.split(".").pop();
        // Componemos el nombre del nuevo archivo de imagen
        let newFile = brandId + "." + brand.extension;
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
      brand.save((err, brandStored) => {
        // let extension = files.image.name.split(".").pop();
        if (err)
          return res
            .status(500)
            .send({ message: `Error al guardar en la BD: ${err}` });
        console.log(brandStored);
        res.status(200).send(brandStored);
      });
    });
  });
}

function deleteBrand(req, res) {
  let brandId = req.params.brandId;
  Brand.findById(brandId, (err, brand) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!brand)
      return res.status(404).send({ message: `No se encuentra en la BD` });

    brand.remove(err => {
        if (err){
            console.error(err);
            res.status(500).send(err)
        }else{
            console.log(`Elemento borrado: ${brand}`);                   

            // Borramos el archivo de imagen de la carpeta public
            let oldFile = brandId + "." + brand.extension;
            fs.unlink("./frontend/src/assets/images/" + oldFile, err => {
              if (err){
                console.error(err.stack);
                res.status(500).send('Something broke!');
              }else{
                    console.log(`Imagen borrada`);
                    res.send({ message: `Elemento borrado: ${brand}`, brand });
                }
            });
            
            
        }
    });
  });
}


module.exports = {
  getBrand,
  getBrands,
  saveBrand,
  updateBrand,
  deleteBrand
};
