'use strict'

// Vamos a trabajar con el Jason Web Token 
// (JSON Web Tokens are an open, industry standard RFC 7519 method 
// for representing claims securely between two parties. https://jwt.io/)
const jwt = require('jwt-simple')
// Biblioteca para gestionar fechas
const moment = require('moment')
// Importamos la clave para el cifrado que hemos guardado en config
const config = require('../config')

// Función que crea un token con el objeto usuario
function createToken (user){
    // Creamos un objeto payload que llevará los datos del usuario
    const payload = {
        // atributo del id del usuario
        sub: user._id,
        // Cuándo fue creado el token
        iat: moment().unix(),
        // Cuando caduca el token
        exp: moment().add(14,'days').unix()
    }
    // Ahora lo codificamos con jwt
    return jwt.encode(payload,config.SECRET_TOKEN)
}

function decodeToken(token){
    //Empleamos promesas
    const decoded = new Promise((resolve,reject) => {
        // Empleamos captura de excepciones
        try {
            const payload = jwt.decode(token,config.SECRET_TOKEN)
            // Comprobamos que el token es válido
            // No ha caducado
            if (payload.exp <= moment().unix()){
                reject({
                    status: 401,
                    message:`Ha caducado su clave`
                }) 
            }
            resolve(payload.sub)
        } catch (error) {
            reject({
                status: 500,
                message: `Invalid Token`
            })
        }
    })

    // Devolvemos la promesa
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}    
