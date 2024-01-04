const { Pool, Client } = require("pg");
const path = require("path");
require("dotenv").config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// const pool = new Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT,
// });

pool
  .connect()
  .then(() => {
    console.log("Connected");
    console.log("Tables Created");
  })
  .catch((error) => {
    console.log(`Error -`, error);
  });

module.exports = {
  pool,
};
