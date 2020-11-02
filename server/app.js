var mysql = require('mysql');
const path = require('path');
const db = require('./db');
const jsonData = require('./data/mock_data.json');

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const pageLimit = 6;

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));

// simple route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Feed API."
    });
});

app.get("/api/all", (req, result) => {
    con.query("SELECT SQL_CALC_FOUND_ROWS * FROM feedtable", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("api/all CALLED");
        result.status(200).send(res);
    });
});

app.get("/api/:page", (req, result) => {
    const page = req.params.page;
    console.log('XXXXXXXXXXXXXXXXXXXXX PAGE', page);
    con.query(`SELECT SQL_CALC_FOUND_ROWS * FROM feedtable LIMIT ${pageLimit} OFFSET ${page * pageLimit}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`api/${page} CALLED`);
        result.status(200).send(res);
    });
});

app.get("/api/:page/:string", (req, result) => {
    let stringValue = req.params.string;
    const page = req.params.page | 0;
    if(stringValue[0] === '"' && stringValue[stringValue.length - 1] === '"') {
        stringValue = stringValue.replace(/\"/g, '%');
    } else {
        stringValue = stringValue.split(' ').map((item) => {
            return `%${item}%`;
        }).join(' ');
    }
    const query = `SELECT SQL_CALC_FOUND_ROWS * FROM feedtable WHERE name LIKE "${stringValue}" LIMIT ${pageLimit} OFFSET ${page * pageLimit}`;
    con.query(query, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`api/${page}/${stringValue} CALLED: ${query}`);
        result.status(200).send(res);
    });
});

app.get("/sort/:sortBy/api/:page", (req, result) => {
    const page = req.params.page;
    const sortByValue = req.params.sortBy;
    con.query(`SELECT SQL_CALC_FOUND_ROWS * FROM feedtable ORDER BY ${sortByValue} ASC LIMIT ${pageLimit} OFFSET ${page * pageLimit}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        console.log(`WITHOUT STRING sort/${sortByValue}api/${page} CALLED`);
        result.status(200).send(res);
    });
});

app.get("/sort/:sortBy/api/:page/:string", (req, result) => {
    const page = req.params.page;
    const sortByValue = req.params.sortBy;
    let stringValue = req.params.string;
    if (stringValue) {
        if(stringValue[0] === '"' && stringValue[stringValue.length - 1] === '"') {
            stringValue = stringValue.replace(/\"/g, '%');
        } else {
            stringValue = stringValue.split(' ').map((item) => {
                return `%${item}%`;
            }).join(' ');
        }
        con.query(`SELECT SQL_CALC_FOUND_ROWS * FROM feedtable WHERE name LIKE "${stringValue}" ORDER BY ${sortByValue} ASC LIMIT ${pageLimit} OFFSET ${page * pageLimit}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }
            console.log(`sort/${sortByValue}api/${page}/${stringValue} CALLED`);
            result.status(200).send(res);
        });
    }
});

app.get("/api-count", (req, result) => {
    con.query(`SELECT FOUND_ROWS()`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`api/count CALLED`);
        result.status(200).send(res);
    });
});


// set port, listen for requests
app.listen(3000, () => {
    console.log("Server is running on port 3000.");
});

var con = mysql.createConnection({
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

    // util.importJson("/path_to_file/zips.json", {schema: "test", table: "zips_collection"});
});