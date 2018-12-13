$.fn.CMDResume = function(primaryEndpoint, options) {
	// Get element
	var element = this;

	options = options || {};

	defaultStyles = initStyles(defaultStyles, options);

	var self = {};

	self.commands = {};

	if (isJsonResumeHosted(primaryEndpoint) &&
		!isJsonFormat(primaryEndpoint)) {
		primaryEndpoint += ".json";
	}

	self.allCommands = [
		{
			name: "man",
			title: "man".setCommand(),
			description: "describes what each command does",
			type: CMD.SYSTEM,
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
		},
		{
			name: "Help",
			description: "lists help for all the commands",
			type: CMD.SYSTEM,
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
		},
		{
			name: "Name",
			description: "owner of the résumé",
			data: ["basics", "name"],
			type: CMD.BASIC
		},
		{
			name: "About",
			description: "about me",
			data: ["basics", "summary"],
			type: CMD.BASIC
		},
		{
			name: "pdf",
			title: "Résumé PDF",
			description: "pdf version of the résumé",
			data: ["basics", "pdfLink"],
			type: CMD.CALCULATED,
			handler: function(data) {
				window.open(data);
				return decodeURIComponent(escape(data)) + CONSTANTS.NEW_LINE +
				"Hint: May need to allow pop-ups.";
			}
		},
		{
			name: "Location",
			description: "current location",
			data: ["basics", "location"],
			dataIsObject: true,
			type: CMD.CALCULATED,
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
		},
		{
			name: "Label",
			description: "title",
			data: ["basics", "label"],
			type: CMD.BASIC
		},
		{
			name: "Education",
			description: "education history",
			type: CMD.ARRAY,
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
		},
		{
			name: "Employment",
			description: "employment history",
			data: "work",
			type: CMD.ARRAY,
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
		},
		{
			name: "Volunteering",
			description: "volunteering history",
			data: "volunteer",
			type: CMD.ARRAY,
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
		},
		{
			name: "socialmedia",
			title: "Social Media",
			description: "social media profiles",
			data: ["basics", "profiles"],
			dataIsObject: true,
			type: CMD.CALCULATED,
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
		},
		{
			name: "Skills",
			description: "skills obtained",
			type: CMD.CALCULATED,
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
		},
		{
			name: "Awards",
			description: "awards obtained",
			type: CMD.ARRAY,
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
		},
		{
			name: "Publications",
			description: "publications produced",
			type: CMD.ARRAY,
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
		},
		{
			name: "Languages",
			description: "languages",
			type: CMD.ARRAY,
			handlers: {
				organisation: function(value) {
					return value.language;
				},
				title: function(value) {
					return value.fluency;
				}
			}
		},
		{
			name: "Interests",
			description: "interests",
			type: CMD.ARRAY,
			handlers: {
				organisation: function(value) {
					return value.name ? value.name.setName() : "";
				},
				title: function(value) {
					return value.keywords ? value.keywords.join(CONSTANTS.COMA) : "";
				}
			}
		},
		{
			name: "References",
			description: "references",
			type: CMD.ARRAY,
			handlers: {
				organisation: function(value) {
					return value.name ? value.name.setName() : "";
				},
				title: function(value) {
					return value.reference;
				}
			}
		},
		{
			name: "splash",
			title: "Splash Screen",
			description: "print the welcome screen",
			type: CMD.SYSTEM,
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
		},
		{
			name: "pgpkey",
			title: "PGP Key",
			description: "public PGP key",
			type: CMD.CALCULATED,
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
		}
	];

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
		if (commandType === CMD.SYSTEM) {
			return false;
		} else if (top && (commandType === CMD.ARRAY)) {
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

		result += CMD.getCommand(command.type)(command, top);

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

	self.initClear = function() {
		self.commands.clear = {
			description: "clear command history from screen"
		};
	};

	self.addUserCommands = function(commands) {
		commands.forEach(function(command) {
			if (isValidCommand(command)) {
				self.addCommand(command);
			}
		});

	};

	self.addCommand = function(command) {
		if (command.type === CMD.SYSTEM ||
			isDefinedNotEmpty(self.data,
				command.data ? command.data : command.name.toLowerCase(),
				!!command.dataIsObject)) {
			var tempCommand = {
				title: command.title ? command.title : command.name,
				description: command.description,
				type: command.type
			};

			if (command.type !== CMD.SYSTEM) {
				tempCommand.data = getDataFromArrayKey(self.data,
					command.data ? command.data : command.name.toLowerCase());
			}

			if (command.handlers) {
				tempCommand.handlers = command.handlers;
			}

			if (command.handler) {
				tempCommand.handler = command.handler;
			}

			self.commands[command.name.toLowerCase()] = tempCommand;
		}
	};

	self.addCommands = function() {
		self.allCommands.forEach(function(command) {
			self.addCommand(command);
		});
	};

	self.initCommands = function() {
		self.initClear();
		self.addCommands();
		if (options.customCommands && Array.isArray(options.customCommands) &&
			options.customCommands.length) {
			self.addUserCommands(options.customCommands);
		}
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

		if (!!!self.data.basics.pdfLink && isJsonResumeHosted(primaryEndpoint)) {
			self.data.basics.pdfLink = getHtmlVersion(primaryEndpoint);
		}
	};

	self.initGithub = function() {
		getGithub(getGithubUri(self.data.basics.githubUsername),
				self.data.basics.githubUsername, self.showForks,
				function(result) {
					var formattedString = CONSTANTS.EMPTY;

					result.forEach(function(value, key) {
						formattedString += formatGithub(value, key === 0);
					});

					self.data.githubCache = formattedString;

					self.addCommand({
						name: "Github",
						title: "Github Repositories",
						description: "list Github repositories",
						type: CMD.BASIC,
						data: "githubCache"
					});
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
				self.data.extra = extraResponse;
				self.init(options);
			});
		} else {
			self.init(options);
		}
	});

	this.CMDResume = self;

	return this;
};
