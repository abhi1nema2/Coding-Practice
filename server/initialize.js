const mysql = require('mysql');
const path = require('path');

const db = require('./db');
const jsonData = require('./data/mock_data.json');

module.exports = function () {
  const con = mysql.createConnection({
    ...db
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");

    con.query("CREATE DATABASE IF NOT EXISTS FeedData;", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    con.query("USE FeedData;", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    con.query(`CREATE TABLE IF NOT EXISTS feedtable (
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
      con.query(`INSERT INTO feedtable VALUES ('${item.name}', '${item.image}', '${item.description}', '${item.dateLastEdited}')`, function (err, result) {
        if (err) throw err;
      });
    })
  });
}