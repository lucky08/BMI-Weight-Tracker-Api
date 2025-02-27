# Models

This document outlines how to implement models in the BMI Weight Tracker API microservices.

## Overview

The models are the representation of objects. They are reponsible to create, select, update, delete and maniputale the database.

### Constructor

The constructor initializes a model instance using a JSON object containing all relevant attributes.

```JavaScript
const UserProfile = function (userProfile) {
  this.id = userProfile.id;
  this.userName = userProfile.userName;
  this.age = userProfile.age;
  this.gender = userProfile.gender;
  this.height = userProfile.height;
  this.uuid = userProfile.uuid;
}
```

### Methods

### getAll

**Description**: Retrieves a list of all objects.
**Parameters**: None
**Returns**: An array of objects.

### findById

**Description**: Retrieves an object by its ID.
**Parameters**: id - The ID of the object to retrieve.
**Returns**: The object corresponding to the provided ID.

### create

**Description**: Creates a new object.
**Parameters**: An object containing all necessary attributes.
**Returns**: The newly created object with all attributes populated.

### delete

**Description**: Deletes an object by its ID.
**Parameters**: id - The ID of the object to delete.
**Returns**: true if deletion was successful, false otherwise.

### Additional Methods

When creating methods that require multiple parameters, ensure the method name clearly describes its purpose.

#### Examples

### findByUuid

**Description**: Retrieves an object by its UUID.
**Parameters**: uuid - The UUID of the object to retrieve.
**Returns**: The object corresponding to the provided UUID

### updateByUuid

**Description**: Updates an object using its UUID.
**Parameters**: uuid - The UUID of the object to update.
**Returns**: The updated object.
