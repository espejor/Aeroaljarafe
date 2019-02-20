const userCtrl = require('../../controllers/userCtrl')

// Verbos Users
module.exports = function(api){

    api.post("/signup",userCtrl.signUp)
    api.post("/signin",userCtrl.signIn)
    // Renderizado de vistas
    api.get('/logup',(req,res) => {
        res.render('users/logup')
    })
    api.get('/login',(req,res) => {
        res.render('users/login')
    })

    api.get("/users",userCtrl.getUsers)
    api.get("/user/:userId", userCtrl.getUser)
    api.put("/user/:userId",userCtrl.updateUser)
    api.delete("/user/:userId",userCtrl.deleteUser)
}