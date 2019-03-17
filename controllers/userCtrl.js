"use strict";

const User = require("../models/userModel");
const Model = require("../models/modelModel")
const service = require("../services");
const builtOptions = require("../services/builtOptionsForSelectTagFromArray");
const builtListOfItems = require("../services/builtListOfItems")

function signUp(req, res) {
  let user = new User({
    accessData: {
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    },
    // Virtual
    passwordConfirmation: req.body.passwordConfirmation,

    personalData: {
      displayName: req.body.displayName,
      address: req.body.address,
      avatar: req.body.avatar
    },

    pilotData: {
      licence: req.body.licence,
      dataExpirationLicence: req.body.dataExpirationLicence,
      dataExpeditionLicence: req.body.dataExpeditionLicence,
      dataExpirationMedicalExamination: req.body.dataExpirationMedicalExamination

    }
    // La fecha de alta del ususario se crea automáticamente
  });
  if (req.body.aircraftsQualification != null)
    user.pilotData.aircraftsQualification.push(req.body.aircraftsQualification);

  user.save(err => {
    if (err) {
      console.log(String(err));
      return res
        .status(400)
        .send({ message: `Error al crear Usuario: ${err}` });
    }
    // devolvemos un mensaje con un parámetro <token> con valor devuelto por un módulo
    // aparte que crea un token con el usuario
    return res.status(200).send({
      message: "Registro correcto",
      token: service.createToken(user),
      user
    });
  });
}

function signIn(req, res) {
  console.log(req.body);

  User.getAuthenticated(req, function(err, user, reason) {
    if (err)
      return res
        .status(400)
        .send({ message: `Se ha producido el error: ${err}` });

    // login was successful if we have a user
    if (user) {
      // handle login success
      console.log("login success");
      req.user = user;
      // Devolvemos información de que se ha logeado y el token que servirá para que la aplicación de usuario
      // lo ponga en la cabecera de sus peticiones y se le garantice elacceso a las páginas que tenga autorz.

      res.status(200).send({
        message: `Te has logueado correctamente`,
        token: service.createToken(user)
      });
    }

    // otherwise we can determine why we failed
    var reasons = User.failedLogin;
    switch (reason) {
      case reasons.NOT_FOUND:
      case reasons.PASSWORD_INCORRECT:
        // note: these cases are usually treated the same - don't tell
        // the user *why* the login failed, only that it did
        console.log(reason);
        break;
      case reasons.MAX_ATTEMPTS:
        // send email or otherwise notify user that account is
        // temporarily locked
        console.log(reason);
        break;
    }
  });
}

function getUser(req, res) {
  let userId = req.params.userId;
  User.findById(userId, (err, user) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!user)
      return res.status(404).send({ message: `No se encuentra en la BD` });
    var models = new Array()
    Model.find({}).populate({path:"brand"}).exec((err,_models) => {
      if(!err && _models){
        models = builtOptions(builtListOfItems(_models,["brand.brand","model"]),user.pilotData.aircraftsQualification)
        res.status(200).send({ user });
      }else
        return res.status(500).send({ message: `Error en la petición: ${err}` });
    })    
    
  });
}

function getUsers(req, res) {
  User.find({}, (err, users) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!users)
      return res
        .status(404)
        .send({ message: `No se existen usuarios en la BD` });

    res.status(200).send({ users });
  });
}

function updateUser(req, res) {
  let userId = req.params.userId;
  let update = req.body;

  User.findOneAndUpdate(userId, update, (err, userUpdated) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error en la petición de actualización: ${err}` });

    res.status(200).send({ user: userUpdated });
  });
}

function updateUserAvatar(req, res) {
  let userId = req.params.userId;
  var form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, function(err, fields, files) {
    if (err) res.status(500).send({ message: err.message });

    // Buscamos  la Marca en la BD
    User.findById(userId, (err, user) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error en la petición: ${err}` });
      if (!user)
        return res.status(404).send({ message: `No se encuentra en la BD` });
      // Y le asignamos las propiedades pasados por POST
      if (fields.user) user.user = fields.user;
      if (files.image.name) {
        let oldFile = userId + "." + user.extension;
        user.extension = files.image.name.split(".").pop();
        let newFile = userId + "." + user.extension;
        // borramos el archivo anterior
        fs.unlink("public/images/" + oldFile, err => {
          if (err)
            return res
              .status(500)
              .send({ message: `Error en la petición: ${err}` });
        });
        // Movemos el nuevo archivo a la carpeta de imagenes
        fs.rename(files.image.path, "public/images/" + newFile, err => {
          if (err)
            return res
              .status(500)
              .send({ message: `Error en la petición: ${err}` });
        });
      }
      user.save();
      console.log(user);
    });
  });
}

function deleteUser(req, res) {
  let userId = req.params.userId;
  User.findById(userId, (err, user) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!user)
      return res.status(404).send({ message: `No se encuentra en la BD` });

    user.remove(err => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error en la petición: ${err}` });
      res.status(200).send({ message: `Elemento borrado: ${user._id}`, user });
    });
  });
}

module.exports = {
  signUp,
  signIn,
  getUsers,
  getUser,
  updateUser,
  updateUserAvatar,
  deleteUser
};
