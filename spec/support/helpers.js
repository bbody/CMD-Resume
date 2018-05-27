var getSplash = function() {
	var splash = $('.terminal-output div[data-index="0"] span');
	return {
		intro: $(splash[0]).html().decodeSpace(),
		name: $(splash[1]).html().decodeSpace(),
		end: $(splash[2]).html().decodeSpace()
	};
};

var getSimpleSplash = function() {
	var splash = $('.terminal-output div[data-index="0"] span');
	return $(splash[0]).html().decodeSpace();
};

String.prototype.decodeSpace = function() {
	return this.replace(/&nbsp;/g, " ");
};

var loadJSON = function(fixtureName) {
	return window.__json__[fixtureName];
};