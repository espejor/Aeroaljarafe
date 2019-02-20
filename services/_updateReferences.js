'use strict'

const References = require('../models/_refModel')

function incRef(reference){
    References.findOne(
        {coleccion:reference},
        (err,extRef) => {
            if (err)  
                console.log(`No se encuentra el registro en la BD: ${err}`)
            else{
                if (!extRef){
                    console.log("No existe esa referencia " + reference)
                    extRef = new References({coleccion:reference,cant:1})
                }
                else{
                    console.log("Encontrada la referencia " + reference)
                    extRef.cant = extRef.cant +1
                }
                extRef.save()
                console.log(`Actualizada la referencia: ${extRef}`)      
            }       
        }
    )
}


function decRef(reference){
    References.findOne(
        {coleccion:reference},
        (err,extRef) => {
            if (err)  
                console.log(`No se encuentra el registro en la BD: ${err}`)
            else{
                if (!extRef)    
                    extRef = new References({coleccion:reference,cant:0})
                else
                    extRef.cant = extRef.cant -1
                extRef.save()
                console.log(`Actualizada la referencia: ${extRef}`)      
            }       
        }
    )
}

function hasRefs(reference){
    
    return new Promise ((resolve,reject) => {
        References.findOne({coleccion:reference},(err,ref) => {
            if (err){
                console.log(`Error` + err)
                reject(new Error())
            }
            
            if (!ref){
                console.log(`No se encuentra esa referencia` + reference)
                resolve(false)
            }else
            if (ref.length == 0){
                console.log(`Esa referencia no tiene registros` + reference)
                resolve(false)
            }else
            if (ref.cant == 0){
                console.log(`La referencia tiene 0 registros` + reference)
                resolve(false)
            }else{
                console.log(`¡¡Prohibido Borrar!!` + reference)
                resolve(true)
            } 
        })
    })
}

module.exports = {
    incRef,
    decRef,
    hasRefs
}