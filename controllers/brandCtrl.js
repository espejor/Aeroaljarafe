'use strict'

const Brand = require('../models/brandModel')

function getBrand(req,res){
    let brandId = req.params.brandId
    Brand.findById(brandId,(err,brand) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!brand) return res.status(404).send({message: `No se encuentra en la BD`})

        res.status(200).send({brand})
    })
}

function getBrands(req,res){
    Brand.find({}, (err,brands) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!brands) return res.status(404).send({message: `No se existen Marcas en la BD`})
        
        
        res.locals.brands = brands
        res.render("brand",res.locals.brands)
    })
}

function saveBrand(req,res){
    console.log('POST /api/brand')
    console.log(req.body)

    // Creamos un nuevo objeto Marca
    let brand = new Brand()
    // Y le asignamos las propiedades pasados por POST
    brand.brand = req.body.brand
    // Salvamos la nueva Marca en la BD
    brand.save((err,brandStored) => {
        if (err) res.status(500).send({message: `Error al guardar en la BD: ${err}`})
        res.status(200).send({brand: brandStored})
    }) 
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
            res.status(200).send({message: `Elemento borrado: ${brand}`})
        })    
    })
}

module.exports = {
    getBrand,
    getBrands,
    saveBrand,
    updateBrand,
    deleteBrand,
}

