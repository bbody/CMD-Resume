/* v4.4.0 of CMD Resume by Brendon Body(https://github.com/bbody/CMD-Resume.git) */
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
  				return false;
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
  
  // Calculate the formatting
  var mergeFormatting = function(baseStyle, overRideStyle) {
  	if (overRideStyle.color && isValidColor(overRideStyle.color)) {
  		baseStyle.color = overRideStyle.color;
  	}
  
  	if (overRideStyle.bold) {
  		baseStyle.bold = overRideStyle.bold;
  	}
  
  	if (overRideStyle.italic) {
  		baseStyle.italic = overRideStyle.italic;
  	}
  
  	if (overRideStyle.backgroundColor &&
  		isValidColor(overRideStyle.backgroundColor)) {
  		baseStyle.backgroundColor = overRideStyle.backgroundColor;
  	}
  
  	return baseStyle;
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
  
  // Update color
  String.prototype.setFormat = function(styleEnumValue) {
  	var result = CONSTANTS.EMPTY;
  
  	if (this.length === 0) {
  		return result;
  	}
  
  	var type = StyleEnum.toString(styleEnumValue);
  	var style = $.extend({}, defaultStyles.standard);
  
  	if (type && styleEnumValue !== StyleEnum.STANDARD) {
  		style = mergeFormatting(style, defaultStyles[type]);
  	}
  
  	if (style.bold) {
  		result += "b";
  	}
  
  	if (style.italic) {
  		result += "i";
  	}
  
  	result += CONSTANTS.SEMI_COLON;
  	result += style.color;
  
  	result += CONSTANTS.SEMI_COLON;
  	result += style.backgroundColor;
  
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
  
  $.fn.CMDResume = function(primaryEndpoint, options) {
  	// Get element
  	var element = this;
  
  	options = options || {};
  
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
  
  	self.showTitle = function(commandType, top) {
  		if (commandType === self.commandProcessor.system) {
  			return false;
  		} else if (top && (commandType === self.commandProcessor.array)) {
  			return false;
  		}
  
  		return true;
  	};
  
  	self.processCommand = function(command, top) {
  		var result = CONSTANTS.EMPTY;
  
  		// Don't show title for system or -top array command
  		if (self.showTitle(command.type, top)) {
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
  
  	self.initMan = function() {
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
  	};
  
  	self.initHelp = function() {
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
  	};
  
  	self.initClear = function() {
  		self.commands.clear = {
  			description: "clear command history from screen"
  		};
  	};
  
  	self.initName = function() {
  		if (self.data.basics.name) {
  			self.commands.name = {
  				title: "Name",
  				description: "owner of the résumé",
  				data: self.data.basics.name,
  				type: self.commandProcessor.basic
  			};
  		}
  	};
  
  	self.initSummary = function() {
  		if (self.data.basics.summary) {
  			self.commands.about = {
  				title: "About",
  				description: "about me",
  				data: self.data.basics.summary,
  				type: self.commandProcessor.basic
  			};
  		}
  	};
  
  	self.initPdfLink = function() {
  		if (self.data.basics.pdfLink) {
  			self.commands.pdf = {
  				title: "Résumé PDF",
  				description: "pdf version of the résumé",
  				data: self.data.basics.pdfLink,
  				type: self.commandProcessor.calculated,
  				handler: function(data) {
  					window.open(data);
  					return decodeURIComponent(escape(data)) + CONSTANTS.NEW_LINE +
  					"Hint: May need to allow pop-ups.";
  				}
  			};
  		}
  	};
  
  	self.initLocation = function() {
  		if (self.data.basics.location) {
  			self.commands.location = {
  				title: "Location",
  				description: "current location",
  				data: self.data.basics.location,
  				type: self.commandProcessor.calculated,
  				handler: function(data) {
  					var results = [];
  
  					if (data.city) {
  						results.push(data.city);
  					}
  
  					if (data.region) {
  						results.push(data.region);
  					}
  
  					if (data.countryCode) {
  						results.push(data.countryCode);
  					}
  
  					return results.join(CONSTANTS.COMA);
  				}
  			};
  		}
  	};
  
  	self.initLabel = function() {
  		if (self.data.basics.label) {
  			self.commands.lookingfor = {
  				title: "Looking For",
  				description: "looking for what kind of position",
  				data: self.data.basics.label,
  				type: self.commandProcessor.basic
  			};
  		}
  	};
  
  	self.initProfiles = function() {
  		if (self.data.basics.profiles) {
  			self.commands.socialmedia = {
  				title: "Social Media",
  				description: "social media profiles",
  				data: self.data.basics.profiles,
  				type: self.commandProcessor.calculated,
  				handler: function(data) {
  					var resultArray = [];
  
  					data.forEach(function(value) {
  						var socialMediaProfile = buildSocialNetwork(value);
  						if (!socialMediaProfile) {
  							return true;
  						}
  
  						resultArray.push(socialMediaProfile);
  					});
  
  					return resultArray.join(CONSTANTS.NEW_LINE);
  				}
  			};
  		}
  	};
  
  	self.initSkills = function() {
  		if (self.data.skills) {
  			self.commands.skills = {
  				title: "Skills",
  				description: "skills obtained",
  				type: self.commandProcessor.calculated,
  				data: self.data.skills,
  				handler: function(data) {
  					var result = CONSTANTS.EMPTY;
  
  					data.forEach(function(value, index) {
  						if (value.level) {
  							result += value.level;
  							if (value.name) {
  								result += " in ";
  							}
  						}
  
  						if (value.name) {
  							result += value.name;
  						}
  
  						// Make sure not the last entry
  						if (index !== data.length - 1) {
  							result += CONSTANTS.NEW_LINE;
  						}
  					});
  					return result;
  				}
  			};
  		}
  	};
  
  	self.initSplash = function() {
  		self.commands.splash = {
  			title: "Splash Screen",
  			description: "print the welcome screen",
  			type: self.commandProcessor.system,
  			handler: function() {
  				var results = CONSTANTS.EMPTY;
  
  				// Return custom splash if it exists
  				if (self.data.customSplash) {
  					results += self.data.customSplash;
  				} else {
  					if (self.data.basics.name) {
  						results += "Welcome to " +
  							self.data.basics.name.setName() +
  							"'s résumé.";
  					} else {
  						results += "Welcome to my résumé.";
  					}
  				}
  
  				results += CONSTANTS.NEW_LINE;
  				results += CONSTANTS.NEW_LINE;
  				results += "Type ";
  				results += "help".setCommand();
  				results += " for commands";
  
  				return results;
  			}
  		};
  	};
  
  	self.initEducation = function() {
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
  	};
  
  	self.initWork = function() {
  		if (self.data.work && self.data.work.length) {
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
  	};
  
  	self.initVolunteer = function() {
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
  	};
  
  	self.initAwards = function() {
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
  	};
  
  	self.initPublications = function() {
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
  	};
  
  	self.initLanguages = function() {
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
  	};
  
  	self.initInterests = function() {
  		if (self.data.interests) {
  			self.commands.interests = {
  				title: "Interests",
  				description: "interests",
  				type: self.commandProcessor.array,
  				data: self.data.interests,
  				handlers: {
  					organisation: function(value) {
  						return value.name ? value.name.setName() : "";
  					},
  					title: function(value) {
  						return value.keywords ? value.keywords.join(CONSTANTS.COMA) : "";
  					}
  				}
  			};
  		}
  	};
  
  	self.initReferences = function() {
  		if (self.data.references) {
  			self.commands.references = {
  				title: "References",
  				description: "references",
  				type: self.commandProcessor.array,
  				data: self.data.references,
  				handlers: {
  					organisation: function(value) {
  						return value.name ? value.name.setName() : "";
  					},
  					title: function(value) {
  						return value.reference;
  					}
  				}
  			};
  		}
  	};
  
  	self.initCommands = function() {
  		self.initMan();
  		self.initHelp();
  		self.initClear();
  		self.initName();
  		self.initSummary();
  		self.initPdfLink();
  		self.initLocation();
  		self.initLabel();
  		self.initProfiles();
  		self.initSkills();
  		self.initSplash();
  		self.initEducation();
  		self.initWork();
  		self.initVolunteer();
  		self.initAwards();
  		self.initPublications();
  		self.initLanguages();
  		self.initInterests();
  		self.initReferences();
  	};
  
  	self.initSocialMedia = function() {
  		self.data.basics.profiles.forEach(function(value) {
  			if (!value.network) {// Ensure has network
  				return;
  			}
  
  			if (!self.data.basics.githubUsername &&
  				value.network.toLowerCase() === "github") {
  				if (value.username) {
  					self.data.basics.githubUsername = value.username;
  				}
  			} else if (value.network.toLowerCase() === "resume") {
  				self.data.basics.pdfLink = value.url;
  			}
  		});
  	};
  
  	self.initGithub = function() {
  		getGithub(getGithubUri(self.data.basics.githubUsername),
  				self.data.basics.githubUsername, self.showForks,
  				function(result) {
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
  				});
  	};
  
  	// Initialize variables
  	self.initVariables = function() {
  		self.data.commands = {};
  
  		if (self.data.basics.profiles) {
  			self.initSocialMedia();
  		}
  
  		if (self.data.basics.githubUsername) {
  			self.initGithub();
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
  
  		if (!self.data.basics) {
  			self.data.basics = {};
  		}
  
  		if (options.extraDetails) {
  			$.getJSON(options.extraDetails, function(extraResponse) {
  				self.data.pgpkey = extraResponse.pgpkey;
  
  				if (self.data.pgpkey) {
  					self.commands.pgpkey = {
  						title: "PGP Key",
  						description: "public PGP key",
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
  
  				if (extraResponse.github) {
  					self.data.basics.githubUsername = extraResponse.github;
  					self.data.githubCache = CONSTANTS.EMPTY;
  				}
  
  				if (extraResponse.splash) {
  					if (typeof extraResponse.splash === "string") {
  						self.data.customSplash = extraResponse.splash +
  							CONSTANTS.NEW_LINE;
  					} else {
  						self.data.customSplash = extraResponse.splash.join(
  							CONSTANTS.NEW_LINE);
  					}
  				}
  				self.init(options);
  			});
  		} else {
  			self.init(options);
  		}
  	});
  
  	this.CMDResume = self;
  
  	return this;
  };
  
}(jQuery));