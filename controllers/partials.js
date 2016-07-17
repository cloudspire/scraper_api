var express = require('express');
var fs = require('fs');
var __ = require('underscore');

module.exports.admin_partials = function(callback, error) {
	var root = './public/views/admin/partials';
	var errors = [];
	var partials = {};
	fs.readdir(root, function (err, files) { 
		if (err) {
			error(err);
		} else {
			var finished = __.after(files.length, function() {
				if (errors.length > 0) {
					error(errors);
				} else {
					callback(partials);
				}
			});
			files.forEach(function (file) {
				fs.readFile(root + '/' + file, function (err, data) {
					if (err) {
						errors.push(err);
						finished();
					} else {
						partials[file.replace('.html', '')] = {
							'file': file,
							'html': String(data)
						}
						finished();
					}
				});
			});
			
		}
	});	
}