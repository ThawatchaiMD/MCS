const { Pool } = require("pg");

const connectDBEnergy = async () => {
  try {
    const pool = new Pool({
      user: "postgres",
      password: "123456",
      host: "localhost",
      port: 5432,
      database: "MCS+",
    });
    console.log('Connect DB TB_Energy Success');
    return pool;
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectDBEnergy



