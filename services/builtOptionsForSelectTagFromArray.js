"use strict"

module.exports =
function buildOptionsFromArray(optionsCollection,optionsSelectedArray){
    let options = []
    // Creamos un array de opciones
    optionsCollection.forEach(option => {
        options.push({selected:false,option:option})
    })

    optionsSelectedArray.forEach(optionSelected => {
        let i = getIndex(options, optionSelected)   // buscamos la opción seleccionada en el array de opciones 
        if (i != -1)                                // Si La opción está seleccionada
            options[i].selected = true               // La marcamos como seleccionada    
    })
    return options
}

function getIndex(options, optionSelected){
    for (let i = 0; i < options.length; i++) {
        if (options[i].option._id.toString() == optionSelected.toString())
            return i
    }
    return -1
}