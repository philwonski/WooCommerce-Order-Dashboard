/**
title: $:/plugins/OokTech/SubmitForm/action-submitform.js
type: application/javascript
module-type: widget
Action widget to send an XMLhttprequest with form data.
The widget takes two inputs, a url and the title of a data tiddler that contains the data to be sent. The indexes are the form element names and the value is the value for that element.
So if DataTiddler has this:
{
	"givenname": Bjorn,
	"familyname": Mallardson
}
then the usage example would send the data givenname=Bjorn&familyname=Mallardson
It is done this way so that you can use tiddlywiki to add or modify the values in the data tiddler to change what is getting sent without having to modify the widget call.
Usage:
<$action-submitform $url='https://something.com' $tiddler=DataTiddler/>
**/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

var Widget = require("$:/core/modules/widgets/widget.js").widget;

var SubmitForm = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
SubmitForm.prototype = new Widget();

/*
Render this widget into the DOM
*/
SubmitForm.prototype.render = function(parent,nextSibling) {
	this.computeAttributes();
	this.execute();
};

/*
Compute the internal state of the widget
*/
SubmitForm.prototype.execute = function() {
	this.formURL = this.getAttribute("$url");
	this.formTiddler = this.getAttribute("$tiddler");
};

/*
Refresh the widget by ensuring our attributes are up to date
*/
SubmitForm.prototype.refresh = function(changedTiddlers) {
	var changedAttributes = this.computeAttributes();
	if(Object.keys(changedAttributes).length) {
		this.refreshSelf();
		return true;
	}
	return this.refreshChildren(changedTiddlers);
};

/*
Invoke the action associated with this widget
*/
SubmitForm.prototype.invokeAction = function(triggeringWidget,event) {

/*
	var data = '';
	var tiddler = this.wiki.getTiddler(this.formTiddler);
	var parsedTiddler = JSON.parse(tiddler.fields.text);
	for (var field in parsedTiddler) {
		 '%2E';
	}
*/

var data = '';
	var tiddler = this.wiki.getTiddler(this.formTiddler);
	var parsedTiddler = JSON.parse(tiddler.fields.text);
    var tophone = parsedTiddler.To;
    var msg = parsedTiddler.Body;
	var data = 'From=%2BYOUR_FROM_NUMBER' + '&' + 'To=' + encodeURIComponent(tophone) + '&' + 'Body=' + encodeURIComponent(msg) + ' ';

   /*for (var field in parsedTiddler) {
		data += 'From=%2BYOUR_FROM_NUMBER&To=%2BTO_NUMBER&Body=tiddlyhard%20working%2E ';
	}*/

/*
var parsedTiddler = JSON.parse(tiddler.fields.text);
    for (var field in parsedTiddler) {
        data += encodeURIComponent(field) + '=' + encodeURIComponent($tw.wiki.getTextReference(parsedTiddler[field])) + '&';
    }
*/

/*
textRef,defaultText,currTiddlerTitle
*/

	var formRequest = new XMLHttpRequest();
	formRequest.open('POST', this.formURL, true);
    formRequest.setRequestHeader('Authorization', 'Basic YOUR_AUTH_CODE');
	formRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    formRequest.send(data.substr(0, data.length-1));

	return true; // Action was invoked
};

exports["action-submitform"] = SubmitForm;

})();
