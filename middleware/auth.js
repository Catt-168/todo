const JWT = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/users");

async function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).send("No Authentication provided");
  }
  try {
    const decoded = await JWT.verify(token, config.get("jsonprivateKey"));
    req.user = decoded;
    next();
  } catch (e) {
    res.status(403).send("Wrong Token");
  }
}

module.exports = auth;
