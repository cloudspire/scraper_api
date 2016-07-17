var express = require('express');
var http = require("http");
var qs = require('querystring');
var cheerio = require('cheerio');

module.exports.download = function (url, callback, error) {
	http.get(url, function(res) {
		if (res.statusCode > 300 && res.statusCode < 400 && res.headers.location) {
			callback('Redirect found - please try adding "www." before the domain, or adding the flag "https=true" to your query string.');
		} else {
			var data = "";
			res.on('data', function (chunk) {
				data += chunk;
			});
			res.on("end", function() {
				callback(data);
			});
		}			
	}).on("error", function(data) {
		console.log('error downloading html content');
		error(data);
	});
}

module.exports.remove_origin = function($, html) {
	var resources = [];
	var scripts = [];
	$(html).find('img').each(function(i, img) {
		resources.push($(this).attr('src'));
	});
	$(html).find('script').each(function(i, scpt) {
		if ($(this).attr('src') != null) {
			resources.push($(this).attr('src'));
		} else {
			scripts.push($(this).text());
		}
	});
	$(html).find('iframe').each(function(i, frame) {
		scripts.push($(this).attr('src'));
	});
	$(html).find('frame').each(function(i, frame) {
		scripts.push($(this).attr('src'));
	});
	$(html).find('link').each(function(i, lnk) {
		resources.push($(this).attr('href'));
	});
	$(html).find('a').each(function(i, ahref) {
		resources.push($(this).attr('href'));
	});
	$(resources).each(function(i, res) {
		html = html.replace(new RegExp(res), 'about:blank');
	});
	$(scripts).each(function(i, scrpt) {
		html = html.replace(scrpt, '');
	});
	while (html.substring(0, 11) == 'about:blank') {
		html = html.substring(11);
	}
	return html;
}