const availabilityCtrl = require('../../controllers/availabilityCtrl')
// Middleware para autenticación
const auth = require('../../middlewares/auth')

module.exports = function(api){

    // Verbos Availabilitys
    //api.get("/availabilitys/edit/:availabilityId",availabilityCtrl.editAvailability)
    api.get("/availabilitys",auth, availabilityCtrl.getAvailabilitys)
    api.get("/availability/:availabilityId", availabilityCtrl.getAvailability)
    api.post("/availability",availabilityCtrl.saveAvailability)
    api.put("/availability/:availabilityId",availabilityCtrl.updateAvailability)
    api.delete("/availability/:availabilityId",availabilityCtrl.deleteAvailability)

}