const asyncHandler = require("express-async-handler");
const db = require("../db/queries");

function getUserByID(req, res) {
  res.json("cao " + req.params.userID);
}

const createUser = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const user = await db.createUserTest(name);

  res.json(user);
});

module.exports = { getUserByID, createUser };
