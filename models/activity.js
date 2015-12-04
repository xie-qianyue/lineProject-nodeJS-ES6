'use strict';

var mongoose = require('mongoose');

// Define the shcema.
var activitySchema = mongoose.Schema({
	user_id: String,
    name: String,
    start_at: Date,
    last_modified: Date
});

module.exports = mongoose.model('Activity', activitySchema);