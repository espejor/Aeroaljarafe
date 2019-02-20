const brandCtrl = require('../../controllers/brandCtrl')
// Middleware para autenticación
const auth = require('../../middlewares/auth')

module.exports = function(api){

    // Verbos Brands
    api.get("/brands/new",brandCtrl.newBrand)
    api.get("/brands/edit/:brandId",brandCtrl.editBrand)
    api.get("/brands",auth, brandCtrl.getBrands)
    api.get("/brand/:brandId", brandCtrl.getBrand)
    api.post("/brand",brandCtrl.saveBrand)
    api.put("/brand/:brandId",brandCtrl.updateBrand)
    api.delete("/brand/:brandId",brandCtrl.deleteBrand)

}