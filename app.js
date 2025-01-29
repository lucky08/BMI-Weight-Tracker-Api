const express = require("express");
const process = require("process");

const app = express();
require("dotenv").config();

const deviceRoutes = require("./functions/device/src/routes/device");

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  res.setHeader("withCredentials", "*");
  next();
});

app.use((req, res, next) => {
  console.log(`${req.method}\t${req.url} at ${new Date().toISOString()}`);
  if (req.method == "POST" || req.method == "PATCH" || req.method == "PUT")
    console.log(req.body);
  next();
});

app.use("/device", deviceRoutes);

if (process.env.PORT) {
  app.listen(process.env.PORT);
  console.log("Express started at http://localhost:" + process.env.PORT);
}

module.exports = app;
