"use strict";

const Flight = require("../models/flightModel");
//const formatDate = require("../services/formatDate");
const config = require("../config");

function getFlight(req, res) {
  let flightId = req.params.flightId;
  Flight.findById(flightId)
    .populate({ path: "User" })
    .populate({ path: "Plane" })
    .exec((err, flight) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error en la petición: ${err}` });
      if (!flight)
        return res.status(404).send({ message: `No se encuentra en la BD` });
      // flight.nextMaintenanceFormated = formatDate(
      //   flight.nextMaintenance,
      //   "DD/MM/YYYY"
      // );
      res.status(200).send({ flight });
    });
}

function getFlights(req, res) {
  Flight.find({})
    .populate({ path: "User" })
    .populate({ path: "Plane" })
    .exec((err, flights) => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error en la petición: ${err}` });
      if (!flights || flights.length == 0)
        return res.status(404).send({ message: `No existen vuelos en la BD` });
      res.status(200).send({ flights });
    });
}

function saveFlight(req, res) {
  let flight = new Flight(req.body);
  let date = Date.now();
  // Al crear el vuelo se le asigna el estado programado (100) y la fecha de creación
  flight.status.push({
    code: 100,
    status: config.flightStatus[100],
    date: date
  });

  flight.save(err => {
    if (err) {
      console.log(String(err));
      return res.status(400).send({ message: `Error al crear Vuelo: ${err}` });
    }
    // devolvemos un mensaje con un parámetro <token> con valor devuelto por un módulo
    // aparte que crea un token con el usuario
    return res.status(200).send({
      message: "Vuelo progarmado",
      flight
    });
  });
}

function updateFlight(req, res) {
  let flightId = req.params.flightId;
  let update = req.body;

  flight.findOneAndUpdate(flightId, update, (err, flightUpdated) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error en la petición de actualización: ${err}` });

    res.status(200).send({ flightUpdated });
  });
}

function deleteFlight(req, res) {
  let flightId = req.params.flightId;
  Flight.findById(flightId, (err, flight) => {
    if (err)
      return res.status(500).send({ message: `Error en la petición: ${err}` });
    if (!flight)
      return res.status(404).send({ message: `No se encuentra en la BD` });

    flight.remove(err => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error en la petición: ${err}` });
      res
        .status(200)
        .send({ message: `Elemento borrado: ${flight._id}`, flight });
    });
  });
}

module.exports = {
  getFlight,
  getFlights,
  saveFlight,
  updateFlight,
  deleteFlight
};
