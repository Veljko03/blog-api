const pool = require("../db/pool");

function getUserByID(req, res) {
  res.json("cao " + req.params.userID);
}

function createUser(req, res) {}

module.exports = { getUserByID, createUser };
