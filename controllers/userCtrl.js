'use strict'

const User = require('../models/userModel')
const service = require('../services')

function signUp(req,res){
    const user = new User({
        mail: req.body.email, 
        displayName: req.body.name,
        password: req.body.password,
        // Virtual
        passwordConfirmation: req.body.passwordConfirmation
        // La fecha de alta del ususario se crea automáticamente
    })
    user.save((err) => {
        if (err) {
            console.log(String(err))
            return res.status(400).send({message: `Error al crear Usuario: ${err}`})
        }
        // devolvemos un mensaje con un parámetro <token> con valor devuelto por un módulo
        // aparte que crea un token con el usuario
        return res.status(200).send({message: 'Registro correcto', token: service.createToken(user)})
    })
}

function signIn(req,res){
    console.log(req.body)

    User.getAuthenticated(req, function(err, user, reason) {
        if (err) return res.status(400).send({message:`Se ha producido el error: ${err}`})

        // login was successful if we have a user
        if (user) {
            // handle login success
            console.log('login success');
            req.user = user
            // Devolvemos información de que se ha logeado y el token que servirá para que la aplicación de usuario
            // lo ponga en la cabecera de sus peticiones y se le garantice elacceso a las páginas que tenga autorz.
            
            res.status(200).send({
                message:`Te has logueado correctamente`,
                token: service.createToken(user)
            })
            // res.locals.token = service.createToken(user)
            // res.locals.message = `Te has logueado correctamente`
            
            // res.render('index',function(err, html) {
            //     res.status = 200
            //     res.send(html)
            //   });

        }

        // otherwise we can determine why we failed
        var reasons = User.failedLogin;
        switch (reason) {
            case reasons.NOT_FOUND:
            case reasons.PASSWORD_INCORRECT:
                // note: these cases are usually treated the same - don't tell
                // the user *why* the login failed, only that it did
                console.log(reason)
                break;
            case reasons.MAX_ATTEMPTS:
                // send email or otherwise notify user that account is
                // temporarily locked
                console.log(reason)
                break;
        }
    });

}


function getUser(req,res){
    let userId = req.params.userId
    User.findById(userId,(err,user) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!user) return res.status(404).send({message: `No se encuentra en la BD`})

        res.status(200).send({user})
    })
}

function getUsers(req,res){
    User.find({}, (err,users) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!users) return res.status(404).send({message: `No se existen usuarios en la BD`})
        
        res.status(200).send({users})
    })
}

function updateUser(req,res){
    let userId = req.params.userId
    let update = req.body

    User.findByIdAndUpdate(userId,update,(err,userUpdated) => {
        if (err) return res.status(500).send({message: `Error en la petición de actualización: ${err}`})
        
        res.status(200).send({user:userUpdated})
    })
}

function deleteUser(req,res){
    let userId = req.params.userId
    User.findById(userId,(err,user) => {
        if (err) return res.status(500).send({message: `Error en la petición: ${err}`})
        if (!user) return res.status(404).send({message: `No se encuentra en la BD`})

        user.remove(err => {
            if (err)  return res.status(500).send({message: `Error en la petición: ${err}`})
            res.status(200).send({message: `Elemento borrado: ${user}`})
        })    
    })
}



module.exports = {
    signUp,
    signIn,
    getUsers,
    getUser,
    updateUser,
    deleteUser
}