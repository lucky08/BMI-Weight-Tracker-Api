## How to Execute a Function in Isolation

- Navigate to the function's source folder:
  `cd functions/main/src`

- Create the .env file and add the required environment variables:

  ```
   DATABASE_HOST='...
   DATABASE_DB='...
   DATABASE_USER='...
   DATABASE_PORT=3306
   DATABASE_PASSWORD='password'
   PORT=3000
  ```

- Install the necessary packages:

  ```
  npm install
  ```

## How to execute all the fuctions at the same time

- Run the project locally:
  `node app.js`
  Or use nodemon to automatically restart the application on file changes:
  `nodemon app.js`
