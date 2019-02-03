'use strict'

const Brand = require('../models/brandModel')
const formidable = require("formidable")
const fs = require("fs")

function getBrand(req,res){
    let brandId = req.params.brandId
    Brand.findById(brandId,(err,brand) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!brand) return res.status(404).send({message: `No se encuentra en la BD`})

        res.locals.brand = brand
        res.render("brands/showBrand",res.locals.brand)
    })
}

function getBrands(req,res){
    Brand.find({}, (err,brands) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!brands) return res.status(404).send({message: `No se existen Marcas en la BD`})
        
        res.locals.brands = brands
        res.render("brands/brands",res.locals.brands)
    })
}

function saveBrand(req,res){
    console.log('POST /api/brand')

    var form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, function(err, fields, files) {

        let extension = files.image.name.split(".").pop()

        // Creamos un nuevo objeto Marca
        let brand = new Brand()
        // Y le asignamos las propiedades pasados por POST
        brand.brand = fields.brand
        brand.extension = extension
        // Salvamos la nueva Marca en la BD
        brand.save((err,brandStored) => {
            if (err) 
                res.status(500).send({message: `Error al guardar en la BD: ${err}`})
            let newFile = brand._id + "." + extension
            fs.rename(files.image.path,"public/images/" +  newFile)
            console.log(brandStored)
            res.locals.brand = brandStored
            res.render("brands/showBrand",res.locals.brand)
        })  
    });
}

function updateBrand(req,res){
    let brandId = req.params.brandId
    let update = req.body

    Brand.findByIdAndUpdate(brandId,update,(err,brandUpdated) => {
        if (err) return res.status(500).send({message: `Error en la petición de actualización: ${err}`})
        
        res.status(200).send({brand:brandUpdated})
    })
}

function deleteBrand(req,res){
    let brandId = req.params.brandId
    Brand.findById(brandId,(err,brand) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!brand) return res.status(404).send({message: `No se encuentra en la BD`})

        brand.remove(err => {
            if (err)  return res.status(500).send({message: `Error en la petición: ${err}`})
            console.log(`Elemento borrado: ${brand}`)
            res.redirect("/api/brands")
        })    
    })
}

function newBrand(req,res){
    res.render("brands/newBrand")
}

module.exports = {
    getBrand,
    getBrands,
    saveBrand,
    updateBrand,
    deleteBrand,
    newBrand
}

