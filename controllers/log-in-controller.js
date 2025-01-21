const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const db = require("../db/queries");
require("dotenv").config();

const logIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ message: "Please enter email and passowrd" });
  }

  const user = await db.getUserByEmail(email);
  if (!user) {
    res.status(400).json({ message: "Email or password are wrong" });
  }

  const validatePassword = await bcrypt.compare(password, user.password_hash);
  if (!validatePassword) {
    res.status(400).json({ message: "Email or password are wrong" });
  }

  const token = jwt.sign({ user }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
  const result = { token, user };
  res.json(result);
});

module.exports = { logIn };
