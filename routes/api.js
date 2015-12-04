var express = require('express');
var mongoose = require('mongoose');
var api = express.Router();
var Actvity = require('./../models/activity');
var User = require('../models/user');

api.post('/addActivity', function (req, res) {

	var userActivity = req.body;

	User.findOne({'local.email' : userActivity.userEmail}, function(err, user){
		if(err) {
			res.statut(500).send('Error DB : cant find user.')
		}

		var newActvity = new Actvity();
		newActvity.user_id = user._id;
		newActvity.name = userActivity.name;
		newActvity.start_at = new Date();
		newActvity.last_modified = new Date();
		
		newActvity.save(function(err){
			if(err) {
				res.statut(500).send('Error DB : cant save activity');
			}
			res.send(userActivity);
		});
	});
});

api.get('/getActivities', function(req, res) {
	
	User.findOne({'local.email' : req.user.local.email}, function(err, user){

		if(err) {
			res.statut(500).send('Error DB : cant find user.')
		}

		Actvity.find({'user_id' : user._id}, function(err, activities){
			if(err) {
				res.statut(500).send('Error DB : cant find activities');
			}
			res.send(activities);
		});
	});
	
});

module.exports = api;