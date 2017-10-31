'use strict';
const express = require('express')
    , router = express.Router()
    , Task = require('../models/task');

/* Landing page / (index) */
router.get('/', (req, res) => {
        res.send("<h1>Time-Tracking REST API</h1><p>Access at <em>/api/tasks</em></p>");
});

router.use('/api', require('./tasks')); // all of our ./tasks routes will be prefixed with /api and register all routes in ./tasks

module.exports = router;
