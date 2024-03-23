const { timeLog } = require("console");
const connectDBEnergy = require("../config/dbEnergy");
const connectDBDevice = require("../config/dbDevice");
const fs = require("fs");

exports.daily = async (req, res) => {
  try {
    const pool = await connectDBEnergy();
    const pool1 = await connectDBDevice();
    const findDevice = await pool.query("SELECT id from device_info");
    for (const device of findDevice.rows) {
      const daily = `"${device.id}_daily"`;
      const data = await pool.query("SELECT timestamp, name, data from point_info WHERE device_id = $1",[device.id]);
      for (const item of data.rows) {
         const sql = `INSERT INTO ${daily} (timestamp, point_name, data) VALUES ($1, $2, $3)`
         const insertDaily = await pool1.query(sql,[item.timestamp, item.name, item.data]);
      }
      const  removeData = await pool1.query(`DELETE FROM ${daily} WHERE timestamp < NOW() - INTERVAL '1 day'`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.weekly = async (req, res) => {
  try {
    const pool = await connectDBEnergy();
    const pool1 = await connectDBDevice();
    const findDevice = await pool.query("SELECT id from device_info");
    for (const device of findDevice.rows) {
      const weekly = `"${device.id}_weekly"`;
      const data = await pool.query("SELECT timestamp, name, data from point_info WHERE device_id = $1",[device.id]);
      for (const item of data.rows) {
        const sql = `INSERT INTO ${weekly} (timestamp, point_name, data) VALUES ($1, $2, $3)`
        const insertWeekly = await pool1.query(sql,[item.timestamp, item.name, item.data]);
      }
      const  removeData = await pool1.query(`DELETE FROM ${weekly} WHERE timestamp < NOW() - INTERVAL '7 day'`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.monthly = async (req, res) => {
  try {
    const pool = await connectDBEnergy();
    const pool1 = await connectDBDevice();
    const findDevice = await pool.query("SELECT id from device_info");
    for (const device of findDevice.rows) {
      const monthly = `"${device.id}_monthly"`;
      const data = await pool.query("SELECT timestamp, name, data from point_info WHERE device_id = $1",[device.id]);
      for (const item of data.rows) {
        const sql = `INSERT INTO ${monthly} (timestamp, point_name, data) VALUES ($1, $2, $3)`
        const insertMonthly = await pool1.query(sql,[item.timestamp, item.name, item.data]);
      }
      const  removeData = await pool1.query(`DELETE FROM ${monthly} WHERE timestamp < NOW() - INTERVAL '1 month'`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};

exports.yearly = async (req, res) => {
  try {
    const pool = await connectDBEnergy();
    const pool1 = await connectDBDevice();
    const findDevice = await pool.query("SELECT id from device_info");
    for (const device of findDevice.rows) {
      const yearly = `"${device.id}_yearly"`;
      const data = await pool.query("SELECT timestamp, name, data from point_info WHERE device_id = $1",[device.id]);
      for (const item of data.rows) {
        const sql = `INSERT INTO ${yearly} (timestamp, point_name, data) VALUES ($1, $2, $3)`
        const insertYearly = await pool1.query(sql,[item.timestamp, item.name, item.data]);
      }
      const  removeData = await pool1.query(`DELETE FROM ${yearly} WHERE timestamp < NOW() - INTERVAL '1 year'`);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server Error");
  }
};