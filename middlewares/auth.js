'use strict'

// Este middleware permitirá que se puedan o no acceder a las rutas según se esté autenticado o no
const services = require('../services')

function isAuthorised(req,res,next){
    // Comprobamos si en la cabecera de la petición exste un campo authorization
    if (!req.headers.authorization){
        return res.status(403).send({message: `Acceso no autorizado`})
    }
    const token = req.headers.authorization.split(' ')[1]
//return res.status(403).send({message: `Acceso autorizado`})
    services.decodeToken(token) // Que devuelve una promesa (decoded)
        .then(response => {
            req.user = response
            next()
        })
        .catch(response =>{
            res.status(response.status)
        })
}

module.exports = isAuthorised