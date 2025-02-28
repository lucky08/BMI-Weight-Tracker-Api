# BMI Weight Tracker Api

BMI Weight Tracker API is a project based on AWS Lambda functions. This repository stores all functions related to the businness logic and managament.

Each function is create utilizing the SAM provided by AWS and contains their own `node_modules` folder.

# How execute the project

[Local configurations](./docs/functions.md)

# Documentation

- [File Structure](./docs/files-structure.md)

- [Functions](./docs/functions.md)

- [Patterns]()
  - [Controllers](./docs/patterns/controllers.md)
  - [Models](./docs/patterns/models.md)
  - [Routes](./docs/patterns/routes.md)

# Migrations

- Install knex

  `npm install knex -g`

- Apply migrations with console command

  `knex migrate:latest`

- Apply migrations on production with console command

  `knex migrate:latest --env production`

- Create a new migration

  ` migration_name`
