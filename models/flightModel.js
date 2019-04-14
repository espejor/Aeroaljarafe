'use stricts'

const mongoose = require("mongoose")
const Schema = mongoose.Schema

const FlightSchema = new Schema({
    // Array de estados. Se irán almacenando según cambian
    status: [{
        code: {type: Number, required: true},
        status:{type: String, require: true},
        date:   {type: Date, required: true}
    }], 
    user:   {type: Schema.ObjectId,ref: "User", required: [true, 'El usuario es obligatorio']},
    plane:  {type: Schema.ObjectId,ref: "Plane", required: [true, 'El avión es obligatorio']},
    comments:    String,
    initScheduled:   Date,
    endScheduled:   Date,
    initActual:     Date,
    endActual:      Date,
    initHourmeter:  Number,
    endHourmeter:   Number,
    peopleOnBoard:  Number,
    needInstructor: Boolean
})


module.exports = mongoose.model('Flight',FlightSchema)