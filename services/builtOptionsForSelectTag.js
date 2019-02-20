"use strict"

module.exports = 
function 
buildOptions(arrayOptions,optionSelected){
    let options = []
    arrayOptions.forEach(element => {
        if (element instanceof String){
            if (element == optionSelected){
                options.push(["selected",element])
            }else{
                options.push(["",element])
            }
        }else{
            if (element.value == optionSelected){
                options.push(["selected",element])
            }else{
                options.push(["",element])
            }            
        }
    });
    return options
}