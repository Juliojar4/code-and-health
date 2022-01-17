const jwt = require("jsonwebtoken");

const Medic = require("../models/Medic");

// get user by jwt token
const getUserByToken = async (token) => {
  if (!token) {
    return res.status(401).json({ error: "Acesso negado!" });
  }
  // find user
  const decoded = jwt.verify(token, "secret");

  const userId = decoded.id;

  const user = await Medic.findOne({ _id: userId });

  return user;
};

module.exports = getUserByToken;