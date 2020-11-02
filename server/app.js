const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const connection = require('./initialize')();

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
    connection.query("SELECT SQL_CALC_FOUND_ROWS * FROM feedtable", (err, res) => {
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
    connection.query(`SELECT SQL_CALC_FOUND_ROWS * FROM feedtable LIMIT ${pageLimit} OFFSET ${page * pageLimit}`, (err, res) => {
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
    connection.query(query, (err, res) => {
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
    connection.query(`SELECT SQL_CALC_FOUND_ROWS * FROM feedtable ORDER BY ${sortByValue} ASC LIMIT ${pageLimit} OFFSET ${page * pageLimit}`, (err, res) => {
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
        connection.query(`SELECT SQL_CALC_FOUND_ROWS * FROM feedtable WHERE name LIKE "${stringValue}" ORDER BY ${sortByValue} ASC LIMIT ${pageLimit} OFFSET ${page * pageLimit}`, (err, res) => {
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
    connection.query(`SELECT FOUND_ROWS()`, (err, res) => {
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
