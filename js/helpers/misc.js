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
var isDefinedNotEmpty = function(object, key, isObject) {
	if (!key || !object) {
		return false;
	}

	var keyArray = [];
	if (Array.isArray(key)) {
		keyArray = key;
	} else {
		keyArray.push(key);
	}

	var data = object;

	for (var i = 0; i < keyArray.length; i++) {
		var keyValue = keyArray[i];

		if (typeof data[keyValue] === "undefined") {
			return false;
		}

		data = data[keyValue];
	}

	return !!isObject || data.length;
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
