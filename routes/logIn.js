const { Router } = require("express");
const { logIn } = require("../controllers/log-in-controller");
const router = Router();

router.post("/", logIn);

module.exports = router;
