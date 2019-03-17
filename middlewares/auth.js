'use strict'

// Este middleware permitirá que se puedan o no acceder a las rutas según se esté autenticado o no
const services = require('../services')

function isAuthorised(req,res,next){
    // Comprobamos si en la cabecera de la petición exste un campo authorization
    const token = req.headers.authorization.split(' ')[1]
    if (token == "null"){
        return res.status(401).send({message:"Acceso no autorizado"})
    }
    
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