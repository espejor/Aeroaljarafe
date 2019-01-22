'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PlaneSchema = new Schema({
    brand: Number,
    model: Number,
    plate: String,
    picture: String,
    status: Number,
    hours: Number
})

module.exports = mongoose.model('Plane',PlaneSchema)
