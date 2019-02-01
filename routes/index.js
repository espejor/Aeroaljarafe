'use strict'

var fs = require('fs'); 

module.exports = function(express) { 
    var api = express.Router();
    fs.readdirSync(__dirname + '/routes/')
        .forEach(function(file) { 
            var route = require('./routes/' + file); 
            route(api); 
        }); 
    return api    
} 

