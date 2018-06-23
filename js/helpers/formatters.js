// Calculate the formatting
var mergeFormatting = function(baseStyle, overRideStyle) {
	if (overRideStyle.color && isValidColor(overRideStyle.color)) {
		baseStyle.color = overRideStyle.color;
	}

	if (overRideStyle.bold) {
		baseStyle.bold = overRideStyle.bold;
	}

	if (overRideStyle.italic) {
		baseStyle.italic = overRideStyle.italic;
	}

	if (overRideStyle.backgroundColor &&
		isValidColor(overRideStyle.backgroundColor)) {
		baseStyle.backgroundColor = overRideStyle.backgroundColor;
	}

	return baseStyle;
};

// Wrap around styling
var wrappedFormatting = function(style, content) {
	// Check if content null, then ignore
	if (!content) {
		return CONSTANTS.EMPTY;
	}

	// Blank out style in case of undefined
	style = style ? style : CONSTANTS.EMPTY;

	return "[[" + style + "]" + content + "]";
};

// Update color
String.prototype.setFormat = function(styleEnumValue) {
	var result = CONSTANTS.EMPTY;

	if (this.length === 0) {
		return result;
	}

	var type = StyleEnum.toString(styleEnumValue);
	var style = $.extend({}, defaultStyles.standard);

	if (type && styleEnumValue !== StyleEnum.STANDARD) {
		style = mergeFormatting(style, defaultStyles[type]);
	}

	if (style.bold) {
		result += "b";
	}

	if (style.italic) {
		result += "i";
	}

	result += CONSTANTS.SEMI_COLON;
	result += style.color;

	result += CONSTANTS.SEMI_COLON;
	result += style.backgroundColor;

	return wrappedFormatting(result, this);
};

// Title formatter
String.prototype.setTitle = function() {
	return this.setFormat(StyleEnum.TITLE);
};

// Command formatter
String.prototype.setCommand = function() {
	return this.setFormat(StyleEnum.COMMAND);
};

// Name formatter
String.prototype.setName = function() {
	return this.setFormat(StyleEnum.NAME);
};

// PGP formatter
String.prototype.setPGP = function() {
	return this.setFormat(StyleEnum.PGP);
};

// Intiate styles with custom added options
var initStyles = function(defaultStyles, options) {
	// Copy the object
	var styles = $.extend(true, {}, defaultStyles);

	$.each(options, function(key, value) {
		if (defaultStyles[key]) {
			if (value.color) {
				styles[key].color = value.color;
			}

			if (!isUndefinedOrNull(value.bold)) {
				styles[key].bold = value.bold;
			}

			if (!isUndefinedOrNull(value.italic)) {
				styles[key].italic = value.italic;
			}

			if (value.backgroundColor) {
				styles[key].backgroundColor = value.backgroundColor;
			}
		}
	});

	return styles;
};
