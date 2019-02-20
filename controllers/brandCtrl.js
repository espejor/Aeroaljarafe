'use strict'

const Brand = require('../models/brandModel')
const formidable = require("formidable")
const fs = require("fs")

function getBrand(req,res){
    let brandId = req.params.brandId
    Brand.findById(brandId,(err,brand) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!brand) return res.status(404).send({message: `No se encuentra en la BD`})
        res.locals.title = "Ver Marca " + brand.brand
        res.locals.brand = brand
        res.render("brands/showBrand",res.locals.brand)
    })
}

function getBrands(req,res){
    Brand.find({}, (err,brands) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!brands) return res.status(404).send({message: `No se existen Marcas en la BD`})
        res.locals.title = "Lista de Marcas" 
        res.locals.brands = brands
        res.header({
            'Content-Type': 'text/html',
        });
        res.render("brands/brands",res.locals.brands)
    })
}

function saveBrand(req,res){
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
            //res.locals.brand = brandStored
            res.redirect("/api/brands")
        })  
    })
}

function updateBrand(req,res){
    let brandId = req.params.brandId 
    var form = new formidable.IncomingForm();
    form.keepExtensions = true
    form.parse(req, function(err, fields, files) {
        if (err)
            res.status(500).send({message: err.message})

        // Buscamos  la Marca en la BD
        Brand.findById(brandId,(err,brand) => {
            if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
            if (!brand) return res.status(404).send({message: `No se encuentra en la BD`}) 
            // Y le asignamos las propiedades pasados por POST
            if (fields.brand) 
                brand.brand = fields.brand
            if (files.image.name){
                let oldFile = brandId + "." + brand.extension
                brand.extension = files.image.name.split(".").pop()    
                let newFile = brandId + "." + brand.extension
                // borramos el archivo anterior 
                fs.unlink("public/images/" +  oldFile,(err) => {
                    
                    if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
                })
                // Movemos el nuevo archivo a la carpeta de imagenes        
                fs.rename(files.image.path,"public/images/" +  newFile,(err) => {
                    if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
                })
            }
            brand.save()
            console.log(brand)
            res.locals.brand = brand
            res.redirect("/api/brands")
        })
    })
}

function deleteBrand(req,res){
    let brandId = req.params.brandId
    Brand.findById(brandId,(err,brand) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!brand) return res.status(404).send({message: `No se encuentra en la BD`})

        brand.remove(err => {
            if (err)  
                return res.status(500).send({message: `Error en la petición: ${err}`})
            // Borramos el archivo de imagen de la carpeta public
            let oldFile = brandId + "." + brand.extension
            fs.unlink("public/images/" +  oldFile,(err) => {
                if (err)return res.status(500).send({message: `Error en la petición: ${err}`})
            })
            console.log(`Elemento borrado: ${brand}`)
            res.redirect("/api/brands")
        })    
    })
}


function newBrand(req,res){
    res.render("brands/newBrand",{title:"Nueva Marca"})
}

function editBrand(req,res){
    let brandId = req.params.brandId
    Brand.findById(brandId,(err,brand) => {
        if (err) 
            return res.status(500).send({message: `Error en la petición: ${err}`})
        res.locals.brand = brand 
        res.locals.title = "Editar Marca " + brand.brand 
        res.render("brands/editBrand",res.locals.brand )
    })
}

module.exports = {
    getBrand,
    getBrands,
    saveBrand,
    updateBrand,
    deleteBrand,
    newBrand,
    editBrand
}

