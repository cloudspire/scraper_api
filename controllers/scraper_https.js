var request = require("request");

module.exports.download = function (url, callback, error) {
	request(url, function (err, response, html) {
		if (!err && response.statusCode == 200) {
			console.log(html);
			callback(html);
		} else {
			error(err);
		}
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