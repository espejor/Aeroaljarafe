'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlaneSchema = new Schema({
    //brand: {type: Schema.ObjectId,ref: "Brand"},
    model: {type: Schema.ObjectId,ref: "Model"},
    plate: String,
    picture: String,
    status: Number,
    hours: Number
})

module.exports = mongoose.model('Plane',PlaneSchema)
