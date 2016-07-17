$(document).ready(function() {
	registerPartials();
});

function registerPartials() {
	Handlebars.registerHelper('contains', function (list, value, options) {
        var i = list.length;
        while (i--) {
            if (list[i].Role_Name === value) {
                return options.fn(this);
            }
        }
        return options.inverse(this);
    });
	Handlebars.registerHelper('isNotEmpty', function (value, options) {
        if (value > 0) {
            return options.fn(this);
        } else {
            return "";
        }
    });
    Handlebars.registerPartial('isNotNull', function (value, options) {
        if (value != null) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
    Handlebars.registerHelper('isValue', function (item, value, options) {
        if (item == value) {
            return options.fn(this);
        } else {
            return options.inverse(this);
        }
    });
	Handlebars.registerHelper("trim", function (data) {
        return data.trim();
    });
	Handlebars.registerHelper("convertNull", function (data) {
        return data == null ? '' : data;
    });
	Handlebars.registerHelper("rsc", function (str) {
        //remove special characters
        return str.replace(/[^A-Za-z0-9-_!@#$%^&*():;., ]/g, "").trim();
    });
	Handlebars.registerHelper("hbs_time", function () {
        return moment(new Date($.now())).format('MM/DD/YYYY HH:mm');
    });
}

function compileTemplate(tmp, data) {
    var tmpl = Handlebars.compile(tmp);
    return tmpl(data);
}

function templateString(tmp) {
    return tmp.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}

function getErrorTemplate() {
    return templateString(function () {/*
            <div class="modal-header">
                <div style="display: inline-block; width: 100%;">
                    <h4 style="display: inline-block;" class="modal-title">{{statusText}}</h4>
                    <span style="display: inline-block; float: right;">{{hbs_time}}</span>
                </div>
            </div>
            <div class="modal-body">
                <div class="center-block">
                    <div id="error_header" style="padding-bottom: 20px;">
                        <span style="font-weight: bold;">Status Code: </span>
                        <span style="padding-left: 5px;">{{status}}</span>
                        <span style="padding-left: 25px; font-weight: bold;">Ready State: </span>
                        <span style="padding-left: 5px;">{{readyState}}</span>
                    </div>
                    <div id="error_data">
                        <span style="font-weight: bold; margin-bottom: 10px;">Message</span>
                        <br/>
                        <div id="error_details" style="margin-top: 5px;">{{responseText}}</div>                       
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class=" btn btn-primary" onclick="$('#errorModal').modal('toggle'); $('#body_main').show();">Continue</button>
            </div>
        */
    });
}