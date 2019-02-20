'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const updateRefs = require('../services/_updateReferences')

const modelName = 'Brand'

const BrandSchema = new Schema({
    brand: {type:String, required: true},
    extension:{type:String,required:true}   // Extensión del archivo de imagen
})

BrandSchema.pre("remove",function (next){
    updateRefs.hasRefs(this.id)
    .then(response => {       
        if (response){
             console.log("No se puede eliminar el registro ya que tiene referencias externas")
            return next(new Error(`No se puede eliminar el registro ya que tiene referencias externas`))
        }else{
            console.log("No hay referencias. Se puede borrar")
            return next()
        }   
    }).catch(err => {
        console.log(err)
    })
})

module.exports = mongoose.model(modelName,BrandSchema)