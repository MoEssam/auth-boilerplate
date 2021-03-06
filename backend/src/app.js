require("dotenv").config();
require("./db/db");
const express = require("express");
const userRoute = require("./routes/users");

const app = express();
app.use(express.json());

const port = process.env.PORT;

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", userRoute);

app.listen(port, () => {
  console.log("Auth system listening at http://localhost:" + port);
});
