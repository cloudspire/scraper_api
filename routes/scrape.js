var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var scraper = require('../controllers/scraper');
var scraper_https = require('../controllers/scraper_https');

router.get('/', function(req, res) {
	if (req.query.to_url == null) {
		res.status(500).send('To URL Not Provided');
	} else {
		var transform = function(data) {
			if (data) {
				var html;
				var $ = cheerio.load(data);
				if (req.query.iso_body == "true") {
					console.log("isolating body");					
					html = String($('body'));
				} else {
					html = data;
				}
				if (req.query.remove_origin == "true") {
					console.log("removing origin");
					html = scraper.remove_origin($, html);
				}			
				if (req.query.prep_html == "true") {					
					console.log("replacing html, head, body tags with injectable tags");
					html = html.replace('<html', '<html_scraper').replace('</html>', '</html_scraper>');
					html = html.replace('<head', '<head_scraper').replace('</head>', '</head_scraper>');
					html = html.replace('<body>', '<body_scraper>').replace('</body>', '</body_scraper>');
				}
				res.status(200).json({'data': html});
			} else {
				res.status(500).send('No HTML Available');
			}
		}
		if (req.query.https == "true") {
			var url = 'https://' + req.query.to_url;
			scraper_https.download(url, transform, function(data) {
				res.status(500).send('Error Scraping HTML');
			});
		} else {
			var url = 'http://' + req.query.to_url;
			scraper.download(url, transform, function(data) {
				res.status(500).send('Error Scraping HTML');
			});
		}
	}
});

router.post('/', function(req, res) {
	if (req.body.to_url == null) {
		res.status(500).send('To URL Not Provided');
	} else {
		var transform = function(data) {
			if (data) {
				var html;
				var $ = cheerio.load(data);
				if (req.body.iso_body == "true") {
					console.log("isolating body");					
					html = String($('body'));
				} else {
					html = data;
				}
				if (req.body.remove_origin == "true") {
					console.log("removing origin");
					html = scraper.remove_origin($, html);
				}			
				html = html.replace('<html', '<html_scraper').replace('</html>', '</html_scraper>');
				html = html.replace('<head', '<head_scraper').replace('</head>', '</head_scraper>');
				html = html.replace('<body>', '<body_scraper>').replace('</body>', '</body_scraper>');
				res.status(200).json({'data': html});
			} else {
				res.status(500).send('No HTML Available');
			}
		}
		if (req.body.https == "true") {
			var url = 'https://' + req.body.to_url;
			scraper_https.download(url, transform, function(data) {
				res.status(500).send('Error Scraping HTML');
			});
		} else {
			var url = 'http://' + req.body.to_url;
			scraper.download(url, transform, function(data) {
				res.status(500).send('Error Scraping HTML');
			});
		}
	}
});

module.exports = router;