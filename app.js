'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')   // Motor de plantillas Handlebars
const app = express()
const api = require('./routes')(express)
const methodOverride = require('method-override')
const cors = require('cors')


// Cargamos los middleware
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))
// Configuramos el motor de plantillas 

app.engine('.hbs',hbs({
    defaultLayout: 'default',
    extname:'.hbs'
})) 
app.set('view engine','.hbs')

app.use('/api',api)
app.use(express.static('public'));



app.get('/', (req, res) => {
    res.render('index')
})


module.exports = app
