# BMI Weight Tracker API - Routes

## Overview

In the BMI Weight Tracker API, routes are used to define the endpoints through which the API interacts with clients. These routes map HTTP methods (GET, POST, PATCH, DELETE, etc.) to specific controller functions that handle the incoming requests.

## What is a Route?

A route is a segment of Express code that:

- Maps an HTTP method (such as GET, POST, PATCH, or DELETE) to a URL path or pattern.
- Connects the request to a controller function that handles the business logic.

## Prerequisites

To implement routes in this project, ensure you have Express installed:

```
npm install express
```

### Importing Dependencies

Start by importing the necessary modules:

```JavaScript
// Importing Express
const express = require('express');

// Importing the controller
const EntityController = require('../controllers/device');
```

### Creating a Router Object

Create a new router object using Express:

```Javascript
// Creating the router object
const router = express.Router();
```

## Routes Examples

### /GET /:id

Handles a GET request with an id as a URL parameter and calls the findById method of the controller:

```Javascript
router.get("/:id", EntityController.findById);
```

### /GET /

Handles a GET request without any parameters and calls the findAll method of the controller:

```Javascript
router.get("/", EntityController.findAll);
```

### /POST /

Handles a POST request with a request body containing the object data, and calls the create method of the controller:

```Javascript
router.post("/", EntityController.create);
```

### /PATCH /:id

Handles a PATCH request with an id as a URL parameter and calls the update method of the controller:

```Javascript
router.patch("/:id", EntityController.update);
```

### /DELETE /:id

Handles a DELETE request with an id as a URL parameter and calls the delete method of the controller:

```Javascript
router.patch("/:id", EntityController.delete);
```

### Exporting the Router

Finally, export the router module so it can be used in other parts of the application:

```Javascript
module.exports = router;
```

### Summary

- Router Object: Created using express.Router().
- HTTP Methods: Handled with GET, POST, PATCH, and DELETE.
- Controller Methods:
  - findById: Fetches a record by ID.
  - findAll: Retrieves all records.
  - create: Adds a new record.
  - update: Modifies an existing record.
  - delete: Removes a record by ID.
- Module Export: Ensures the router is reusable throughout the application.

### Next Steps

- Integrate this route module into the main application file (e.g., app.js).
- Implement the corresponding controller methods in device.js.
- Test the routes using a tool like Postman or Insomnia.

This setup provides a RESTful API structure for managing BMI and weight tracking records.
