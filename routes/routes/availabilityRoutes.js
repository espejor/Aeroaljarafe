const availabilityCtrl = require('../../controllers/availabilityCtrl')
// Middleware para autenticación
const auth = require('../../middlewares/auth')

module.exports = function(api){

    // Verbos Availabilities
    //api.get("/availabilities/edit/:availabilityId",availabilityCtrl.editAvailability)
    api.get("/availabilities",auth, availabilityCtrl.getAvailabilities)
    api.get("/availability/:availabilityId", availabilityCtrl.getAvailability)
    api.post("/availability",availabilityCtrl.saveAvailability)
    api.put("/availability/:availabilityId",availabilityCtrl.updateAvailability)
    api.delete("/availability/:availabilityId",availabilityCtrl.deleteAvailability)

}