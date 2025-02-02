const express = require("express");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
require("dotenv").config();

const app = express();

app.use(awsServerlessExpressMiddleware.eventContext());

const deviceRoutes = require("./routes/device");
const settingRoutes = require("./routes/setting");

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

  if (req.apiGateway) {
    const event = req.apiGateway.event;
    process.env["DATABASE_HOST"] = event.stageVariables.DATABASE_HOST;
    process.env["DATABASE_DB"] = event.stageVariables.DATABASE_DB;
    process.env["DATABASE_USER"] = event.stageVariables.DATABASE_USER;
    process.env["DATABASE_PORT"] = event.stageVariables.DATABASE_PORT;
    process.env["DATABASE_PASSWORD"] = event.stageVariables.DATABASE_PASSWORD;
    process.env["ENV"] = event.stageVariables.ENV
      ? event.stageVariables.ENV
      : null;
  }

  next();
});

app.use("/device", deviceRoutes);
app.use("/setting", settingRoutes);

if (process.env.PORT) {
  app.listen(process.env.PORT);
  console.log("Express started on port " + process.env.PORT);
}

module.exports = app;
