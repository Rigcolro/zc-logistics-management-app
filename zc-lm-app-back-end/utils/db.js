const mysql = require("mysql");
const mysqlConfig = require("../config/mysql_config");
let pool = {};
//判断是否存在连接池不用每次都创建
if (!pool.hasOwnProperty("data")) {
  pool["data"] = mysql.createPool(mysqlConfig);
}
const query = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool["data"].getConnection((err, connection) => {
      if (err) {
        console.log(err, "连接数据库失败!");
      } else {
        connection.query(sql, val, (err, results) => {
          if (err) {
            reject(err);
          } else {
            connection.release();
            resolve(results);
          }
        });
      }
    });
  });
};
const insert = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool["data"].getConnection((err, connection) => {
      if (err) {
        console.log(err, "连接数据库失败!");
      } else {
        connection.query(sql, val, (err, results) => {
          if (err) {
            reject(err);
          } else {
            connection.release();
            resolve(results);
          }
        });
      }
    });
  });
};
const update = (sql, val) => {
  return new Promise((resolve, reject) => {
    pool["data"].getConnection((err, connection) => {
      if (err) {
        console.log(err, "连接数据库失败!");
      } else {
        connection.query(sql, val, (err, results) => {
          if (err) {
            reject(err);
          } else {
            connection.release();
            resolve(results);
          }
        });
      }
    });
  });
};
module.exports = { query, insert, update };
