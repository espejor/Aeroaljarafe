const flightCtrl = require('../../controllers/flightCtrl')
// Middleware para autenticación
const auth = require('../../middlewares/auth')

module.exports = function(api){

    // Verbos Flights
    api.get("/flights", flightCtrl.getFlights)
    api.get("/flight/:flightId", flightCtrl.getFlight)
    api.post("/flight",flightCtrl.saveFlight)
    api.put("/flight/:flightId",flightCtrl.updateFlight)
    api.delete("/flight/:flightId",flightCtrl.deleteFlight)
}