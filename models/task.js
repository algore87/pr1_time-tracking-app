/**
 * models/ – represents data, implements business logic and handles storage
 * contain all the methods and functions which will handle your data.
 * should return model specific errors.
 * @type {*|Mongoose}
 */

const mongoose = require('mongoose'),
      Schema = mongoose.Schema,
      autoIncrement = require('mongoose-auto-increment'),
      csv = require('mongoose-csv'),
      config = require('config');

// Setting up and connecting to the database with Promises
mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useMongoClient: true });

const db = mongoose.connection;
autoIncrement.initialize(db);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("auto-increment plugin loaded...");
    console.log("mongoose-csv plugin loaded...");
    console.log("connected to mongo with mongoose");
});

/**
 * Schema
 * @type {Mongoose}
 */
// http://mongoosejs.com/docs/2.7.x/docs/validation.html
const TaskSchema = new Schema({
    title               : { type: String,
                            required: [true, 'Title required'],
                            minlength: [5, 'Title too short. Minimum: 5 characters'],
                            maxlength: [50, 'Title too long. Maximum: 50 characters'],
                            trim: true,
                            validate: [cantStartWithDollarSign, 'String should not start with $']},
    description         : { type: String,
                            minlength: [10, 'Description too short. Minimum: 10 characters'],
                            maxlength: [200, 'Description too long. Maximum: 200 characters'],
                            trim: true,
                            validate: [cantStartWithDollarSign, 'String should not start with $']},
    active              : { type: Boolean,
                            default: true },
    type                : { type: String,
                            enum: ['Task', 'Event'],
                            default: 'Task'},
    created_at          : { type: Date, required: true, default: Date.now()},
    started_at          : { type: Date, required: true, default: Date.now()},
    stopped_at          : { type: Date, required: false,
                            validate: [cantStoppedBeforeStarted, 'started_at date must be before stopped_at date']}
});

// Validate stopped_at
function cantStoppedBeforeStarted(stopped_at) {
    return this.started_at <= stopped_at;
}

// Validate String to not be script-code
function cantStartWithDollarSign(string) {
    return !string.startsWith('$');
}

// Plugin to auto_increment id values by creation.
TaskSchema.plugin(autoIncrement.plugin, 'Task');
// Task_Schema.plugin(autoIncrement.plugin, { model: 'Task', field: 'id' }); maps _id to id

// Plugin to generate CSV from mongoose schema
TaskSchema.plugin(csv);

// register model & make it available. "Task" looks for plural collection in db => tasks
module.exports = mongoose.model('Task', TaskSchema);