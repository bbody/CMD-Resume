// Default styles for displaying text
var defaultStyles = {
	standard: {
		color: "white",
		bold: false,
		italic: false,
		backgroundColor: "#000"
	},
	title: {
		color: "red",
		bold: true
	},
	command: {
		color: "white",
		bold: false,
		italic: true
	},
	pgp: {
		color: "white",
		bold: false,
		italic: true
	},
	name: {
		color: "green",
		bold: true
	}
};

var CONSTANTS = {
	NEW_LINE: "\n",
	SEMI_COLON: ";",
	EMPTY: "",
	TAB: "\t",
	COLON: ":",
	COMA: ", ",
	DASH: " - ",
	SPACE: " "
};

var StyleEnum = {
	STANDARD: 0,
	TITLE: 1,
	COMMAND: 2,
	NAME: 3,
	PGP: 4,
	toString: function(styleEnumValue) {
		switch (styleEnumValue) {
			case StyleEnum.TITLE:
				return "title";
			case StyleEnum.COMMAND:
				return "command";
			case StyleEnum.NAME:
				return "name";
			case StyleEnum.PGP:
				return "pgp";
			case StyleEnum.STANDARD:
				return "standard";
			default:
				return "";
		}
	}
};

// Check if something is undefined or null
var isUndefinedOrNull = function(value) {
	return typeof value === "undefined" || value === null;
};

// Update HTML title
var updateTitle = function(name) {
	// Check if a name exists, if not make title default
	document.title = name ? name + "'s Résumé" : "Command Line Résumé";
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

// Check if a valid color
var isValidColor = function(color) {
	if (color) {
		// Disable style checking on external function
		// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
		return $.terminal.valid_color(color);
		// jscs:enable
	} else {
		return false;
	}
};

// Update color
String.prototype.setFormat = function(styleEnumValue) {
	var result = CONSTANTS.EMPTY;

	if (this.length === 0) {
		return result;
	}

	var type = StyleEnum.toString(styleEnumValue);
	var style = defaultStyles[type] ?
		defaultStyles[type] : defaultStyles.standard;
	var color = style.color && isValidColor(style.color) ?
		style.color : defaultStyles.standard.color;
	var bold = style.bold ? style.bold : defaultStyles.standard.bold;
	var italic = style.italic ? style.italic : defaultStyles.standard.italic;
	var backgroundColor = style.backgroundColor &&
		isValidColor(style.backgroundColor) ?
		style.backgroundColor : defaultStyles.standard.backgroundColor;

	if (bold) {
		result += "b";
	}

	if (italic) {
		result += "i";
	}

	if (color) {
		result += CONSTANTS.SEMI_COLON;
		result += color;
	}

	if (backgroundColor) {
		if (bold || italic || color) {
			result += CONSTANTS.SEMI_COLON;
		}
		result += backgroundColor;
	}

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

// Format date
var getDate = function(startDate, endDate) {
	if (endDate && startDate) {
		return startDate + CONSTANTS.DASH + endDate;
	} else if (!endDate && !startDate) {
		return CONSTANTS.EMPTY;
	} else if (!endDate) {
		return startDate + " - Present";
	} else {
		return "Until " + endDate;
	}
};

// Get degree name
var getFullDegree = function(studyType, area) {
	if (!studyType && !area) {
		return CONSTANTS.EMPTY;
	} else if (!studyType) {
		return area;
	} else if (!area) {
		return studyType;
	} else {
		return studyType + " of " + area;
	}
};

// Build URL based on social media username
var buildUrl = function(network, username) {
	if (!network || !username) {
		return CONSTANTS.EMPTY;
	}

	switch (network.toLowerCase()){
		case "twitter":
			return "https://www.twitter.com/" + username;
		case "github":
			return "https://www.github.com/" + username;
		case "linkedin":
			return "https://www.linkedin.com/in/" + username;
		case "facebook":
			return "https://www.facebook.com/" + username;
		case "reddit":
			return "https://www.reddit.com/user/" + username;
		case "hackernews":
			return "https://news.ycombinator.com/user?id=" + username;
		default:
			return CONSTANTS.EMPTY;
	}
};

// Basic command handlers
var basicHandlerFunction = function(command) {
	var result = CONSTANTS.NEW_LINE;

	result += command ? (command.data ? command.data : CONSTANTS.EMPTY)
	: CONSTANTS.EMPTY;

	return result;
};

// System commmand handler
var systemHandlerFunction = function(command) {
	if (command) {
		if (command.handler) {
			return command.handler(command.data);
		} else if (command.data) {
			return command.data;
		} else {
			return CONSTANTS.EMPTY;
		}
	} else {
		return CONSTANTS.EMPTY;
	}
};

// Calculated command handler
var calculatedHandlerFunction = function(command) {
	return CONSTANTS.NEW_LINE + systemHandlerFunction(command);
};

// Array function handler
var arrayHandlerFunction = function(command, top) {
	var result = CONSTANTS.EMPTY;

	if (!command.handlers) {
		return result;
	}

	command.data.some(function(value) {
		var resultArray = [];

		if (command.handlers.organisation) {
			var organisationValue = command.handlers.organisation(value);
			if (organisationValue) {
				resultArray.push(organisationValue);
			}
		}

		if (command.handlers.title) {
			var titleValue = command.handlers.title(value);
			if (titleValue) {
				resultArray.push(titleValue);
			}
		}

		if (command.handlers.date) {
			var dateValue = command.handlers.date(value);
			if (dateValue) {
				resultArray.push(dateValue);
			}
		}

		if (!top && resultArray.length) {
			result += CONSTANTS.NEW_LINE;
		}

		result += resultArray.join(CONSTANTS.TAB);

		// Break after the first command
		return top;
	});

	return result;
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

// Get Github URI based on username
var getGithubUri = function(username) {
	// Return empty is username is empty
	if (username) {
		return "https://api.github.com/users/" + username + "/repos";
	} else {
		return CONSTANTS.EMPTY;
	}
};

// Go through Github array (Split to make testing easier)
var filterGithubFork = function(repos, ownRepo, showForks) {
	var result = [];

	repos.forEach(function(value) {
		if (value &&
			(value.name !== ownRepo) &&
			(showForks === value.fork || !value.fork)) {
			result.push(value);
		}
	});

	return result;
};

// Get the Github information
var getGithub = function(uri, username, showForks, callback) {
	var ownRepo = username.toLowerCase() + ".github.com";

	$.getJSON(uri, function(response) {
		// Run callback
		if (response && response.length > 0) {
			callback(filterGithubFork(response, ownRepo, showForks));
		}
	});
};

// Format Github response
var formatGithub = function(repository, first) {
	var repoCache = CONSTANTS.EMPTY;

	if (!repository || !repository.name) {
		return repoCache;
	}

	if (!first) {
		repoCache += CONSTANTS.NEW_LINE;
	}

	repoCache += repository.name.setName();

	if (repository.description) {
		repoCache += CONSTANTS.DASH + repository.description;
	}

	return repoCache;
};
