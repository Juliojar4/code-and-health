const express = require('express')
const app = express()

app.use(express.json())

const medicRoutes = require('./routes/medicRouts')
const patientRoutes = require('./routes/patientRoutes')

app.use('/medic', medicRoutes)
app.use('/patient', patientRoutes)

app.listen(3000)