'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')   // Motor de plantillas Handlebars
const app = express()
const api = require('./routes')

// Cargamos los middleware0
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
// Configuramos el motor de plantillas 
app.engine('.hbs',hbs({
    defaultLayout: 'default',
    extname:'.hbs'
})) 
app.set('view engine','.hbs')

app.use('/api',api)

// Renderizado de vistas
app.get('/logup',(req,res) => {
    res.render('logup')
})
app.get('/login',(req,res) => {
    res.render('login')
})
app.get('/', (req, res) => {
    res.render('plane')
})

module.exports = app
