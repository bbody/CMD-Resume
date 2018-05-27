var getSplash = function() {
	var splash = $(".terminal-output div[data-index='0'] span");
	return {
		intro: $(splash[0]) && $(splash[0]).html() ? $(splash[0]).html().decodeSpace() : "",
		name: $(splash[1]) && $(splash[1]).html() ? $(splash[1]).html().decodeSpace() : "",
		end: $(splash[2]) && $(splash[2]).html() ? $(splash[2]).html().decodeSpace() : ""
	};
};

var getSimpleSplash = function() {
	var splash = $(".terminal-output div[data-index='0'] span");
	return $(splash[0]).html().decodeSpace();
};

var getSimpleOutput =  function() {
	var lines = $(".terminal-output > div");
	var output = $(lines[lines.length - 1]).find("div span");

	return {
		summary: $(output[0]).html().decodeSpace(),
		value: $(output[1]).html().decodeSpace()
	};
};

var failedCommandOutput = function() {
	var lines = $(".terminal-output > div");
	var output = $(lines[lines.length - 1]).find("div span");

	return {
		command: $(output[0]).html().decodeSpace(),
		message: $(output[1]).html().decodeSpace()
	};
};

String.prototype.decodeSpace = function() {
	return this.replace(/&nbsp;/g, " ");
};

var loadJSON = function(fixtureName) {
	return window.__json__[fixtureName];
};

var spyJSON = function(fixtureName, extraDetailsFixtureName = null) {
	var spy = spyOn($, "getJSON");
	spy.and.callFake(function(url, success) {
		if (extraDetailsFixtureName && url === `${extraDetailsFixtureName}.json`){
			success(loadJSON(`extraDetails/${extraDetailsFixtureName}`));
		} else {
			success(loadJSON(fixtureName));
		}

		return {
			fail: function() {}
		};
	});
	return spy;
};

var typeCharacters = function(text) {
	// Based off enter_text https://github.com/jcubic/jquery.terminal/blob/master/spec/terminalSpec.js
	var docElement = $(document.documentElement || window);

	text.split("").forEach(function(character){
		var event = $.Event("keydown");
		event.keyCode = character.toUpperCase().charCodeAt(0);
		event.which = character.toUpperCase().charCodeAt(0);
		event.key = character;
		docElement.trigger(event);

		event = $.Event("keypress");
		event.keyCode = character.charCodeAt(0);
		event.which = character.charCodeAt(0);
		event.key = character;
		event.ctrlKey = false;
		event.altKey = false;
		docElement.trigger(event);		
	});
};

var pressEnter = function() {
	var ENTER_KEY = 13;
	// Based off enter https://github.com/jcubic/jquery.terminal/blob/master/spec/terminalSpec.js
	var docElement = $(document.documentElement || window);

	var event = $.Event("keydown");
    event.ctrlKey = false;
    event.key = "enter";
    event.altKey = false;
    event.shiftKey = false;
    event.which = ENTER_KEY;
    event.keyCode = ENTER_KEY;
    docElement.trigger(event);

    event = $.Event("keypress");
    event.key = "enter";
    event.which = 0;
    event.keyCode = 0;
    docElement.trigger(event);
};

var enterCommand = function(command) {
	typeCharacters(command);
	pressEnter();
};