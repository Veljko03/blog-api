const { Router } = require("express");
const router = Router();
const userController = require("../controllers/userController");

router.get("/:userID", userController.getUserByID);

module.exports = router;
