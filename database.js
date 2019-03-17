const mongoose = require('mongoose')
const config = require('./config')

const URI = config.db

// Conexión a la BD
mongoose.getUp = function () {
    mongoose.connect(URI,{useNewUrlParser: true,useCreateIndex: true},(err,res) => {
        if (err){
            console.log(`Error al conectar a la BD. ${err}`)
            return error
        }
        console.log('Conexión establecida con la BD ...')

    })
}

module.exports = mongoose