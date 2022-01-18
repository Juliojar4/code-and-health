const Medic = require('../models/Medic');
const jwt = require('jsonwebtoken');

//* Helpers
const creatToken = require("../helpers/creat_token");
const getToken = require('../helpers/getToken');
//* Validadors
const validatorEmail = require("email-validator");
const validatorCpf = require('cpf-cnpj-validator');
const validador = require('../helpers/validate')

module.exports = class medicControllers {

    static async register(req, res) {

        const { name, age, crm, contact, email, rg, cpf, available, password, confpassword } = req.body;

        //console.log(Medic.schema.obj); 
        const valida = validador.validate(req, Medic)
        
        if (!valida) {
            console.log('estou no valida')
        }

        //? Mask of cpf
        

        const medic = new Medic({
            name: name,
            age: age,
            crm: crm,
            contact:contact,
            email: email,
            rg: rg,
            cpf: cpf,
            available: available,
            password:password
            
        })
        try {
            const newMedic = await medic.save()
            await creatToken(newMedic, req, res) 

        } catch (err) {
            res.status(500).json({ message: err })
        }
    }

    static async login(req, res) {
        const email = req.body.email
        const senha = req.body.password

        if (email) {
            const validador = validatorEmail.validate(email)
            if (!validador) {
                res.status(422).json({ message: 'Email invalido' })
                return               
        }
        } else {
            res.status(422).json({ message: 'O campo email é obrigatorio' })
            return            
        }

        const medic = await Medic.findOne({ email: email })

        if (!medic) {
            res.status(422).json({ message: 'Email ou senha incorretas' })
            return   
        }

        // const checkPassword = await Medic.findOne({ password: senha})
        
        if (senha !== medic.password) {
            res.status(422).json({ message: 'Email ou senha incorretas' })
            return
        }

        await creatToken({
            id: medic.id,
            email: medic.email
        }, req, res)
    }
    static async checkMedic(req, res) {
    let currentUser

    console.log(req.headers.authorization)

    if (req.headers.authorization) {
      const token = getToken(req)
      const decoded = jwt.verify(token, 'secret')

      currentUser = await Medic.findById(decoded.id)

      currentUser.password = undefined
    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

    static async medicById(req, res) {
        const id = req.params.id

        const medic = await Medic.findById(id)
        
        if (!medic) {
            res.status(422).json({ message: 'Usuario não encontrado' })          
            return
        }

        res.status(200).json({ medic })
    } 
}
