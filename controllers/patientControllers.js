const Patient = require('../models/patient')

//* Helpers
const creatToken = require("../helpers/creat_token")
const getToken = require("../helpers/getToken")
const medic_by_token = require("../helpers/get_medic_by_token")

//* Validadors
const validatorEmail = require("email-validator")
const validatorCpf = require('cpf-cnpj-validator')
const ValidatorRg = require('cpf-rg-validator')

module.exports = class patientControllers {

    static async register(req, res) {
        const { name, age, height, email, rg, cpf,complaint } = req.body
        
        //? Validate
        if (!name) {
            res.status(422).json({ message: 'O campo nome é obrigatorio' })
            return
        }

        if (age) {
            if (age <= 5) {
                res.status(422).json({ message: 'Idade invalida' })
                return
            }
        } else {
            res.status(422).json({ message: 'O campo idade é obrigatorio' })
            return
        }

        if (!height) {
            res.status(422).json({ message: 'O campo peso é obrigatorio' })
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


        if (!complaint) {
            res.status(422).json({ message: 'Deixa sua queixa' })
            return  
        }


        //? Mask of cpf
        const maskcpf = validatorCpf.cpf.format(cpf)

        const token = getToken(req)
        const medic = await medic_by_token(token)

        const patient = new Patient({
            name: name,
            age: age,
            height:height,
            email: email,
            rg: rg,
            cpf: maskcpf,   
            complaint: complaint,
            medic: {
                _id: medic.id,
                name: medic.name,
                contact: medic.contact,
                email: medic.email
            },
        })
        try {
            console.log(medic.available)
            const newpatient = await patient.save()
            await creatToken(newpatient, req, res)

        } catch (err) {
            res.status(500).json({ message: err })
        }
    }
}
