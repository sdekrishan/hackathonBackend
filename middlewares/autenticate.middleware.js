const User = require("../Modals/user.modal");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const hashKey = process.env.SECRET_KEY;


const isAuthenticated = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).send({ message: "Please login !!" });
  }

  try {
    const decodedData = jwt.verify(token, hashKey);
    req.body.user = await User.findById(decodedData.userID);
    next();
  } catch (error) {
    return res.status(401).send({ error: error.message });
  }
};

module.exports = isAuthenticated;