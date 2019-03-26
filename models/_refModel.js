'use stricts'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const RefSchema = new Schema({
    coleccion: {type:Schema.ObjectId},
    cant: Number
})

module.exports = mongoose.model('References',RefSchema)
