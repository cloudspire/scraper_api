var common = {
	fn: {
		addNewLine_Editor: function(data) {		
			var cm = $('.CodeMirror')[2].CodeMirror;
			var doc = cm.getDoc();
			var cursor = doc.getCursor(); 
			var line = doc.lineCount(); 
			var pos = {
				line: line,
				ch: line.length
			}
			doc.replaceRange('\n' + data, pos);
		},
		clear_editor: function() {
			var cm = $('.CodeMirror')[2].CodeMirror;
			var doc = cm.getDoc();
			doc.setValue("Test Results");
			doc.clearHistory();
		},
		run_test: function(test) {
			if (test.type == 'value') {
				CodeMirror.addNewLine(
					test.name + ':\n------------------------\n' + test.test()
				); 
			}
		}
	},
	data: {
		code_editor: null,
		javascript_editor: null,
		results_editor: null
	}
}