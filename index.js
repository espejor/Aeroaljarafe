'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require ('./config')

// Conexión a la BD
mongoose.connect(config.db,{useNewUrlParser: true,useCreateIndex: true},(err,res) => {
    if (err){
        return console.log(`Error al conectar a la BD. ${err}`)
    }
    console.log('Conexión establecida con la BD ...')

    app.listen (config.port,() => {
        console.log (`API Rest corriendo en http://localhost:${config.port}`)
    })
})

