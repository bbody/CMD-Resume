/* v3.1.12 of CMD Resume by Brendon Body */
;(function($){
  "use strict";
  
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
  	return endDate ? startDate + CONSTANTS.DASH + endDate : startDate ?
  		startDate + " - Present" : CONSTANTS.EMPTY;
  };
  
  // Get degree name
  var getFullDegree = function(studyType, area) {
  	return area ? studyType + " of " + area : studyType ? studyType
  	: CONSTANTS.EMPTY;
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
  
  	if (!command.handlers ||
  		(!command.handlers.title && !command.handlers.organisation &&
  			!command.handlers.date)) {
  		return result;
  	}
  
  	command.data.some(function(value) {
  		if (!top) {
  			result += CONSTANTS.NEW_LINE;
  		}
  
  		if (command.handlers.organisation) {
  			if (!command.handlers.title && !command.handlers.date) {
  				result += command.handlers.organisation(value);
  			} else {
  				result += command.handlers.organisation(value) + CONSTANTS.TAB;
  			}
  		}
  
  		if (command.handlers.title) {
  			if (!command.handlers.date) {
  				result += command.handlers.title(value);
  			} else {
  				result += command.handlers.title(value) + CONSTANTS.TAB;
  			}
  		}
  
  		if (command.handlers.date) {
  			result += command.handlers.date(value);
  		}
  
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
  
  $.fn.CMDResume = function(primaryEndpoint, secondaryEndpoint, options) {
  	// Get element
  	var element = this;
  
  	options = options || {};
  
  	// If there are no options, use second variable as options
  	if (!options) {
  		if ((typeof secondaryEndpoint) !== "string") {
  			options = secondaryEndpoint;
  		}
  	}
  
  	defaultStyles = initStyles(defaultStyles, options);
  
  	var self = {};
  
  	self.commands = {};
  
  	self.commandProcessor = {
  		basic: basicHandlerFunction,
  		array: arrayHandlerFunction,
  		calculated: calculatedHandlerFunction,
  		system: systemHandlerFunction
  	};
  
  	self.initTerminal = function() {
  		self.term = element.terminal(function(command, term) {
  			// jscs:disable requireCamelCaseOrUpperCaseIdentifiers
  			var splitCommand = $.terminal.split_command(command);
  			// jscs:enable
  			term.echo(self.commandLineParse(splitCommand.name, splitCommand.args) +
  				CONSTANTS.NEW_LINE);
  		}, self.settings);
  	};
  
  	self.initGithubForks = function(options) {
  		self.showForks = options.showForks || options.showForks === "true";
  	};
  
  	self.init = function(options) {
  		self.initGithubForks(options);
  		self.initVariables();
  		self.initCommands();
  		self.initSettings();
  		self.initHTMLTitle();
  		self.initTerminal();
  	};
  
  	// Parse command line
  	self.commandLineParse = function(rootCommand, commandList) {
  		var stemCommand = !isUndefinedOrNull(commandList[0]) &&
  			commandList[0].length > 0 ? commandList[0] : false;
  		var command = self.commands[rootCommand];
  		if (rootCommand === "man") {
  			return self.commands.man.handler(stemCommand);
  		} else if (command) {
  			var top = stemCommand === "-top" ? true : false;
  			return self.processCommand(command, top);
  		} else {
  			if (rootCommand.length > 0) {
  				return rootCommand.setCommand() + " is an unknown command.";
  			} else {
  				return "No command entered.";
  			}
  		}
  	};
  
  	self.processCommand = function(command, top) {
  		var result = CONSTANTS.EMPTY;
  
  		if (!top &&
  			command.type !== self.commandProcessor.system) {
  			result += command.title.setTitle();
  		}
  
  		result += command.type(command, top);
  
  		return result;
  	};
  
  	// Get list of commands for autocomplete
  	self.getCommandList = function() {
  		var commands = [];
  
  		$.map(self.commands, function(value, key) {
  			commands.push(key);
  		});
  
  		return commands;
  	};
  
  	self.hasCommand = function(command) {
  		return self.commandList.indexOf(command) >= 0;
  	};
  
  	self.getCategory = function(command) {
  		return self.commands[command].type;
  	};
  
  	self.initCommands = function() {
  		self.commands.man = {
  			title: "man".setCommand(),
  			description: "describes what each command does",
  			type: self.commandProcessor.system,
  			handler: function(command) {
  				if (!command) {
  					return "man:".setCommand() + " No command entered.";
  				} else if (self.hasCommand(command)) {
  					return command.setCommand() + CONSTANTS.DASH +
  					self.commands[command].description;
  				} else {
  					return "man".setCommand() +
  					": " + command.setCommand() +
  					" is an unknown command.";
  				}
  			}
  		};
  
  		self.commands.help = {
  			title: "Help",
  			description: "lists help for all the commands",
  			type: self.commandProcessor.system,
  			handler: function() {
  				var commands = "Available Commands:".setTitle();
  				$.map(self.commands, function(value, key) {
  					commands += CONSTANTS.NEW_LINE;
  					commands += key.setCommand();
  					commands += CONSTANTS.DASH;
  					commands += value.description;
  				});
  				return commands;
  			}
  		};
  
  		self.commands.clear = {
  			description: "clear command history from screen"
  		};
  
  		if (self.data.basics.name) {
  			self.commands.name = {
  				title: "Name",
  				description: "owner of the résumé",
  				data: self.data.basics.name,
  				type: self.commandProcessor.basic
  			};
  		}
  
  		if (self.data.commands && self.data.commands.pgpkey) {
  			self.commands.pgpkey = {
  				title: "PGP Key",
  				description: "public PGP key",
  				data: self.data.commands.pgpkey,
  				type: self.commandProcessor.calculated,
  				handler: function(data) {
  					return data.setPGP();
  				}
  			};
  		}
  
  		if (self.data.basics.summary) {
  			self.commands.about = {
  				title: "About",
  				description: "about me",
  				data: self.data.basics.summary,
  				type: self.commandProcessor.basic
  			};
  		}
  
  		if (self.data.basics.pdfLink) {
  			self.commands.pdf = {
  				title: "Resume PDF",
  				description: "pdf version of the résumé",
  				data: self.data.basics.pdfLink,
  				type: self.commandProcessor.calculated,
  				handler: function(data) {
  					window.open(data);
  					return data + CONSTANTS.NEW_LINE +
  					"Hint: May need to allow pop-ups.";
  				}
  			};
  		}
  
  		if (self.data.basics.location) {
  			self.commands.location = {
  				title: "Location",
  				description: "current location",
  				data: self.data.basics.location,
  				type: self.commandProcessor.calculated,
  				handler: function(data) {
  					return data.city +
  						(data.region ? CONSTANTS.COMA + data.region :
  							CONSTANTS.EMPTY) + CONSTANTS.COMA +
  							data.countryCode;
  				}
  			};
  		}
  
  		if (self.data.basics.label) {
  			self.commands.lookingfor = {
  				title: "Looking For",
  				description: "looking for what kind of position",
  				data: self.data.basics.label,
  				type: self.commandProcessor.calculated,
  				handler: function(data) {
  					return data + " positions";
  				}
  			};
  		}
  
  		if (self.data.basics.profiles) {
  			self.commands.socialmedia = {
  				title: "Social Media",
  				description: "social media profiles",
  				data: self.data.basics.profiles,
  				type: self.commandProcessor.calculated,
  				handler: function(data) {
  					var result = CONSTANTS.EMPTY;
  					data.forEach(function(value, index) {
  						if (value.network) {
  							if (index !== 0) {
  								result += CONSTANTS.NEW_LINE;
  							}
  
  							if (value.network.toLowerCase() === "email") {
  								result += value.network +
  								CONSTANTS.DASH +
  								value.url.split(CONSTANTS.COLON).charAt(1);
  							} else if (value.url) {
  								result += value.network + CONSTANTS.DASH +
  								value.url;
  							} else if (value.username) {
  								var url = CONSTANTS.EMPTY;
  
  								url = buildUrl(value.network, value.username);
  
  								if (url) {
  									result += value.network +
  									CONSTANTS.DASH + url;
  								}
  							}
  						}
  					});
  					return result;
  				}
  			};
  		}
  
  		if (self.data.skills) {
  			self.commands.skills = {
  				title: "Skills",
  				description: "skills obtained",
  				type: self.commandProcessor.calculated,
  				data: self.data.skills,
  				handler: function(data) {
  					var result = CONSTANTS.EMPTY;
  
  					data.forEach(function(value, index) {
  						result += value.level;
  						result += " in ";
  						result += value.name;
  
  						// Make sure not the last entry
  						if (index !== data.length - 1) {
  							result += CONSTANTS.NEW_LINE;
  						}
  					});
  					return result;
  				}
  			};
  		}
  
  		self.commands.splash = {
  			title: "Splash Screen",
  			description: "print the welcome screen",
  			type: self.commandProcessor.system,
  			handler: function() {
  				var results = CONSTANTS.EMPTY;
  
  				if (self.data.commands.splash) {
  					if (self.data.commands.splash) {
  						results += self.data.commands.splash;
  						results += CONSTANTS.NEW_LINE;
  					}
  				}
  
  				if (self.data.basics.name) {
  					results += "Welcome to " +
  						self.data.basics.name.setName() +
  						"'s résumé.";
  				} else {
  					results += "Welcome to my résumé.";
  				}
  
  				results += CONSTANTS.NEW_LINE;
  				results += CONSTANTS.NEW_LINE;
  				results += "Type ";
  				results += "help".setCommand();
  				results += " for commands";
  
  				return results;
  			}
  		};
  
  		if (self.data.education) {
  			self.commands.education = {
  				title: "Education",
  				description: "education history",
  				data: self.data.education,
  				type: self.commandProcessor.array,
  				handlers: {
  					organisation: function(value) {
  						return value.institution;
  					},
  					title: function(value) {
  						return getFullDegree(value.studyType, value.area);
  					},
  					date: function(value) {
  						return getDate(value.startDate, value.endDate);
  					}
  				}
  			};
  		}
  
  		if (self.data.work) {
  			self.commands.employment = {
  				title: "Employment",
  				description: "employment history",
  				data: self.data.work,
  				type: self.commandProcessor.array,
  				handlers: {
  					organisation: function(value) {
  						return value.company;
  					},
  					title: function(value) {
  						return value.position;
  					},
  					date: function(value) {
  						return getDate(value.startDate, value.endDate);
  					}
  				}
  			};
  		}
  
  		if (self.data.volunteer) {
  			self.commands.volunteering = {
  				title: "Volunteering",
  				description: "volunteering history",
  				type: self.commandProcessor.array,
  				data: self.data.volunteer,
  				handlers: {
  					organisation: function(value) {
  						return value.organization;
  					},
  					title: function(value) {
  						return value.position;
  					},
  					date: function(value) {
  						return getDate(value.startDate, value.endDate);
  					}
  				}
  			};
  		}
  
  		if (self.data.awards) {
  			self.commands.awards = {
  				title: "Awards",
  				description: "awards obtained",
  				type: self.commandProcessor.array,
  				data: self.data.awards,
  				handlers: {
  					organisation: function(value) {
  						return value.awarder;
  					},
  					title: function(value) {
  						return value.title;
  					},
  					date: function(value) {
  						return value.date;
  					}
  				}
  			};
  		}
  
  		if (self.data.publications) {
  			self.commands.publications = {
  				title: "Publications",
  				description: "publications produced",
  				type: self.commandProcessor.array,
  				data: self.data.publications,
  				handlers: {
  					organisation: function(value) {
  						return value.publisher;
  					},
  					title: function(value) {
  						return value.name;
  					},
  					date: function(value) {
  						return value.releaseDate;
  					}
  				}
  			};
  		}
  
  		if (self.data.languages) {
  			self.commands.languages = {
  				title: "Languages",
  				description: "languages",
  				type: self.commandProcessor.array,
  				data: self.data.languages,
  				handlers: {
  					organisation: function(value) {
  						return value.language;
  					},
  					title: function(value) {
  						return value.fluency;
  					}
  				}
  			};
  		}
  
  		if (self.data.interests) {
  			self.commands.interests = {
  				title: "Interests",
  				description: "interests",
  				type: self.commandProcessor.array,
  				data: self.data.interests,
  				handlers: {
  					organisation: function(value) {
  						return value.name + CONSTANTS.COLON;
  					},
  					title: function(value) {
  						return value.keywords.join(CONSTANTS.COMA);
  					}
  				}
  			};
  		}
  
  		if (self.data.references) {
  			self.commands.references = {
  				title: "References",
  				description: "references",
  				type: self.commandProcessor.array,
  				data: self.data.references,
  				handlers: {
  					organisation: function(value) {
  						return (value.name).setName() + CONSTANTS.COLON;
  					},
  					title: function(value) {
  						return CONSTANTS.NEW_LINE + value.reference;
  					}
  				}
  			};
  		}
  	};
  
  	// Initialize variables
  	self.initVariables = function() {
  		self.data.commands = {};
  
  		self.data.basics.profiles.forEach(function(value) {
  			if (!self.data.basics.githubUsername &&
  				value.network.toLowerCase() === "github") {
  				if (value.username) {
  					self.data.basics.githubUsername = value.username;
  				} else if (value.url) {
  					self.data.basics.githubUsername = value.url;
  				}
  			} else if (value.network.toLowerCase() === "resume") {
  				self.data.basics.pdfLink = value.url;
  			}
  		});
  
  		if (self.data.basics.githubUsername) {
  			getGithub(getGithubUri(self.data.basics.githubUsername),
  				self.data.basics.githubUsername, self.showForks,
  				function(result) {
  					// In the case of too many requests bail
  					if (!isUndefinedOrNull(result.length)) {
  						var formattedString = CONSTANTS.EMPTY;
  
  						result.forEach(function(value, key) {
  							formattedString += formatGithub(value, key === 0);
  						});
  
  						self.commands.github = {
  							title: "Github Repositories",
  							description: "list Github repositories",
  							type: self.commandProcessor.basic,
  							data: formattedString
  						};
  
  						self.commandList.push("github");
  					}
  				});
  		}
  	};
  
  	self.initSettings = function() {
  		self.commandList = self.getCommandList();
  
  		self.settings = {
  			greetings: self.commands.splash.handler(),
  			onBlur: function() {
  				// Prevent loosing focus
  				return false;
  			},
  			completion: self.commandList
  		};
  	};
  
  	self.initHTMLTitle = function() {
  		updateTitle(self.data.basics.name);
  	};
  
  	$.getJSON(primaryEndpoint, function(response) {
  		self.data = response;
  
  		if (!secondaryEndpoint) {
  			self.init(options);
  		}
  
  		$.getJSON(secondaryEndpoint, function(response) {
  			self.data.pgpkey = response.pgpkey;
  
  			if (self.data.pgpkey) {
  				self.commands.pgpkey = {
  					title: "PGP Key",
  					description: "print PGP key",
  					type: self.commandProcessor.calculated,
  					handler: function() {
  						var results = CONSTANTS.EMPTY;
  
  						for (var i = 0; i < self.data.pgpkey.length; i++) {
  							results += self.data.pgpkey[i];
  							if (i !== self.data.pgpkey.length - 1) {
  								results += CONSTANTS.NEW_LINE;
  							}
  						}
  						return results.setPGP();
  					}
  				};
  			}
  
  			if (response.github) {
  				self.data.basics.githubUsername = response.github;
  				self.data.githubCache = CONSTANTS.EMPTY;
  			}
  
  			if (response.splash) {
  				self.data.splash = response.splash;
  			}
  
  			self.init(options);
  		});
  	});
  
  	this.CMDResume = self;
  
  	return this;
  };
  
}(jQuery));