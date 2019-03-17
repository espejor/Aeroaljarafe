'use strict'

const Model = require('../models/modelModel')
const Brand = require('../models/brandModel')
const formidable = require("formidable")
const fs = require("fs")


function getModel(req,res){
    let modelId = req.params.modelId
    Model.findById(modelId).populate("brand").exec((err,model) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!model) return res.status(404).send({message: `No se encuentra en la BD`})
        // res.locals.title = "Ver modelo " + model.brand.brand + " " + model.model
        // res.locals.model = model
        // res.render("models/showModel",res.locals.model)
        Brand.populate(model,{path:"brand"},(err,model) =>{
            res.status(200).send({ model });
        })        
    })
}

function getModels(req,res){
    Model.find({}, (err,models) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!models) return res.status(404).send({message: `No se existen Modelos en la BD`})
        
        Brand.populate(models,{path:"brand"},(err,models) =>{
            res.status(200).send({ models });
        })

    })
}
function saveModel(req, res) {
    var form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, function(err, fields, files) {
      if (err) 
        return res.status(500).send({ message: err.message });
      let extension = files.image.name.split(".").pop();
  
      // Creamos un nuevo objeto Marca
      let model = new Model();
      // Y le asignamos las propiedades pasados por POST
      model.model = fields.model;
      model.extension = extension;
      model.brand = fields.brand;
      // Salvamos la nueva Marca en la BD
      model.save((err, modelStored) => {
        if (err)
          res.status(500).send({ message: `Error al guardar en la BD: ${err}` });
        let newFile = model._id + "." + extension;
        fs.rename(
          files.image.path,
          "./frontend/src/assets/images/" + newFile,
          function(err) {
            if (err) throw err;
            console.log("renamed complete");
          }
        );
        console.log(modelStored);
        //res.locals.model = modelStored
        res.status(200).send(modelStored);
      });
    });
  }





function updateModel(req,res){
    let modelId = req.params.modelId 
    var form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, function(err, fields, files) {
        if (err)
            res.status(500).send({message: err.message})

        // Buscamos  el Modelo en la BD
        Model.findById(modelId,(err,model) => {
            if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
            if (!model) return res.status(404).send({message: `No se encuentra en la BD`}) 
            // Y le asignamos las propiedades pasados por POST
            if (fields.model){ 
                model.model = fields.model
                model.brand = fields.brand
            }
            if (files.image.name){
                let oldFile = modelId + "." + model.extension
                model.extension = files.image.name.split(".").pop()    
                let newFile = modelId + "." + model.extension
                // borramos el archivo anterior 
                fs.unlink("public/images/" +  oldFile,(err) => {
                    
                    if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
                })
                // Movemos el nuevo archivo a la carpeta de imagenes        
                fs.rename(files.image.path,"public/images/" +  newFile,(err) => {
                    if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
                })
            }
            model.save()
            console.log(model)
            res.locals.model = model
            res.redirect("/api/models")
        })
    })
}


function deleteModel(req, res) {
    let modelId = req.params.modelId;
    Model.findById(modelId, (err, model) => {
      if (err)
        return res.status(500).send({ message: `Error en la petición: ${err}` });
      if (!model)
        return res.status(404).send({ message: `No se encuentra en la BD` });
  
      model.remove(err => {
          if (err)
              throw err;
          else{
              console.log(`Elemento borrado: ${model}`);                   
  
              // Borramos el archivo de imagen de la carpeta public
              let oldFile = modelId + "." + model.extension;
              fs.unlink("./frontend/src/assets/images/" + oldFile, err => {
                if (err){
                  console.error(err.stack);
                  res.status(500).send('Something broke!');
                }else{
                      console.log(`Imagen borrada`);
                      res.send({ message: `Elemento borrado: ${model}`, model });
                  }
              });
          }
      });
    });
  }

module.exports = {
    getModel,
    getModels,
    saveModel,
    updateModel,
    deleteModel
}

