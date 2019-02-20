const planeCtrl = require('../../controllers/planeCtrl')
// Middleware para autenticación
const auth = require('../../middlewares/auth')

module.exports = function(api){

    // Verbos Planes
    api.get("/planes/new",planeCtrl.newPlane)
    api.get("/planes/edit/:planeId",planeCtrl.editPlane)
    api.get("/planes", planeCtrl.getPlanes)
    api.get("/plane/:planeId", planeCtrl.getPlane)
    api.post("/plane",planeCtrl.savePlane)
    api.put("/plane/:planeId",planeCtrl.updatePlane)
    api.delete("/plane/:planeId",planeCtrl.deletePlane)
}