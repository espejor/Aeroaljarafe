'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const updateRefs = require('../services/_updateReferences')

const PlaneSchema = new Schema({
    //brand: {type: Schema.ObjectId,ref: "Brand"},
    model: {type: Schema.ObjectId,ref: "Model"},
    plate: {type:String,required:true},
    extension:{type:String,required:true},   // Extensión del archivo de imagen
    status: {
        type:String,
        enum:["Operativo","Averiado","Mantenimiento"],
        default: "Operativo"
    },
    availability: {
        type:String,
        enum:["Disponible","Reservado","No disponible"],
        default: "Disponible"
    },
    nextMaintenance:Date,
    hours: {type:Number, default:0}
})

PlaneSchema.pre("remove",function (next){
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

PlaneSchema.post("save",doc => {
    updateRefs.incRef(doc.model)
})


PlaneSchema.post("remove",doc => {
    updateRefs.decRef(doc.model)
})

PlaneSchema.statics.getStatusOptions = function(){
    return this.schema.paths.status.enumValues
}

PlaneSchema.statics.getAvailabilityOptions = function(){
    return this.schema.paths.availability.enumValues
}

module.exports = mongoose.model('Plane',PlaneSchema)
