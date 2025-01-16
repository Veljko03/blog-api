const { Router } = require("express");
const { createNewUser } = require("../controllers/sign-in-controller");
const router = Router();

router.post("/", createNewUser);

module.exports = router;
