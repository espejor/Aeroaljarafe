'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema
const updateRefs = require('../services/_updateReferences')

const ModelSchema = new Schema({
    model: {type:String, required: true},
    brand: {type: Schema.ObjectId,ref: "Brand", required: true},
    extension:{type:String,required:true}   // Extensión del archivo de imagen
})

ModelSchema.pre("remove",function (next){
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
        console.error(err)
    })
})

ModelSchema.post("save",doc => {
    updateRefs.incRef(doc.brand)
})


ModelSchema.post("remove",doc => {
    updateRefs.decRef(doc.brand)
})


module.exports = mongoose.model('Model',ModelSchema)