const mongoose = require('../db/conn')
const { Schema } = mongoose

const Patient = mongoose.model(
    'Patient',
    new Schema({
        name: {
            type: String,
            required: true
        },

        age: {
            type: Number,
            required: true
        },

        height: {
            type: Number,
            required:true
        },

        email: {
            type: String,
            required: true
        },

        rg: {
            type: String,
            required: true
        },

        cpf: {
            type: String,
            required:true
        },
        complaint: {
            type: String,
            required: true
        },
        medic : Object  
    },
    { timeseries:true }
    )
)

module.exports = Patient
