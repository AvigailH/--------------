const jwt = require("jsonwebtoken");
const user = require("../models/modelUser");

const secret = process.env.JWT_SECRET;

function createToken(req, res, next) {
  console.log("arrive func create token");
  const { name, password, email } = req.body;
  const token = jwt.sign({ name: name, password: password, email: email }, secret);
  res.accessToken = token;
  next();
}

async function auth(req, res, next) {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).send("No token provided");
    }
    const decoded = jwt.verify(token, secret);
    const user2 = await user.find({ password: decoded.password });
    req.userId = user2.userId;
    next();
  } catch (error) {
    res.status(401).send("Unauthorized");
  }
}

module.exports = { createToken, auth };
