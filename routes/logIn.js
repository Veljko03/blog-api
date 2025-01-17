const { Router } = require("express");
const { logIn } = require("../controllers/log-in-controller");
const passport = require("passport");
const router = Router();

router.post("/", logIn);
// router.get(
//   "/login/federated/google",
//   passport.authenticate("google"),
//   (req, res) => {
//     res.json({ message: "Ovo je zaštićena ruta za google!", user: req.user });
//   }
// );

router.get(
  "/protected-data",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({ message: "Ovo je zaštićena ruta!", user: req.user });
  }
);

module.exports = router;
