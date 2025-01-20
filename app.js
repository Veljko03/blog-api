const express = require("express");
const { post, signIn, logIn } = require("./routes");
const app = express();
const passport = require("passport");
require("./config/passport");
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/posts", post);
app.use("/log-in", logIn);
app.use("/sign-in", signIn);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => console.log("app runnning"));
