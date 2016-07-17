var express = require('express');
var router = express.Router();
var qs = require('querystring');
var http = require("http");
var auth = require('node-session-tokens')();
var partials = require('../controllers/partials');

router.get('/', function(req, res) {
	console.log('starting');
	partials.admin_partials(function(data) {
		res.status(200).json(data);
	}, 
	function (err) {
		console.dir(err);
		res.status(500).send('unknown error');
	});
});

module.exports = router;