const mysql = require('mysql');
const path = require('path');

const db = require('./db');
const jsonData = require('./data/mock_data.json');

module.exports = function () {
  const connection = mysql.createConnection({
    ...db
  });

  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    connection.query("CREATE DATABASE IF NOT EXISTS FeedData;", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    connection.query("USE FeedData;", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    connection.query(`CREATE TABLE IF NOT EXISTS feedtable (
        name VARCHAR(100) NOT NULL,
        image VARCHAR(100) NOT NULL,
        description VARCHAR(500),
        dateLastEdited VARCHAR(30)
      );`, function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    const pathToMockJson = path.join(__dirname, './data/mock_data.json');

    console.log("Mock Data Uploaded");
    jsonData.forEach((item) => {
      connection.query(`INSERT INTO feedtable VALUES ('${item.name}', '${item.image}', '${item.description}', '${item.dateLastEdited}')`, function (err, result) {
        if (err) throw err;
      });
    })
  });

  return connection;
}