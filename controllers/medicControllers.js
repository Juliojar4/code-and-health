const Medic = require('../models/Medic')
const jwt = require('jsonwebtoken');

//* Helpers
const creatToken = require("../helpers/creat_token")
const getToken = require('../helpers/getToken')

//* Validadors
const validatorEmail = require("email-validator")
const validatorCpf = require('cpf-cnpj-validator')
const ValidatorRg = require('cpf-rg-validator')

module.exports = class medicControllers{

    static async register(req, res) {
        const { name, age, crm,contact ,email, rg, cpf,available,password, confpassword } = req.body 
        
        //? Validate
        if (!name) {
            res.status(422).json({ message: 'O campo nome é obrigatorio' })
            return
        }

        if (age) {
            if (age <= 21) {
                res.status(422).json({ message: 'Idade invalida' })
                return
            }
        } else {
            res.status(422).json({ message: 'O campo idade é obrigatorio' })
            return            
        }

        if (!crm) {
            res.status(422).json({ message: 'O campo crm é obrigatorio' })
            return
        }

        if (!contact) {
            res.status(422).json({ message: 'O campo telefone é obrigatorio' })
            return
        }
        
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

        if (rg) {
            const validator = ValidatorRg.rg(rg)
            if (!validator) {
                res.status(422).json({ message: 'O rg invalido' })
                    return                      
            }
        } else {
            res.status(422).json({ message: 'O campo rg é obrigatorio' })
                return
        }

        if (cpf) {
            const validator = validatorCpf.cpf.isValid(cpf)
            if (!validator) {
                res.status(422).json({ message: 'O cpf invalido' })
                    return                      
            }
        } else {
            res.status(422).json({ message: 'O campo cpf é obrigatorio' })
                return
        }

        if (!available) {
            res.status(422).json({ message: 'O Campo available é obrigatorio' })
                return   
        }

        if (!password) {
            res.status(422).json({ message: 'O Campo senha é obrigatorio' })      
            return
        }

        if (!confpassword) {
            res.status(422).json({ message: 'O Campo de confirmação de senha é obrigatorio' })      
            return    
        }

        if (password != confpassword) {
            res.status(422).json({ message: 'Ambas as senhas não são iguais' })      
            return      
        }
        
        //? Mask of cpf
        const maskcpf = validatorCpf.cpf.format(cpf)

        const medic = new Medic({
            name: name,
            age: age,
            crm: crm,
            contact:contact,
            email: email,
            rg: rg,
            cpf: maskcpf,
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

        const checkPassword = await Medic.findOne({ password: senha})
        
        if (!checkPassword) {
            res.status(422).json({ message: 'Email ou senha incorretas' })
            return
        }

        await creatToken(medic,req,res)
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



