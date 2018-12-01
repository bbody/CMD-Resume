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

// Get value
var hasArrayKey = function(data, keys) {
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
var isDefinedNotEmpty = function(object, key, isObject) {
	if (!key || !object) {
		return false;
	}

	var keys = [];
	if (Array.isArray(key)) {
		keys = key;
	} else {
		keys.push(key);
	}

	var data = hasArrayKey(object, keys);

	return data && (!!isObject || data.length);
};

// Get data from object
var getData = function(object, keys) {
	return hasArrayKey(object, Array.isArray(keys) ? keys : [keys]);
};
