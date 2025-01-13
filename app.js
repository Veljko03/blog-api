const express = require("express");
const { user } = require("./routes");
const app = express();

app.use("/users", user);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => console.log("app runnning"));
