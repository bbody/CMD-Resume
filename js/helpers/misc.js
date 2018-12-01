// Check if something is undefined or null
var isUndefinedOrNull = function(value) {
	return typeof value === "undefined" || value === null;
};

// Update HTML title
var updateTitle = function(name) {
	// Check if a name exists, if not make title default
	document.title = name ? name + "'s Résumé" : "Command Line Résumé";
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

// Check if an object has key and has length
var isDefinedNotEmpty = function(object, keys, isObject) {
	if (!keys || !object) {
		return false;
	}

	if (Array.isArray(keys) && keys.length === 1) {
		keys = keys[0];
	}

	if (Array.isArray(keys)) {
		var key = keys[0];
		return typeof object[key] !== "undefined" &&
			isDefinedNotEmpty(object[key], keys.slice(1), isObject);
	} else {
		return object && typeof object[keys] !== "undefined" &&
			(!!isObject || object[keys].length);
	}
};

// Get data from object
var getData = function(object, keys) {
	if (Array.isArray(keys)) {
		var data = object;
		keys.forEach(function(key) {
			data = data[key];
		});

		return data;
	} else {
		return object[keys];
	}
};
