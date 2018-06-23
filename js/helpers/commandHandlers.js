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
