const router = require('express').Router()

const medicControllers = require('../controllers/medicControllers')

router.post('/register', medicControllers.register)
router.get('/:id', medicControllers.medicById)
router.post('/login', medicControllers.login)
router.post('/check', medicControllers.checkMedic)


module.exports = router

