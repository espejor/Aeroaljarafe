'use strict'

const Plane = require('../models/planeModel')
const Model = require('../models/modelModel')
const Brand = require('../models/brandModel')

function getPlane(req,res){
    let planeId = req.params.planeId
    Plane.findById(planeId,(err,plane) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!plane) return res.status(404).send({message: `No se encuentra en la BD`})

        res.status(200).send({plane})
    })
}


function getPlanes(req,res){
    Plane.find({}).populate({path:"model",populate:{path:"brand"}}).exec((err,planes) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!planes) return res.status(404).send({message: `No se existen aviones en la BD`})
                
        // Model.populate(planes,{path:"model"},(err,planes) =>{
        //     Brand.populate(planes,{path:"model.brand"},(err,planes) => {
                res.locals.planes = planes
                res.render("planes",res.locals.planes)                
        //     })
        // })
    })
}

function savePlane(req,res){
    console.log('POST /api/plane')
    console.log(req.body)

    // Creamos un nuevo objeto Avión
    let plane = new Plane()
    // Y le asignamos las propiedades pasados por POST
    plane.brand = req.body.brand
    plane.model = req.body.model
    plane.plate = req.body.plate
    plane.picture = req.body.picture
    plane.status = req.body.status
    plane.hours = req.body.hours

    // Salvamos el nuevo Avión en la BD
    plane.save((err,planeStored) => {
        if (err) res.status(500).send({message: `Error al guardar en la BD: ${err}`})
        res.status(200).send({plane: planeStored})
    }) 
}

function updatePlane(req,res){
    let planeId = req.params.planeId
    let update = req.body

    Plane.findByIdAndUpdate(planeId,update,(err,planeUpdated) => {
        if (err) return res.status(500).send({message: `Error en la petición de actualización: ${err}`})
        
        res.status(200).send({plane:planeUpdated})
    })
}

function deletePlane(req,res){
    let planeId = req.params.planeId
    Plane.findById(planeId,(err,plane) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!plane) return res.status(404).send({message: `No se encuentra en la BD`})

        plane.remove(err => {
            if (err)  return res.status(500).send({message: `Error en la petición: ${err}`})
            res.status(200).send({message: `Elemento borrado: ${plane}`})
        })    
    })
}

module.exports = {
    getPlane,
    getPlanes,
    savePlane,
    updatePlane,
    deletePlane,
}

