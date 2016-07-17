var view_data;
$(document).ready(function() {
	ajaxRequest({
		url: document.location.origin + "/admin_partials",
		type: "GET",
		callback: function (rslt) {
			view_data = { partials: rslt };
		},
		error: function (err) {
			loadErrorModal(err);
		}
	});	
	view_engine();
	CodeMirror.addNewLine = common.fn.addNewLine_Editor;
});

function loadHTML(link) {
	var https = 'false';
	if (link.indexOf('https://') != -1) {
		link = link.replace('https://', '');
		https = 'true';
	} else if (link.indexOf('http://') != -1) {
		link = link.replace('http://', '');
	}
	ajaxRequest({
		url: document.location.origin + '/scrape',
		type: 'POST',
		data: { 
			to_url: link,
			remove_origin: $("#remove_origin").is(":checked"),
			iso_body: $("#show_body").is(":checked"),
			https: https
		},
		callback: initializeEditors,
		error: function(err) {
			loadErrorModal(err);
		}
	});
}

function initializeEditors(data) {
	$("#html_content").html(data.data);
	$("#code_editor").html("");
	$("#javascript_editor").html("");
	$("#results_editor").html("");
	common.data.html_editor = CodeMirror(document.getElementById("code_editor"), {
		value: data.data,
		lineNumbers: true,
		mode: "htmlmixed",
		readOnly: true
	});
	common.data.javascript_editor = CodeMirror(document.getElementById("javascript_editor"), {
		//value: 'function Run_Tests() {\n\t\n}',
		value: $("#sample_functions").text().replace(/^\s+|\s+$/g, ''),
		lineNumbers: true,
		mode: "javascript"
	});
	common.data.results_editor = CodeMirror(document.getElementById("results_editor"), {
		value: 'Test Results Go Here\n------------------------\n',
		lineNumbers: true,
		mode: "text/plain",
		readOnly: true
	});
	$('.CodeMirror').css('height', '400px');
}

function loadScript() {
	if ($("#custom_script").length > 0) {
		$("#custom_script").remove();
	} 
	var script  = document.createElement('script'),
	head = document.head || document.getElementsByTagName('head')[0];
	var fnc = common.data.javascript_editor.getValue();
	$(script).text(fnc).attr('id', 'custom_script');
	script.async = false; 
	$(head).append(script);
	
	if (Run_Tests != null) {
		if (jQuery.isFunction(Run_Tests)) {
			Run_Tests();
			panel_view(2);
		}
	}
}