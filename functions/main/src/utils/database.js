const mariadb = require('mariadb');
require('dotenv').config();

let pool = null;
BigInt.prototype.toJSON = function () {
  return parseInt(this);
};
/**
 * Create a new pool connection with DB
 * @returns connection
 */
let getConnection = async () => {
  try {
    let e = new Error();
    let frame = e.stack.split('\n')[2]; // change to 3 for grandparent func
    let lineNumber = frame.split(':').reverse()[1];
    let functionName = frame.split(' ')[5];
    console.log(functionName + ':' + lineNumber);

    if (!pool) {
      let connectionConfig = {
        host: process.env.DATABASE_HOST, // RDS Proxy endpoint
        user: process.env.DATABASE_USER, // DB username
        database: process.env.DATABASE_DB, // DB username
        ssl: { rejectUnauthorized: false },
        password: process.env.DATABASE_PASSWORD,
        authSwitchHandler: function () {
          console.log('Setting new auth handler.');
        },
        bigIntAsNumber: true,
        connectionLimit: 2,
        idleTimeout: 5,
        decimalAsNumber: true,
        acquireTimeout: 3000,
      };
      // Adding the mysql_clear_password handler
      connectionConfig.authSwitchHandler = (data, cb) => {
        if (data.pluginName === 'mysql_clear_password') {
          console.log('pluginName: ' + data.pluginName);
          let password = process.env.DATABASE_PASSWORD + '\0';
          cb(null, password);
        }
      };

      pool = mariadb.createPool(connectionConfig);
      await new Promise((resolve) => setTimeout(resolve, 100));
      if (pool.totalConnections() < 1) {
        console.log('requesting a new pool');
        await new Promise((resolve) => setTimeout(resolve, 50));
        pool = mariadb.createPool(connectionConfig);
      }
    }
    // Log
    console.log('Total connections: ', pool.totalConnections());
    console.log('Active connections: ', pool.activeConnections());
    console.log('Idle connections: ', pool.idleConnections());

    return await pool.getConnection();
  } catch (e) {
    console.error(e);
  }
};

/**
 * Generate string of values to use on SQL Queries
 * @param {string} arr
 * @returns
 */
let generateSQLSet = (arr) => {
  arr = arr.filter((item) => item);
  return arr.length === 1 ? `(${arr[0]})` : `(${arr.join(', ')})`;
};

/**
 * Convert value to boolean
 * @param {boolean} obj
 * @returns
 */
let getBool = (obj) => {
  return !!(obj.data && obj.data[0]);
};

/**
 * Run SQL Statement
 * @param {string} query
 * @param {Array} array
 * @returns
 */
let runQuery = async (query, array) => {
  let conn = await getConnection();
  try {
    const [rows] = await conn.query(query, array);
    return rows;
  } finally {
    await conn.release();
  }
};

/**
 * Start transaction on DB
 */
let startTransaction = async () => {
  return await getConnection().beginTransaction();
};

/**
 * Run query transaction
 * @param {string} query
 * @param {Array} array
 * @param {Connection} conn
 */
let runQueryTransaction = async (query, array, conn) => {
  try {
    const [rows] = await conn.query(query, array);
    console.log(rows);
    return rows;
  } finally {
    await conn.release();
  }
};

/**
 * Finalize and commit transaction
 * @param {Connection} conn
 */
let commitTransaction = async (conn) => {
  return conn.commit();
};

module.exports = {
  getConnection: getConnection,
  generateSQLSet: generateSQLSet,
  getBool: getBool,
  runQuery: runQuery,
  startTransaction: startTransaction,
  runQueryTransaction: runQueryTransaction,
  commitTransaction: commitTransaction,
};
