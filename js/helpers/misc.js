import $ from "jquery";

// Check if something is undefined or null
export var isUndefinedOrNull = function(value) {
	return typeof value === "undefined" || value === null;
};

// Update HTML title
export var updateTitle = function(name) {
	// Check if a name exists, if not make title default
	document.title = name ? name + "'s Résumé" : "Command Line Résumé";
};

// Check if a valid color
export var isValidColor = function(color) {
	if (color) {
		// Disable style checking on external function
		// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
		return $.terminal.valid_color(color);
		// jscs:enable
	} else {
		return false;
	}
};

// Get key array
export var getKeyArray = function(key) {
	if (Array.isArray(key)) {
		return key;
	} else {
		return [key];
	}
};

// Get value
export var getDataFromArrayKey = function(data, keys) {
	keys = getKeyArray(keys);
	for (var i = 0; i < keys.length; i++) {
		var key = keys[i];

		if (typeof data[key] === "undefined") {
			return false;
		}

		data = data[key];
	}

	return data;
};

// Check if an object has key and has length
export var isDefinedNotEmpty = function(object, key, isObject) {
	if (!key || !object) {
		return false;
	}

	var data = getDataFromArrayKey(object, getKeyArray(key));

	return data && (!!isObject || data.length);
};

// Checks is hosted on JSON Resume
export var isJsonResumeHosted = function(url) {
	if (!url || url.length === 0) {
		return false;
	}

	// jscs:disable maximumLineLength
	var match = url.match(/((http|https):\/\/)registry.jsonresume\.org\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi);
	// jscs:enable maximumLineLength

	return !!match && match.length > 0;
};

// Checks if URL ends with JSON
export var isJsonFormat = function(url) {
	if (!url || url.length === 0) {
		return false;
	}

	var match = url.match(/.json$/);
	return !!match && match.length > 0;
};

// Get HTML Version of URL
export var getHtmlVersion = function(url) {
	return url.replace(/.json$/, ".html");
};
