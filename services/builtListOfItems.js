"use strict"

module.exports = 
function builtListOfItems (listOfObjects,fieldsToList){
    let newArray = []
    
    listOfObjects.forEach(object => {
        let option = ""  
        fieldsToList.forEach(field => {
            option += extractRecursively(object,field) + " "
        })
        newArray.push({_id: object._id,value: option})
    });
    return newArray
}

function extractRecursively(object,inFields){
    let fields = []
    fields = inFields.split(".")
    if (fields.length > 1)
        return extractRecursively(object[fields[0]],fields[1])
    else
        return object[fields[0]]
}