const userCtrl = require('../../controllers/userCtrl')
// Middleware para autenticación
const auth = require('../../middlewares/auth')

// Verbos Users
module.exports = function(api){

    api.post("/signup",userCtrl.signUp)
    api.post("/signin",userCtrl.signIn)
    api.get("/users",userCtrl.getUsers)
    api.get("/user/:userId", userCtrl.getUser)
    api.put("/user/:userId",userCtrl.updateUser)
    api.put("/user/:userId/avatar",userCtrl.updateUserAvatar) // cambiar el avatar
    api.delete("/user/:userId",userCtrl.deleteUser)
}