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


var getClearOutput = function() {
	var lines = $(".terminal-output > div");
	return lines.length;
};

var getSimpleOutput =  function() {
	var lines = $(".terminal-output > div");
	var output = $(lines[lines.length - 1]).find("div span");

	return {
		summary: $(output[0]).html().decodeSpace(),
		value: $(output[1]).html().decodeSpace()
	};
};

var getSingleOutput =  function() {
	var lines = $(".terminal-output > div");
	var output = $(lines[lines.length - 1]).find("div span");

	return $(output[0]).html().decodeSpace();
};


var failedCommandOutput = manCommandOutput = function() {
	var lines = $(".terminal-output > div");
	var output = $(lines[lines.length - 1]).find("div span");

	return {
		command: $(output[0]).html().decodeSpace(),
		message: $(output[1]).html().decodeSpace()
	};
};

var pdfCommandOutput = function() {
	var lines = $(".terminal-output > div");
	var output = $(lines[lines.length - 1]).find("div span");

	return {
		command: $(output[0]).html().decodeSpace(),
		url: $(output[1]).html().decodeSpace(),
		hint: $(output[2]).html().decodeSpace()
	};
};

var manFailedCommandOutput = function() {
	var lines = $(".terminal-output > div");
	var output = $(lines[lines.length - 1]).find("div span");

	return {
		man: $(output[0]).html().decodeSpace() + $(output[1]).html().decodeSpace(),
		command: $(output[2]).html().decodeSpace(),
		message: $(output[3]).html().decodeSpace()
	};
};

var references = interests = skills = pdf = {
	topCommandOutput: function() {
		var lines = $(".terminal-output > div");
		var output = $(lines[lines.length - 1]).find("div span");

		return $(output[0]).html().decodeSpace() + $(output[1]).html().decodeSpace();
	},
	fullCommandOutput: function() {
		var lines = $(".terminal-output > div");
		var output = $(lines[lines.length - 1]).find("div");
		var parsedOutput = [];
		var command = "";

		output.each(function(count, value){
			if (count === 0){
				command = $(value).find("span").html().decodeSpace();
			} else {
				var parsedValue = "";

				$(value).children('span,a').each(function(index, value){
					parsedValue += $(value).html().decodeSpace();
				});

				if (parsedValue){ // Filter out empty value
					parsedOutput.push(parsedValue);
				}
			}
		});

		return {
			command: command,
			values: parsedOutput
		}
	}
};

var socialmedia = {
	fullCommandOutput: function() {
		var lines = $(".terminal-output > div");
		var output = $(lines[lines.length - 1]).find("div");
		var parsedOutput = [];
		var command = "";

		output.each(function(count, value){
			if (count === 0){
				command = $(value).find("span").html().decodeSpace();
			} else {
				var parsedValue = "";

				$(value).children('span,a').each(function(index, value){
					parsedValue += $(value).html().decodeSpace();
				});

				if (parsedValue){ // Filter out empty value
					parsedOutput.push(parsedValue);
				}
			}
		});

		return {
			command: command,
			values: parsedOutput
		}
	}
};

var topCommandOutput = function() {
	var lines = $(".terminal-output > div");
	var output = $(lines[lines.length - 1]).find("div span");

	return $(output[0]).html().decodeSpace();
};

var fullCommandOutput = function() {
	var lines = $(".terminal-output > div");
	var output = $(lines[lines.length - 1]).find("div span");
	var parsedOutput = [];
	var command = "";
	output.each(function(count, value){
		if (count === 0){
			command = $(value).html().decodeSpace();
		} else {
			var parsedValue = $(value).html().decodeSpace();
			if (parsedValue){ // Filter out empty value
				parsedOutput.push(parsedValue);
			}
		}
	});

	return {
		command: command,
		values: parsedOutput
	};
};

var helpOutput = function() {
	var lines = $(".terminal-output > div");
	var output = $(lines[lines.length - 1]).find("div");
	var parsedOutput = [];
	var command = "";

	output.each(function(count, value){
		if (count === 0){
			command = $(value).find("span").html().decodeSpace();
		} else {
			var parsedValue = "";

			$(value).children('span').each(function(index, value){
				parsedValue += $(value).html().decodeSpace();
			});

			if (parsedValue){ // Filter out empty value
				parsedOutput.push(parsedValue);
			}
		}
	});

	return {
		command: command,
		values: parsedOutput
	}
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

var succesResponse = function(filename){
	return {
		status: 200,
		responseText: JSON.stringify(loadJSON(filename))
	};
}