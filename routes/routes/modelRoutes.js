const modelCtrl = require('../../controllers/modelCtrl')
// Middleware para autenticación
const auth = require('../../middlewares/auth')

module.exports = function(api){

    // Verbos Models
    api.get("/models", modelCtrl.getModels)
    api.get("/model/:modelId", modelCtrl.getModel)
    api.post("/model",modelCtrl.saveModel)
    api.put("/model/:modelId",modelCtrl.updateModel)
    api.delete("/model/:modelId",modelCtrl.deleteModel)
    api.get("/private",auth,function(req,res){
        return res.status(200).send({message:'Acceso permitido'})
    })
}