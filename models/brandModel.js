'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const updateRefs = require('../services/_updateReferences')

const modelName = 'Brand'

const BrandSchema = new Schema({
    brand: {type:String, required: [true, 'El nombre de la Marca es obligatorio']},
    extension:{type:String,required:[true, 'Una imagen de la Marca es obligatoria']}   // Extensión del archivo de imagen
})

BrandSchema.pre("remove",function (next){
    updateRefs.hasRefs(this.id)
    .then(response => {       
        if (response){
            // throw new Error(`No se puede eliminar el registro ya que tiene referencias externas`)
            // return console.error("No se puede eliminar el registro ya que tiene referencias externas")
             next(new Error(`No se puede eliminar el registro ya que tiene referencias externas`))
        }else{
            console.log("No hay referencias. Se puede borrar")
            return next()
        }   
    }).catch(err => {
        console.log(err)
    })
})

module.exports = mongoose.model(modelName,BrandSchema)