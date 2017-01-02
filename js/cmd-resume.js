var styles = {
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
    if (name){
        document.title = name + "'s Résumé";
    } else {
    	document.title = "Command Line Résumé";
    }
};


// Update color
String.prototype.setFormat = function(type){
	var style = styles[type];
    var color = style.color ? style.color : "#000";
    var bold = style.bold ? style.bold : false;
    var italic = style.italic ? style.italic : false;
    var backgroundColor = style.backgroundColor ? style.backgroundColor : null;

    var result = "[[";
    if (bold){
        result += "b";
    }
    if (italic){
        result += "i";
    }
    if (color !== null){
        result += ";";
        result += color;
    }
    if (backgroundColor !== null){
        if (bold || italic || color !== null){
            result += ";";
        }
        result += backgroundColor;
    } else {
        if (bold || italic || color !== null){
            result += ";";
        }
        result += "#000";
    }

    result += "]";
    result += this;
    result += "]";

    return result;
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

// Format date
function getDate(startDate, endDate){
    return endDate ? startDate + " - " + endDate : startDate + " - Present";
}

// Get degree name
function getFullDegree(studyType, area){
    return studyType ? studyType + " of " + area : area;
}

// Build URL based on social media username
function buildUrl(network, username){
	network = network.toLowerCase();
	if (network === "twitter"){
		return "https://www.twitter.com/" + username;
	} else if (network === "github"){
		return "https://www.github.com/" + username;
	} else {
		return "";
	}
}

// Command handlers
var basicHandlerFunction = function(command){
	return "\n" + command.data;
};

var systemHandlerFunction = function(command){
	return command.handler(command.data);
};

var arrayHandlerFunction = function(command, top){
	var result = "";

    $.each(command.data, function(index, value){
        if (!top){
            result += "\n";
        }

        result += command.handlers.organisation(value) + "\t";
        result += command.handlers.title(value) + "\t";
        result += command.handlers.date(value);

        // break;
        if (top && index === 0){
            return false;
        }
    });

	return result;
};

var initStyles = function(options){
	$.map(options, function(value, key){
		if (styles[key]){
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
};

var calculatedHandlerFunction = function(command){
	return "\n" + command.handler(command.data);
};

/*globals jQuery:false */
(function($){
	"use strict";

	$.fn.CMDResume = function(primaryEndpoint, secondaryEndpoint, options){
		// Get element
		var element = $(this);

		options = options || {};
		
		// If there are no options, this might mean the second variable is options
		if (!options){
			if ((typeof secondaryEndpoint) !== "string"){
				options = secondaryEndpoint;
			}
		}

		initStyles(options);

		var self = {};

		self.commands = {};

		self.commandProcessor = {
			basic: basicHandlerFunction,
			array: arrayHandlerFunction,
			calculated: calculatedHandlerFunction,
			system: systemHandlerFunction
		};

		self.initTerminal = function(){
			self.term = element.terminal(function(command, term) {
                term.echo(self.commandLineParse(command) + "\n");
            }, self.settings);
		};

		self.init = function(options){
			self.initVariables();
			self.initCommands();
			self.initSettings();
			self.initHTMLTitle();
			self.initTerminal();
			self.showForks = options.showForks === true || 
				options.showForks === "true" ? true : false;
		};

		// Parse command line
		self.commandLineParse = function(input){
		    var commandList = input.toLowerCase().split(" ");

		    // Command sections
		    var rootCommand = commandList[0] !== undefined ? commandList[0] : false;
		    var stemCommand = commandList[1] !== undefined && commandList[1].length > 0 ? commandList[1] : false;
		    var command = self.commands[rootCommand];
		    if (rootCommand === "man"){
		    	return self.commands.man.handler(stemCommand);
		    } else if (command){
		    	var top = stemCommand === "-top" ? true : false;
		    	return self.processCommand(command, top);
		    } else {
		        if (rootCommand.length > 0){
		            return rootCommand.setCommand() + " is an unknown command.";
		        } else {
		            return "No command entered.";
		        }
		    }
		};

		self.processCommand = function(command, top){
			var result = "";

			if (!top && 
				command.type !== self.commandProcessor.system){
				result += command.title.setTitle();
			}

			result += command.type(command, top);

			return result;
		};

		
		// Get the Github information
		self.getGithub = function(){
	        if (!self.data.githubCache){
	        	var githubAPIURI = 'https://api.github.com/users/' + 
	        		self.data.basics.githubUsername + '/repos?callback=?';
		        $.getJSON(githubAPIURI, function(response){
		            var repos = response.data;
		            var first = true;
		            $.each(repos, function(key, value) {
		            	if (value && 
		            		(value.name !== (self.data.basics.githubUsername.toLowerCase() + '.github.com')) &&
		            		(self.showForks === value.fork || !value.fork)){
		            		var repoCache = "";

		            		if (!first){
		            			repoCache += "\n";
		            		} else {
		            			first = false;
		            		}

			            	repoCache += value.name.setName();

			            	if (value.description){
			            		repoCache += " - " + value.description;
			            	}
			            	
			            	self.data.githubCache += repoCache;
		            	}
		            });

		            self.commands.github = {
						title: "Github Repositories",
						description: "list Github repositories",
						type: self.commandProcessor.basic,
						data: self.data.githubCache
					};

					self.commandList.push("github");
		        });
		    }
		};

		// Get list of commands for autocomplete
		self.getCommandList = function(){
			var commands = [];

			$.map(self.commands, function(value, key) {
		        commands.push(key);
		    });

			return commands;
		};

		self.hasCommand = function(command){
			return self.commandList.indexOf(command) >= 0;
		};

		self.getCategory = function(command){
			return self.commands[command].type;
		};

		self.initCommands = function(){
			self.commands.man = {
				title: "man".setCommand(),
				description: "describes what each command does",
				type: self.commandProcessor.system,
				handler: function(command){
					if (!command){
				        return "man:".setCommand() + " No command entered.";
				    } else if (self.hasCommand(command)){
				        return command.setCommand() + " - " + 
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
				handler: function(){
					var commands = "Available Commands:".setTitle();
					$.map(self.commands, function(value, key) {
				        commands += "\n";
			            commands += key.setCommand() + " - " + value.description;
				    });
				    return commands;
				}
			};

			self.commands.clear = {
				description: "clear command history from screen"
			};

			if (self.data.basics.name){
				self.commands.name = {
					title: "Name",
					description: "owner of the résumé",
					data: self.data.basics.name,
					type: self.commandProcessor.basic
				};
			}

			if (self.data.cmd_resume && self.data.cmd_resume.pgpkey){
				self.commands.pgpkey = {
					title: "PGP Key",
					description: "public PGP key",
					data: self.data.cmd_resume.pgpkey,
					type: self.commandProcessor.calculated,
					handler: function(data){
						return data.setPGP();
					}
				};
			}

			if (self.data.basics.summary){
				self.commands.about = {
					title: "About",
					description: "about me",
					data: self.data.basics.summary,
					type: self.commandProcessor.basic
				};
			}

			if (self.data.basics.pdfLink){
				self.commands.pdf = {
					title: "Resume PDF",
					description: "pdf version of the résumé",
					data: self.data.basics.pdfLink,
					type: self.commandProcessor.calculated,
					handler: function(data){
						window.open(data);
						return data + "\nHint: May need to allow pop-ups.";
					}
				};
			}

			if (self.data.basics.location){
				self.commands.location = {
					title: "Location",
					description: "current location",
					data: self.data.basics.location,
					type: self.commandProcessor.calculated,
					handler: function(data){
						return data.city + 
							(data.region ? ", " + data.region : "") + 
							", " + data.countryCode;
					}
				};
			}

			if (self.data.basics.label){
				self.commands.lookingfor = {
					title: "Looking For",
					description: "looking for what kind of position",
					data: self.data.basics.label,
					type: self.commandProcessor.calculated,
					handler: function(data){
						return data + " positions";
					}
				};
			}

			if (self.data.basics.profiles){
				self.commands.socialmedia = {
					title: "Social Media",
					description: "social media profiles",
					data: self.data.basics.profiles,
					type: self.commandProcessor.calculated,
					handler: function(data){
						var result = "";
						$.each(data, function(key, value){
							if (value.network){
								if (key !== 0){
									result += "\n";
								}

								if (value.network.toLowerCase() === "email"){
									result += value.network + " - " + 
										value.url.split(":")[1];
								} else if (value.url){
					        		result += value.network + " - " + value.url;
					        	} else if (value.username){

					        		var url = buildUrl(value.network, value.username) || "";

					        		if (url){
					        			result += value.network + " - " + url;
					        		}
					        	}

					        	
					    	}
					    });
					    return result;
					}
				};
			}

			if (self.data.skills){
				self.commands.skills = {
					title: "Skills",
					description: "skills obtained",
					type: self.commandProcessor.calculated,
					data: self.data.skills,
					handler: function(data){
						var result = "";

						$.each(data, function(key, value){
							result += value.level;
							result += " in ";
							result += value.name;

							// Make sure not the last entry (to avoid putting in a newline)
							if (key !== data.length - 1){
								result += "\n";
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
				handler: function(){
					var results = "";

					if (self.data.cmd_resume.splash){
						if (self.data.cmd_resume.splash){
							results += self.data.cmd_resume.splash;
							results += "\n";
						}
					}

					if (self.data.basics.name){
				        results += "Welcome to " + 
				        	self.data.basics.name.setName() + 
				        	"'s résumé.\n";
				    } else {
				        results += "Welcome to my résumé.\n";
				    }

				    results += "\nType " + "help".setCommand() + " for commands";

					return results;
				}
			};

			if (self.data.education){
				self.commands.education = {
					title: "Education",
					description: "education history",
					data: self.data.education,
					type: self.commandProcessor.array,
					handlers:{
						organisation: function(value){
							return value.institution;
						},
						title: function(value){
							return getFullDegree(value.studyType, value.area);
						},
						date: function(value){
							return getDate(value.startDate, value.endDate);
						}
					}
				};
			}

			if (self.data.work){
				self.commands.employment = {
					title: "Employment",
					description: "employment history",
					data: self.data.work,
					type: self.commandProcessor.array,
					handlers:{
						organisation: function(value){
							return value.company;
						},
						title: function(value){
							return value.position;
						},
						date: function(value){
							return getDate(value.startDate, value.endDate);
						}
					}
				};
			}

			if (self.data.volunteer){
				self.commands.volunteering = {
					title: "Volunteering",
					description: "volunteering history",
					type: self.commandProcessor.array,
					data: self.data.volunteer,
					handlers:{
						organisation: function(value){
							return value.organization;
						},
						title: function(value){
							return value.position;
						},
						date: function(value){
							return getDate(value.startDate, value.endDate);
						}
					}
				};
			}

			if (self.data.awards){
				self.commands.awards = {
					title: "Awards",
					description: "awards obtained",
					type: self.commandProcessor.array,
					data: self.data.awards,
					handlers:{
						organisation: function(value){
							return value.awarder;
						},
						title: function(value){
							return value.title;
						},
						date: function(value){
							return value.date;
						}
					}
				};
			}

			if (self.data.publications){
				self.commands.publications = {
					title: "Publications",
					description: "publications produced",
					type: self.commandProcessor.array,
					data: self.data.publications,
					handlers:{
						organisation: function(value){
							return value.publisher;
						},
						title: function(value){
							return value.name;
						},
						date: function(value){
							return value.releaseDate;
						}
					}
				};
			}

			if (self.data.languages){
				self.commands.languages = {
					title: "Languages",
					description: "languages",
					type: self.commandProcessor.array,
					data: self.data.languages,
					handlers:{
						organisation: function(value){
							return value.language;
						},
						title: function(value){
							return value.fluency;
						},
						date: function(value){
							return "";
						}
					}
				};
			}

			if (self.data.interests){
				self.commands.interests = {
					title: "Interests",
					description: "interests",
					type: self.commandProcessor.array,
					data: self.data.interests,
					handlers:{
						organisation: function(value){
							return value.name + ":";
						},
						title: function(value){
							return value.keywords.join(", ");
						},
						date: function(value){
							return "";
						}
					}
				};
			}

			if (self.data.references){
				self.commands.references = {
					title: "References",
					description: "references",
					type: self.commandProcessor.array,
					data: self.data.references,
					handlers:{
						organisation: function(value){
							return (value.name).setName() + ":";
						},
						title: function(value){
							return "\n" + value.reference;
						},
						date: function(value){
							return "";
						}
					}
				};
			}

		};

		// Initialize variables
		self.initVariables = function(){
			if (!self.data.cmd_resume){
				self.data.cmd_resume = {};
			}

			$(self.data.basics.profiles).each(function(){
				if (!self.data.basics.githubUsername && this.network.toLowerCase() === "github"){
					self.data.githubCache = "";
					if (this.username){
						self.data.basics.githubUsername = this.username;
					} else if (this.url){
						// TODO: Parse
						self.data.basics.githubUsername = this.url;
					}
				} else if (this.network.toLowerCase() === "resume"){
					self.data.basics.pdfLink = this.url;
				}
			});

			if (self.data.basics.githubUsername){
				self.getGithub();
			}
		};

		self.initSettings = function(){
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

		self.initHTMLTitle = function(){
			updateTitle(self.data.basics.name);
		};

		$.getJSON(primaryEndpoint, function(response){
			self.data = response;

			if (!secondaryEndpoint){
				self.init(options);
			}

			$.getJSON(secondaryEndpoint, function(response){
				self.data.pgpkey = response.pgpkey;

				if (self.data.pgpkey){
					self.commands.pgpkey = {
						title: "PGP Key",
						description: "print PGP key",
						type: self.commandProcessor.calculated,
						handler: function(){
							var results = "";

							for (var i = 0; i < self.data.pgpkey.length; i++){
								results += self.data.pgpkey[i];
								if (i !== self.data.pgpkey.length - 1){
									results += "\n";
								}
							}
							return results.setPGP();
						}
					};
				}

				if (response.github){
					self.data.basics.githubUsername = response.github;
					self.data.githubCache = "";
				}

				self.init(options);
			});
		});
	};
}(jQuery));
