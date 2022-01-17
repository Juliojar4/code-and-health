var jwt = require('jsonwebtoken');

const create_token = async (user, req, res) => {
    
    const token = jwt.sign({
        name: user.name,
        id: user._id,  
    }, 'secret')
    res.status(200).json({
        message: "Voce está autenticado",
        token: token,
        userId:user._id
    })
}

module.exports = create_token

