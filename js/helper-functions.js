/*globals jQuery:false */
/*jslint browser:true */

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

// Update HTML title
var updateTitle = function(name){
	// Check if a name exists, if not make title default
    if (name){
        document.title = name + "'s Résumé";
    } else {
    	document.title = "Command Line Résumé";
    }
};

// Wrap around styling
var wrappedFormatting = function(style, content){
	// Check if both variables are null/empty
	if (!style && !content){
		return "";
	}

	style = style ? style : "";
	content = content ? content : "";

	return "[[" + style + "]" + content + "]";
};

// Update color
String.prototype.setFormat = function(type){
	var style = defaultStyles[type] ? 
		defaultStyles[type] : defaultStyles.standard;
    var color = style.color ? style.color : defaultStyles.standard.color;
    var bold = style.bold ? style.bold : defaultStyles.standard.bold;
    var italic = style.italic ? style.italic : defaultStyles.standard.italic;
    var backgroundColor = style.backgroundColor ? 
    	style.backgroundColor : defaultStyles.standard.backgroundColor;

    var result = "";

    if (bold){
        result += "b";
    }

    if (italic){
        result += "i";
    }

    if (color && isValidColor(color)){
        result += ";";
        result += color;
    } else {
    	// Set to null, if the color is not valid
    	color = null;
    }

    if (backgroundColor && isValidColor(backgroundColor)){
        if (bold || italic || color){
            result += ";";
        }
        result += backgroundColor;
    } else {
        result += !bold ? ";" : "";
        result += !italic ? ";" : "";
        result += !color ? ";" : "";

        result += defaultStyles.standard.backgroundColor;
    }

    return wrappedFormatting(result, this);
};

// Title formatter
String.prototype.setTitle = function(){
    return this.setFormat("title");
};

// Command formatter
String.prototype.setCommand = function(){
    return this.setFormat("command");
};

// Name formatter
String.prototype.setName = function(){
    return this.setFormat("name");
};

// PGP formatter
String.prototype.setPGP = function(){
	return this.setFormat("pgp");
};

// Check if a valid color
var isValidColor = function(color){
	if (!color){
		return false;
	}

	return jQuery.terminal.valid_color(color);
};

// Format date
var getDate = function(startDate, endDate){
    return endDate ? startDate + " - " + endDate : startDate ? 
    	startDate + " - Present" : "";
};

// Get degree name
var getFullDegree = function(studyType, area){
    return area ? studyType + " of " + area : studyType ? studyType : "";
};

// Build URL based on social media username
var buildUrl = function(network, username){
	network = network.toLowerCase();
	if (network === "twitter"){
		return "https://www.twitter.com/" + username;
	} else if (network === "github"){
		return "https://www.github.com/" + username;
	} else {
		return "";
	}
};

// Basic command handlers
var basicHandlerFunction = function(command){
	var result = "\n";
	result += command ? command.data ? command.data : "" : "";

	return result;
};

// System commmand handler
var systemHandlerFunction = function(command){
	if (command){
		if (command.handler){
			return command.handler(command.data);
		} else if (command.data){
			return command.data;
		} else {
			return "";
		}
	} else {
		return "";
	}
};

// Calculated command handler
var calculatedHandlerFunction = function(command){
	return "\n" + systemHandlerFunction(command);
};

// Array function handler
var arrayHandlerFunction = function(command, top){
	var result = "";

	if (!command.handlers || 
		(!command.handlers.title && !command.handlers.organisation && 
			!command.handlers.date)){
		return result;
	}

    jQuery.each(command.data, function(index, value){
        if (!top){
            result += "\n";
        }

        if (command.handlers.organisation){
        	if (!command.handlers.title && !command.handlers.date){
        		result += command.handlers.organisation(value);	
        	} else {
        		result += command.handlers.organisation(value) + "\t";
        	}
        }

        if (command.handlers.title){
        	if (!command.handlers.date){
        		result += command.handlers.title(value);	
        	} else {
        		result += command.handlers.title(value) + "\t";
        	}
        }
        
        if (command.handlers.date){
        	result += command.handlers.date(value);
        }

        // break;
        if (top && index === 0){
            return false;
        }
    });

	return result;
};

// Intiate styles with custom added options
var initStyles = function(defaultStyles, options){
	// Copy the object
	var styles = jQuery.extend(true, {}, defaultStyles);

	jQuery.map(options, function(value, key){
		if (defaultStyles[key]){
			if (value.color){
				styles[key].color = value.color;
			}

			if (typeof value.bold !== 'undefined' && value.bold !== null ){
				styles[key].bold = value.bold;
			}

			if (typeof value.italic !== 'undefined' && value.italic !== null ){
				styles[key].italic = value.italic;
			}

			if (value.backgroundColor){
				styles[key].backgroundColor = value.backgroundColor;
			}
		}
	});

	return styles;
};

// Get Github URI based on username
var getGithubUri = function(username){
	// Return empty is username is empty
	if (!username){
		return "";
	}

	return 'https://api.github.com/users/' + username + '/repos';
};

// Get the Github information
var getGithub = function(uri, username, showForks, callback){
	var ownRepo = username.toLowerCase() + '.github.com';

    jQuery.getJSON(uri + '?callback=?', function(response){
        // Run callback
        callback(filterGithubFork(response.data, ownRepo, showForks));
    });
};

// Go through Github array (Split to make testing easier)
var filterGithubFork = function(repos, ownRepo, showForks){
	var result = [];

	jQuery.each(repos, function(key, value) {
    	if (value &&
    		(value.name !== ownRepo) &&
    		(showForks === value.fork || !value.fork)){
    		result.push(value);
    	}
    });

    return result;
};

// Format Github response
var formatGithub = function(repository, first){
	var repoCache = "";

	if (!first){
		repoCache += "\n";
	}

	repoCache += repository.name.setName();

	if (repository.description){
		repoCache += " - " + repository.description;
	}
	
	return repoCache;
};
