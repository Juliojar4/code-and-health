const mongoose = require('../db/conn')
const { Schema } = mongoose

const Medic = mongoose.model(
    'Medic',
    new Schema({
        name: {
            type: String,
            required: true
        },

        age: {
            type: Number,
            required: true
        },
        contact: {
            type: String,
            required: true
        },

        crm: {
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
        available: {
            type: Boolean,
            defaultValue: true,
        },
        password: {
            type: String,
            required:true
        },
    },
    { timeseries:true }
    )
)

module.exports = Medic
