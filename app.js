const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.use(function (req, res, next) {
    console.log('Time:', Date.now());
    next(); // without next() the other middleware will not get handled (middleware cycle interrupted)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); // helps us to use :id (req.params) on the requests

app.use(require('./routes/index')); // register routes in ./routes/index.js

module.exports = app;
