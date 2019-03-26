module.exports = {
    port    : process.env.PORT || 3000,
    db      : process.env.MONGODB || 'mongodb://localhost:27017/aeroaljarafe',
    SECRET_TOKEN  : 'mD,hcTkjnJ´+jnHHk+4535*mM/C3NNOk8jn',
    flightStatus: {
        100:    "Programado",
        200:    "En estudio",
        300:    "Confirmado",
        400:    "Volado",
        450:    "Anotado",
        500:    "Pagado",
        600:    "Cancelado por el usuario",
        700:    "Cancelado por el Sistema",
        800:    "Cancelado por el Administrador",
        900:    "Bloqueado",
        1000:   "Aplazado",
        1100:   "Reprogramado"
    }
}