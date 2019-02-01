const brandCtrl = require('../../controllers/brandCtrl')
// Middleware para autenticación
const auth = require('../../middlewares/auth')

module.exports = function(api){

    // Verbos Brands
    api.get("/brand/new",brandCtrl.newBrand)
    api.get("/brands", brandCtrl.getBrands)
    api.get("/brand/:brandId", brandCtrl.getBrand)
//    api.get("/brand/:brandId/show", brandCtrl.getBrand)
    api.post("/brand",brandCtrl.saveBrand)
    api.put("/brand/:brandId",brandCtrl.updateBrand)
    api.delete("/brand/:brandId",brandCtrl.deleteBrand)
    // api.get("/b",auth,function(req,res){
    //     return res.status(200).send({message:'Acceso permitido'})
    // })
}