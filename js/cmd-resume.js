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
					return data;
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
					var resultArray = [];
					data.forEach(function(value, index) {
						if (value.network) {
							if (value.network.toLowerCase() === "email") {
								resultArray.push(value.network +
									CONSTANTS.DASH +
									value.url.split(CONSTANTS.COLON).charAt(1));
							} else if (value.url) {
								resultArray.push(value.network + CONSTANTS.DASH +
								value.url);
							} else if (value.username) {
								var url = CONSTANTS.EMPTY;

								url = buildUrl(value.network, value.username);

								if (url) {
									resultArray.push(value.network
										+ CONSTANTS.DASH + url);
								}
							} else {
								resultArray.push(value.network);
							}
						} else if (value.url){
							resultArray.push(value.url);
						}
					});
					return resultArray.join(CONSTANTS.NEW_LINE);
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

		self.commands.splash = {
			title: "Splash Screen",
			description: "print the welcome screen",
			type: self.commandProcessor.system,
			handler: function() {
				var results = CONSTANTS.EMPTY;

				// Return custom splash if it exists
				if (self.data.customSplash){
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
						return value.name ? value.name.setName() : "";
					},
					title: function(value) {
						return value.keywords ? value.keywords.join(CONSTANTS.COMA) : "";
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
						return value.name ? value.name.setName() : "";
					},
					title: function(value) {
						return value.reference;
					}
				}
			};
		}
	};

	// Initialize variables
	self.initVariables = function() {
		self.data.commands = {};

		if (self.data.basics.profiles) {
			self.data.basics.profiles.forEach(function(value) {
				if (!value.network) return;
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
		}

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

		if (!self.data){
			self.data = {};
		}
		
		if (!self.data.basics){
			self.data.basics = {};
		}

		if (options.extraDetails) {
			$.getJSON(options.extraDetails, function(extraResponse) {
				if (extraResponse) {
					self.data.pgpkey = extraResponse.pgpkey;

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

					if (extraResponse.github) {
						self.data.basics.githubUsername = extraResponse.github;
						self.data.githubCache = CONSTANTS.EMPTY;
					}

					if (extraResponse.splash) {
						self.data.customSplash = extraResponse.splash;
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
