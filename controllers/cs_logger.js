var express = require('express');
var mkdirp = require("mkdirp");
var fs = require("fs");
var moment = require('moment')();

module.exports.log = function (req) {
	var date_dir = 'logs/' + moment.format('YYYY/MM/DD/HH/');
	var date_file = 'request_' + moment.format('mmss') + guid();
	var obj = {};
	obj.headers = req.headers;
	obj.body = req.body;
	obj.baseUrl = req.baseUrl;
	obj.path = req.path;
	obj.hostname = req.hostname;
	obj.ip = req.ip;
	obj.originalUrl = req.originalUrl;
	log_request(date_dir, date_file, obj);
}

function log_request(path, fName, contents) {
	mkdirp(path, function (err) {
		if (err) {
			console.log('mkdirp error: ' + err);
		} else {
			console.log('logging to file: ' + path + '/' + fname);
			fs.writeFile(path + '/' + fname, JSON.stringify(contents, null, 4), callback);
		}
	});
}


function guid() {
	function rand() {
		return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
	}
	return rand() + rand() + rand() + rand();
}