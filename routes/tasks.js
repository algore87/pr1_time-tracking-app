/**
 * routes/ – defines your app routes and their logic
 *  defining all the routes that your app will serve. Your
 *  routes will handle web requests, serve your templates
 *  to the user and interact with your models to process and
 *  retrieve data. It’s the glue which connects and controls
 *  your web app.
 * @type {*|Mongoose}
 */
const express = require('express')
    , router = express.Router()
    , Task = require('../models/task');

// route middleware to validate :params or other request-related stuff
// router.param


/**
 * REST: [CR]UD
 * Route: /tasks
 * POST: Add new task.
 * GET: Get all tasks.
 */
router.route('/tasks')

    .post((req, res) => {
        // input validation @ model

        const newTask = new Task(req.body);
        newTask.save()
            .then(task => {
                res.json(task);
            })
            .catch(err => {
                res.status(400);
                res.send(err);
            })
    })
    .get((req, res) => {
        // ?format=csv route: Download list of tasks as .csv file
        if (req.query.format === "csv") {
            res.status(200);
            res.attachment('tasks.csv');
            Task.find().sort({ _id : 1 }).limit(100).csv(res);
        }

        Task.find({})
            .then(tasks => {
                res.json();
            })
            .catch(err => {
                res.status(400);
                res.send(err);
            })
    });

/**
 * REST: C[RUD]
 * Route: /tasks/<id>
 * GET: Get task with <id>.
 * DELETE: Delete task with <id>.
 * PATCH: Update task with <id>.
 */
router.route('/tasks/:id')

    .get((req, res) => {
        Task.findById(req.params.id)
            .then(task => {
                if (!task) throw err; // task not found
                res.json(task);
            })
            .catch(err => {
                res.status(404);
                res.json({
                    message: 'Task with id ' + req.params.id + " not found.",
                    error: true
                });
            });
    })
    .put((req, res) => { // REST for changing a resource but not recreating it
        Task.findById(req.params.id)
            .then(task => {
                if(!task) throw err; // task not found
                Object.assign(task, req.body).save()
                    .then(task => {
                        res.json(task);
                    })
                    .catch(err => { // How to get there?
                        res.status(400);
                        res.send(err);
                    })
            })
            .catch(err => {
                res.status(404);
                res.send(err);
            });
    })
    .delete((req, res) => {
        Task.findByIdAndRemove(req.params.id)
            .then((task) => {
                if(!task) throw err; // task not found
                // REST Response for deleting content
                res.status(204);
                res.send('');
            })
            .catch(err => {
                res.status(404);
                res.send(err);
            });
    });

module.exports = router;