const express = require("express");
const { user, post } = require("./routes");
const app = express();

app.use(express.json());
app.use("/users", user);
app.use("/posts", post);
app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(3000, () => console.log("app runnning"));
