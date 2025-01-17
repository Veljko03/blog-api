const { Router } = require("express");
const signInController = require("../controllers/sign-in-controller");
const router = Router();

router.post("/", signInController.createNewUser);

module.exports = router;
