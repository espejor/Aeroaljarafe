'use strict'

const Model = require('../models/modelModel')
const Brand = require('../models/brandModel')
const formidable = require("formidable")
const fs = require("fs")
const buildOptions = require("../services/builtOptionsForSelectTag")


function getModel(req,res){
    let modelId = req.params.modelId
    Model.findById(modelId).populate("brand").exec((err,model) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!model) return res.status(404).send({message: `No se encuentra en la BD`})
        res.locals.title = "Ver modelo " + model.brand.brand + " " + model.model
        res.locals.model = model
        res.render("models/showModel",res.locals.model)
    })
}

function getModels(req,res){
    Model.find({}, (err,models) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!models) return res.status(404).send({message: `No se existen Modelos en la BD`})
        
        Brand.populate(models,{path:"brand"},(err,models) =>{
            res.locals.models = models
            res.locals.title = "Lista de modelos"
            res.render("models/models",res.locals.models)
        })

    })
}

function saveModel(req,res){
    var form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, function(err, fields, files) {

        let extension = files.image.name.split(".").pop()

        // Creamos un nuevo objeto Modelo
        let model = new Model()
        // Y le asignamos las propiedades pasados por POST
        model.model = fields.model
        model.brand = fields.brand
        model.extension = extension
        // Salvamos la nueva Modelo en la BD
        model.save((err,modelStored) => {
            if (err) 
                return res.status(500).send({message: `Error al guardar en la BD: ${err}`})
            let newFile = model._id + "." + extension
            fs.rename(files.image.path,"public/images/" +  newFile)
            console.log(modelStored)
            //res.locals.model = modelStored
            res.redirect("/api/models")
        })  
    })
}


function newModel(req,res){
    Brand.find({}, (err,brands) => {
        res.locals.brands = brands
        res.locals.title = "Nuevo Modelo"
        res.render("models/newModel",res.locals.brands)
    })
   
}

function editModel(req,res){
    let modelId = req.params.modelId
    Model.findById(modelId).populate({path:"brand"}).exec((err,model) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!model) return res.status(404).send({message: `No se encuentra en la BD`})

        res.locals.model = model     
        Brand.find({},(err,brands) => {
            res.locals.brands = buildOptions(builtListOfItems(brands,"brand"),model.brand.brand)
            res.render("models/editModel",res.locals)
        })
    })
}

function builtListOfItems (listOfObjects,fieldToList){
    let newArray = []
    listOfObjects.forEach(object => {
        newArray.push({_id: object._id,value: object[fieldToList]})
    });
    return newArray
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


function deleteModel(req,res){
    let modelId = req.params.modelId
    Model.findById(modelId,(err,model) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!model) return res.status(404).send({message: `No se encuentra en la BD`})

        model.remove(err => {
            if (err)  
                return res.status(500).send({message: `Error en la petición: ${err}`})
            // Borramos el archivo de imagen de la carpeta public
            let oldFile = modelId + "." + model.extension
            fs.unlink("public/images/" +  oldFile,(err) => {
                if (err)return res.status(500).send({message: `Error en la petición: ${err}`})
            })
            console.log(`Elemento borrado: ${model}`)
            res.redirect("/api/models")
        })    
    })
}

module.exports = {
    getModel,
    getModels,
    saveModel,
    updateModel,
    deleteModel,
    editModel,
    newModel
}

