const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");

const createNewUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;
  if ((!email || !username, !password)) {
    res.status(401).json("nesto fali");
  }
  bcrypt.hash(password, 10, async (err, hashedPassword) => {
    if (err) {
      return;
    }
    try {
      const newUser = await db.createNewUser(email, username, hashedPassword);
      res.json(newUser);
    } catch (error) {
      res.json(error);
    }
  });
});

module.exports = { createNewUser };
