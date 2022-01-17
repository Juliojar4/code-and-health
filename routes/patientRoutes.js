const router = require('express').Router()

const patientControllers = require('../controllers/patientControllers')

router.post('/register', patientControllers.register)



module.exports = router
