var ajaxRequest = function (data) {
    $.ajax({
        type: data.type,
        url: data.url,
        headers: data.headers,
        contentType: data.contentType,
        dataType: data.dataType,
        data: data.data,
        success: data.callback,
        error: data.error
    });
}

function loadErrorModal(data) {
	$("#body_main").hide();
	var err_body = compileTemplate(getErrorTemplate(), data);
    $("#errorModal_Content").html(err_body);
    $("#errorModal").modal({ 'backdrop': 'static' });
}

function view_engine() {
	$('a[view-engine="true"]').each(function(i, link) {
		$(link).click(function() {
			var hdr = $(link).attr('hdr-view');
			var panel = $(link).attr('panel-view');
			if (view_data != null) {
				if (view_data.partials[hdr] != null) {
					$('.header-second-bar').html(view_data.partials[hdr].html);
					$('a[view-panel="true"]').each(function(i2, link2) {
						if ($(link2).attr("type") == "event") {
							$(link2).click(function() {
								events.panel_events[$(link2).attr("event")]();
							});
						} else {
							$(link2).click(function() {
								var index = $(link2).attr('panel-index');
								panel_view(index);
							});
						}
					});
				}
				if (view_data.partials[panel] != null) {
					$('.admin-panel').html(view_data.partials[panel].html);
				}
				$('.header-first-bar a').removeClass('selected');
				$(link).addClass('selected');
			}
			var event_handler = $(this).attr("load-events");
			if (event_handler != null) {
				if (events[event_handler] != null) {
					events[event_handler]();
				}
			}
		});
	});
}

function panel_view(index) {
	if (index != null) {
		$('.panel-section').hide();
		$($('.panel-section')[parseInt(index)]).show();
		var cm = $($('.CodeMirror')[index], $($('.panel-section')[parseInt(index)]));
		if (cm.length > 0) {
			if (cm[0].CodeMirror != null) {
				var doc = cm[0].CodeMirror.getDoc();
				doc.cm.refresh();
			}
		}
	}
}