const router = require('express').Router();

const medicControllers = require('../controllers/medicControllers');
const valida = require('../helpers/validate')


router.post('/register', medicControllers.register);
router.get('/:id', medicControllers.medicById);
router.post('/login', medicControllers.login);
router.get('/check', medicControllers.checkMedic);
router.post('/valida', valida.validate);


module.exports = router;

