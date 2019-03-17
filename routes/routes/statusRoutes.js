const statusCtrl = require('../../controllers/statusCtrl')
// Middleware para autenticación
const auth = require('../../middlewares/auth')

module.exports = function(api){

    // Verbos Statuss
    //api.get("/statuss/edit/:statusId",statusCtrl.editStatus)
    api.get("/statuss",auth, statusCtrl.getStatuss)
    api.get("/status/:statusId", statusCtrl.getStatus)
    api.post("/status",statusCtrl.saveStatus)
    api.put("/status/:statusId",statusCtrl.updateStatus)
    api.delete("/status/:statusId",statusCtrl.deleteStatus)

}