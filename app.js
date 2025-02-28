const express = require('express');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const process = require('process');

const app = express();
app.use(awsServerlessExpressMiddleware.eventContext());
require('dotenv').config();

const deviceRoutes = require('./functions/main/src/routes/device');
const settingRoutes = require('./functions/main/src/routes/setting');
const userProfileRoutes = require('./functions/main/src/routes/user-profile');
const weightDateRoutes = require('./functions/main/src/routes/weight-date');

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: false, limit: '5mb' }));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('withCredentials', '*');

  if (req.apiGateway && req.apiGateway.event) {
    const event = req.apiGateway.event;
    if (event && event.stageVariables) {
      process.env['DATABASE_HOST'] = event.stageVariables.DATABASE_HOST;
      process.env['DATABASE_DB'] = event.stageVariables.DATABASE_DB;
      process.env['DATABASE_USER'] = event.stageVariables.DATABASE_USER;
      process.env['DATABASE_PORT'] = event.stageVariables.DATABASE_PORT;
      process.env['DATABASE_PASSWORD'] = event.stageVariables.DATABASE_PASSWORD;
    }
  }

  next();
});

app.use((req, res, next) => {
  console.log(`${req.method}\t${req.url} at ${new Date().toISOString()}`);
  if (req.method == 'POST' || req.method == 'PATCH' || req.method == 'PUT') console.log(req.body);
  next();
});

app.use('/device', deviceRoutes);
app.use('/user-profile', userProfileRoutes);
app.use('/setting', settingRoutes);
app.use('/weight-date', weightDateRoutes);

if (process.env.PORT) {
  app.listen(process.env.PORT);
  console.log('Express started at http://localhost:' + process.env.PORT);
}

module.exports = app;
