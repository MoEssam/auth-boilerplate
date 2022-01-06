require("dotenv").config();
require("./db/db");
const express = require("express");
const userRoute = require("./routes/users");

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log("Example app listening at http://localhost:" + port);
});
