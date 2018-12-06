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
		}
	}

	return CONSTANTS.EMPTY;
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

var commandProcessor = {
	basic: basicHandlerFunction,
	array: arrayHandlerFunction,
	calculated: calculatedHandlerFunction,
	system: systemHandlerFunction
};

var CMD = {
	BASIC: "basic",
	ARRAY: "array",
	CALCULATED: "calculated",
	SYSTEM: "system",
	getCommand: function(cmd) {
		return commandProcessor[cmd];
	}
};

// Format date
var getDate = function(startDate, endDate) {
	if (!endDate && !startDate) {
		return CONSTANTS.EMPTY;
	} else if (!endDate) {
		return startDate + " - Present";
	} else if (!startDate) {
		return "Until " + endDate;
	}

	return startDate + CONSTANTS.DASH + endDate;
};

// Get degree name
var getFullDegree = function(studyType, area) {
	if (!studyType && !area) {
		return CONSTANTS.EMPTY;
	} else if (!studyType) {
		return area;
	} else if (!area) {
		return studyType;
	}

	return studyType + " of " + area;
};

// Build URL based on social media username
var buildUrl = function(network, username) {
	if (!network || !username) {
		return CONSTANTS.EMPTY;
	}

	switch (network.toLowerCase()) {
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

var parseEmail = function(email) {
	return email.replace("mailto:", "");
};

var buildEmail = function(email, username) {
	var address = "";

	if (email) {
		address = parseEmail(email);
	} else if (username) {
		address = parseEmail(username);
	}

	if (address) {
		return address;
	}

	return false;
};

var buildSocialNetworkAddress = function(network, url, username) {
	if (network.toLowerCase() === "email") {
		return buildEmail(url, username);
	} else if (url) {
		return url;
	} else if (username) {
		url = buildUrl(network, username);

		if (url) {
			return url;
		}
	}
	return false;
};

String.prototype.upperCaseFirstLetter = function() {
	if (!this || !this.length) {
		return "";
	}

	return this.charAt(0).toUpperCase() + this.slice(1);
};

var buildSocialNetwork = function(value) {
	if (value.network) {
		var address = buildSocialNetworkAddress(value.network, value.url,
			value.username);
		if (address) {
			return value.network.upperCaseFirstLetter() + CONSTANTS.DASH + address;
		}
		return false;
	}
	return value.url ? value.url : false;
};

var isValidCommandType = function(commandType) {
	return !!commandType && commandProcessor.hasOwnProperty(commandType);
};

var isValidCommand = function(command) {
	if (!command.name) {
		console.error("Command must have a name");
		return false;
	}

	command.name = command.name.toLowerCase();

	if (!command.description) {
		console.error("'" + command.name + "' does not have a 'description'");
		return false;
	}

	if (!isValidCommandType(command.type)) {
		console.error("'" + command.name +
			"' does not have a valid type [basic, system, array, calculated]");
		return false;
	}

	if (!(command.type === CMD.SYSTEM || command.type === CMD.CALCULATED) &&
		!command.data) {
		console.error("'" + command.type + "' command type requires 'data'");
		return false;
	}

	if ((command.type === CMD.SYSTEM || command.type === CMD.CALCULATED) &&
		!command.handler) {
		console.error("'" + command.type + "' command type requires 'handler'");
		return false;
	}

	if (command.type === CMD.ARRAY && !command.handlers) {
		console.error("'array' command type requires 'handlers'");
		return false;
	}

	return true;
};

