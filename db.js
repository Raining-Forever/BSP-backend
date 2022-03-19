const Pool = require("pg").Pool;

// const pool = new Pool({
//   user: "postgres",
//   password: "admin",
//   database: "bsp",
//   host: "localhost",
//   port: "5432",
// });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DATABASE_URL ? true : false,
});

module.exports = pool;
