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

	var key = Array.isArray(keys) ? keys[0] : keys;

	if (typeof object[key] === "undefined") {
		return false;
	}

	if (Array.isArray(keys) && keys.length > 1) {
		return isDefinedNotEmpty(object[key], keys.slice(1), isObject);
	} else {
		return !!isObject ||  object[key].length;
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
