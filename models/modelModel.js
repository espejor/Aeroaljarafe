'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ModelSchema = new Schema({
    model: {type:String, required: true},
    brand: {type: Schema.ObjectId,ref: "Brand", required: true}
})

module.exports = mongoose.model('Model',ModelSchema)