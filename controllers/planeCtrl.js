'use strict'

const Plane = require('../models/planeModel')
const Model = require('../models/modelModel')
const Brand = require('../models/brandModel')
const formidable = require("formidable")
const fs = require("fs")
const formatDate = require("../services/formatDate")
const buildOptions = require("../services/builtOptionsForSelectTag")


function getPlane(req,res){
    let planeId = req.params.planeId
    Plane.findById(planeId).populate({path:"model",populate:{path:"brand"}}).exec((err,plane) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!plane) return res.status(404).send({message: `No se encuentra en la BD`})
        
        plane.nextMaintenanceFormated = formatDate(plane.nextMaintenance,"DD/MM/YYYY")
        res.locals.title = "Ver aeronave: " + plane.plate
        res.locals.plane = plane
        res.render("planes/showPlane",res.locals.plane)
    })
}


function getPlanes(req,res){
    Plane.find({}).populate({path:"model",populate:{path:"brand"}}).exec((err,planes) => {
        if (err) 
            return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!planes) 
            return res.status(404).send({message: `No se existen aviones en la BD`})
        res.locals.planes = planes
        res.locals.title = "Lista de aeronaves"
        res.render("planes/planes",res.locals.planes)                
    })
}

function savePlane(req,res){
    var form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, function(err, fields, files) {

        let extension = files.image.name.split(".").pop()

        // Creamos un nuevo objeto Planeo
        let plane = new Plane()
        // Y le asignamos las propiedades pasados por POST
        plane.plate = fields.plate
        plane.model = fields.model
        plane.extension = extension
        plane.status = fields.status
        plane.availability = fields.availability
        plane.nextMaintenance = fields.nextMaintenance
        plane.hours = fields.hours
        // Salvamos la nueva Planeo en la BD
        plane.save((err,planeStored) => {
            if (err) 
                return res.status(500).send({message: `Error al guardar en la BD: ${err}`})
            let newFile = plane._id + "." + extension
            fs.rename(files.image.path,"public/images/" +  newFile)
            console.log(planeStored)
            //res.locals.plane = planeStored
            res.redirect("/api/planes")
        })  
    })
}

function updatePlane(req,res){
    let planeId = req.params.planeId
    var form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, function(err, fields, files) {
        if (err)
            res.status(500).send({message: err.message})

        // Buscamos  el Modelo en la BD
        Plane.findById(planeId,(err,plane) => {
            if (err) return res.status(500).send({message: `Error en la petición de actualización: ${err}`})
            if (!plane) return res.status(404).send({message: `No se encuentra en la BD`}) 
            // Y le asignamos las propiedades pasados por POST
            if (fields){ 
                plane.plate = fields.plate
                plane.model = fields.model
                plane.status = fields.status
                plane.availability = fields.availabilityHidden
                plane.nextMaintenance = new Date(fields.nextMaintenance)
                plane.hours = fields.hours    
            }
            if (files.image.name){
                let oldFile = planeId + "." + plane.extension
                plane.extension = files.image.name.split(".").pop()    
                let newFile = planeId + "." + plane.extension
                // borramos el archivo anterior 
                fs.unlink("public/images/" +  oldFile,(err) => {
                    if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
                })
                // Movemos el nuevo archivo a la carpeta de imagenes        
                fs.rename(files.image.path,"public/images/" +  newFile,(err) => {
                    if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
                })
            }
            // Salvamos el nuevo Plane en la BD
            plane.save((err,planeStored) => {
                if (err) 
                    return res.status(500).send({message: `Error al guardar en la BD: ${err}`})
                console.log(planeStored)
                res.locals.plane = planeStored
                res.redirect("/api/planes")
            })          
        })
    })
}

function deletePlane(req,res){
    let planeId = req.params.planeId
    Plane.findById(planeId,(err,plane) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!plane) return res.status(404).send({message: `No se encuentra en la BD`})

        plane.remove(err => {
            if (err)  
                return res.status(500).send({message: `Error en la petición: ${err}`})
            // Borramos el archivo de imagen de la carpeta public
            let oldFile = planeId + "." + plane.extension
            fs.unlink("public/images/" +  oldFile,(err) => {
                if (err)return res.status(500).send({message: `Error en la petición: ${err}`})
            })
            console.log(`Elemento borrado: ${plane}`)
            res.redirect("/api/planes")
        })    
    })
}


function newPlane(req,res){
    Model.find().populate("brand").exec((err,models) => {
        res.locals.title = "Nueva aeronave"
        res.locals.models = models
        res.render("planes/newPlane",res.locals.models)
    })
}

function editPlane(req,res){
    let planeId = req.params.planeId
    Plane.findById(planeId).populate({path:"model",populate:{path:"brand"}}).exec((err,plane) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!plane) return res.status(404).send({message: `No se encuentra en la BD`})

        res.locals.statusOptions = buildOptions(Plane.getStatusOptions(),plane.status)
        res.locals.availabilityOptions = buildOptions(Plane.getAvailabilityOptions(),plane.availability)
        plane.nextMaintenanceFormated = formatDate(plane.nextMaintenance,"YYYY-MM-DD")
        res.locals.plane = plane     
        Model.find().populate("brand").exec((err,models) => {
            res.locals.models = models
            res.render("planes/editPlane",res.locals)
        })
    })
}



module.exports = {
    getPlane,
    getPlanes,
    savePlane,
    updatePlane,
    deletePlane,
    editPlane,
    newPlane
}

