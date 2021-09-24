const { Pool } = require('pg');
require("dotenv-flow").config();

let localPoolConfig ={
    user: process.env.LOCAL_DB_USERNAME,
    host: process.env.LOCAL_DB_HOST,
    database: process.env.LOCAL_DB_NAME,
    password: process.env.LOCAL_DB_PASSWORD,
    port: process.env.LOCAL_DB_PORT,
  }

const poolConfig=process.env.LIVE_DATABASE_URL1?{connectionString:process.env.LIVE_DATABASE_URL1,ssl: {rejectUnauthorized:false}}:localPoolConfig;
const pool = new Pool(poolConfig);
module.exports = pool;


