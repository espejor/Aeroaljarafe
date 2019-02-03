'use strict'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const BrandSchema = new Schema({
    brand: {type:String, required: true},
    extension:{type:String,required:true}
})

module.exports = mongoose.model('Brand',BrandSchema)