const lambda = require('./lambda');

const event = {
  httpMethod: 'GET',
  path: '/device',
  queryStringParameters: {},
  body: null,
  headers: {
    'Content-Type': 'application/json',
  },
};

const context = {
  functionName: 'localTestFunction',
  awsRequestId: 'localRequestId',
  succeed: (response) => {
    console.log('Success Response:', JSON.stringify(response, null, 2));
  },
};

// mock call lambda function
lambda.handler(event, context, (err, result) => {
  if (err) {
    console.error('Error:', err);
  } else {
    console.log('Result:', JSON.stringify(result, null, 2));
  }
});
