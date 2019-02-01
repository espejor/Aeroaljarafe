'use strict'

const Model = require('../models/modelModel')
const Brand = require('../models/brandModel')


function getModel(req,res){
    let modelId = req.params.modelId
    Model.findById(modelId,(err,model) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!model) return res.status(404).send({message: `No se encuentra en la BD`})

        res.status(200).send({model})
    })
}

function getModels(req,res){
    Model.find({}, (err,models) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!models) return res.status(404).send({message: `No se existen Modelos en la BD`})
        
        Brand.populate(models,{path:"brand"},(err,models) =>{
            res.locals.models = models
            res.render("model",res.locals.models)
        })

    })
}

function saveModel(req,res){
    console.log('POST /api/model')
    console.log(req.body)

    // Creamos un nuevo objeto Marca
    let model = new Model()
    // Y le asignamos las propiedades pasados por POST
    model.model = req.body.model
    model.brand = req.body.brand
    // Salvamos la nueva Marca en la BD
    model.save((err,modelStored) => {
        if (err) res.status(500).send({message: `Error al guardar en la BD: ${err}`})
        res.status(200).send({model: modelStored})
    }) 
}

function updateModel(req,res){
    let modelId = req.params.modelId
    let update = req.body

    Model.findByIdAndUpdate(modelId,update,(err,modelUpdated) => {
        if (err) return res.status(500).send({message: `Error en la petición de actualización: ${err}`})
        
        res.status(200).send({model:modelUpdated})
    })
}

function deleteModel(req,res){
    let modelId = req.params.modelId
    Model.findById(modelId,(err,model) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!model) return res.status(404).send({message: `No se encuentra en la BD`})

        model.remove(err => {
            if (err)  return res.status(500).send({message: `Error en la petición: ${err}`})
            res.status(200).send({message: `Elemento borrado: ${model}`})
        })    
    })
}

module.exports = {
    getModel,
    getModels,
    saveModel,
    updateModel,
    deleteModel,
}

