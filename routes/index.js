'use strict'

const express = require('express')
const planeCtrl = require('../controllers/planeCtrl')
const userCtrl = require('../controllers/userCtrl')
const api = express.Router()
// Middleware para autenticación
const auth = require('../middlewares/auth')



// Verbos 
api.get("/plane", planeCtrl.getPlanes)
api.get("/plane/:planeId", planeCtrl.getPlane)
api.post("/plane",planeCtrl.savePlane)
api.put("/plane/:planeId",planeCtrl.updatePlane)
api.delete("/plane/:planeId",planeCtrl.deletePlane)
api.get("/private",auth,function(req,res){
    return res.status(200).send({message:'Acceso permitido'})
})

api.post("/signup",userCtrl.signUp)
api.post("/signin",userCtrl.signIn)


module.exports = api