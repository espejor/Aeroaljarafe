'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
// Librería para utilizar contraseñas
const bcrypt = require ('bcrypt-nodejs')
// Librería para el avatar
const crypto = require ('crypto'),
SALT_WORK_FACTOR = 10,
// these values can be whatever you want - we're defaulting to a
// max of 5 attempts, resulting in a 2 hour lock
MAX_LOGIN_ATTEMPTS = 5,
LOCK_TIME = 2 * 60 * 60 * 1000,
REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,

passwordValidation = {
    validator: function(psw) {
        return this.passwordConfirmation == psw
    },
    message: "las contraseñas no son iguales"    
}


// Creamos el Schema
const UserSchema = new Schema({
    accessData:{
        email: {type: String, unique:true, lowercase: true,required: [true, 'Un email es obligatorio'], match:REGEX},
        password: {
            type: String, 
            select: false,
            minlength: 8,
            required: [true, 'Debe introducir una palabra clave'],
            validate: passwordValidation
        },
        signupDate: {type: Date, default: Date.now()},
        lastLogin: Date,
        // Control de intentos repetitivos de logueado fallido
        loginAttempts: { type: Number, required: true, default: 0 },
        lockUntil: { type: Number },
        role: {
            type: String,
            enum: ["Alumno","Piloto","Instructor","Auxiliar"],
            default: "Piloto"
        }
    },

    personalData:{
        address:    String,
        avatar:    String,      // URL del Avatar
        displayName:    String
    },

    pilotData:{
        licence:                String,
        dataExpirationLicence:  Date,
        dataExpeditionLicence:  Date,
        dataExpirationMedicalExamination: Date,
        aircraftsQualification: [{type: Schema.ObjectId,ref: "Model"}]
    }    
})

// Atributos Virtual
UserSchema.virtual('passwordConfirmation')
    .get(function(){
        return this.pswConf
    })
    .set(function(psw){
        this.pswConf = psw
    })

UserSchema.virtual('isLocked').get(function() {
    // check for a future lockUntil timestamp
    return !!(this.lockUntil && this.lockUntil > Date.now());
});

// expose enum on the model, and provide an internal convenience reference 
var reasons = UserSchema.statics.failedLogin = {
    NOT_FOUND: 0,
    PASSWORD_INCORRECT: 1,
    MAX_ATTEMPTS: 2
};


// Funciones a ejecutar antes o despues de que el modelo se 
// se almacene en la BD

// Antes de guardar
UserSchema.pre('save',function (next) {
    let user = this
    // Si el usuario no ha modificado la contraseña ...
    if (!user.isModified('password'))
    // ...la función termina y pasa al próximo midleware
        return next()
    // ... En otro caso generamos un Salt con bcrypt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err,salt){
        if (err)
        // Pasamos al siguiente midleware
            return next(err)
        // En otro caso hasheamos la contraseña
        bcrypt.hash(user.password, salt, null,function (err,hash) {
            if (err) return next(err)
            user.password = hash
            next()
        })
    })
})


UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword.password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}

// Control de intentos de login
UserSchema.methods.incLoginAttempts = function(cb) {
    // if we have a previous lock that has expired, restart at 1
    if (this.lockUntil && this.lockUntil < Date.now()) {
        return this.update({
            $set: { loginAttempts: 1 },
            $unset: { lockUntil: 1 }
        }, cb);
    }
    // otherwise we're incrementing
    var updates = { $inc: { loginAttempts: 1 } };
    // lock the account if we've reached max attempts and it's not locked already
    if (this.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS && !this.isLocked) {
        updates.$set = { lockUntil: Date.now() + LOCK_TIME };
    }
    return this.update(updates, cb);
};

// Función para autenticarse
UserSchema.statics.getAuthenticated = function(req, cb) {

    this.findOne({ email:req.body.email},'email +password', function(err, user) {
        if (err) return cb(err);

        // make sure the user exists
        if (!user) {
            return cb(null, null, reasons.NOT_FOUND);
        }

        // check if the account is currently locked
        if (user.isLocked) {
            // just increment login attempts if account is already locked
            return user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.MAX_ATTEMPTS);
            });
        }

        // test for a matching password
        user.comparePassword({password:req.body.password}, function(err, isMatch) {
            if (err) return cb(err);

            // check if the password was a match
            if (isMatch) {
                // if there's no lock or failed attempts, just return the user
                if (!user.loginAttempts && !user.lockUntil) return cb(null, user);
                // reset attempts and lock info
                var updates = {
                    $set: { loginAttempts: 0 },
                    $unset: { lockUntil: 1 }
                };
                return user.update(updates, function(err) {
                    if (err) return cb(err);
                    return cb(null, user);
                });
            }

            // password is incorrect, so increment login attempts before responding
            user.incLoginAttempts(function(err) {
                if (err) return cb(err);
                return cb(null, null, reasons.PASSWORD_INCORRECT);
            });
        });
    });
};

// Librería para asignar una avatar
UserSchema.methods.gravatar = function (){
    // Si no hay email se asigna un avatar por defecto
    if(!this.email) return `https://gravatar.com/avatar/?s=200&d=retro`
    // en otro caso
    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `https://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User',UserSchema)
