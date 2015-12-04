'use strict';

var mongoose = require('mongoose');

// Define the shcema.
var daySchema = mongoose.Schema({
	day: String,
	user_id: String,
    activity_id: String
});

module.exports = mongoose.model('Day', daySchema);