(function($){
	"use strict";

	$.fn.CMDResume = function(endpoint, options){
		// Get element
		var element = $(this);

		// Update HTML title
		var updateTitle = function(name){
		    if (name){
		        document.title = name + "'s Résumé";
		    }
		};

		// Update color
		String.prototype.setFormat = function(color, bold, italic, backgroundColor){
		    color = typeof color !== 'undefined' ? color: null;
		    bold = typeof bold !== 'undefined' ? bold: false;
		    italic = typeof italic !== 'undefined' ? italic: false;
		    backgroundColor = typeof backgroundColor !== 'undefined' ? backgroundColor: null;

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
		    return this.setFormat("red", true);
		};

		// Command formatter
		String.prototype.setCommand = function(){
		    return this.setFormat("white", false, true);
		};

		// Name formatter
		String.prototype.setName = function(){
		    return this.setFormat("green", true);
		};

		// PGP formatter
		String.prototype.setPGP = function(){
			return this.setFormat("white", false, true);
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

		var calculatedHandlerFunction = function(command){
			return "\n" + command.handler(command.data);
		};

		
		var self = {};

		self.commands = {};

		self.commandProcessor = {
			basic: basicHandlerFunction,
			array: arrayHandlerFunction,
			calculated: calculatedHandlerFunction,
			system: systemHandlerFunction
		};

		self.initTerminal = function(){
			element.terminal(function(command, term) {
                term.echo(self.commandLineParse(command) + "\n");
            }, self.settings);
		};

		self.init = function(options){
			self.initVariables();
			self.initCommands();
			self.initSettings();
			self.initHTMLTitle();
			self.initTerminal();
		};

		// Parse command line
		self.commandLineParse = function(input){
		    var commandList = input.toLowerCase().split(" ");

		    // Command sections
		    var rootCommand = commandList[0] !== undefined ? commandList[0] : false;
		    var stemCommand = commandList[1] !== undefined && commandList[1].length > 0 ? commandList[1] : false;
		    var command = self.commands[rootCommand];
		    if (rootCommand == "man"){
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
			// console.log(self.commandProcessor);
			// console.log(command.type);
			var result = "";

			if (!top && command.type !== self.commandProcessor.system){
				result += command.title.setTitle();
			}

			result += command.type(command, top);

			return result;
		};

		
		// Get the Github information
		self.getGithub = function(){
		        if (!self.data.githubCache){
		        $.getJSON('https://api.github.com/users/' + self.data.basics.githubUsername + '/repos?callback=?', function(response){
		            var repos = response.data;

		            $(repos).each(function() {
		            	if (this && (this.name !== (self.data.basics.githubUsername.toLowerCase() + '.github.com'))){
		            		var repoCache = "\n";

			            	repoCache += this.name.setName();

			            	if (this.description){
			            		repoCache += " - " + this.description;
			            	}
			            	
			            	self.data.githubCache += repoCache;
		            	}
		            });
		            return self.data.githubCache;
		        });
		    }

		    return self.data.githubCache;
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
				type: self.commandProcessor.system,
				handler: function(command){
					if (!command){
				        return "man:".setCommand() + " No command entered.";
				    } else if (self.hasCommand(command)){
				        return command.setCommand() + " - " + self.commands[command].description;
				    } else {
				        return "man:".setCommand() + " `" + command + "` is an unknown command.";
				    }
				},
				description: "describes what each command does"
			};

			self.commands.help = {
				title: "Help",
				type: self.commandProcessor.system,
				handler: function(){
					var commands = "Available Commands:".setTitle();
					$.map(self.commands, function(value, key) {
				        commands += "\n";
			            commands += key.setCommand() + " - " + value.description;
				    });
				    return commands;
				},
				description: "lists help for all the commands"
			};

			self.commands.clear = {
				description: "clear command history from screen"
			};

			if (self.data.basics.name){
				self.commands.name = {
					title: "Name",
					data: self.data.basics.name,
					type: self.commandProcessor.basic,
					description: "owner of the résumé"
				};
			}

			if (self.data.cmd_resume && self.data.cmd_resume.pgpkey){
				self.commands.pgpkey = {
					title: "PGP Key",
					data: self.data.cmd_resume.pgpkey,
					type: self.commandProcessor.calculated,
					handler: function(data){
						return data.setPGP();
					},
					description: "public PGP key"
				};
			}

			if (self.data.basics.summary){
				self.commands.about = {
					title: "About",
					data: self.data.basics.summary,
					type: self.commandProcessor.basic,
					description: "about me"
				};
			}

			if (self.data.basics.pdfLink){
				self.commands.pdf = {
					title: "Resume PDF",
					data: self.data.basics.pdfLink,
					type: self.commandProcessor.calculated,
					handler: function(data){
						window.open(data);
						return data + "\nHint: May need to allow pop-ups.";
					},
					description: "pdf version of the résumé"
				};
			}

			if (self.data.basics.location){
				self.commands.location = {
					title: "Location",
					data: self.data.basics.location,
					type: self.commandProcessor.calculated,
					handler: function(data){
						return data.city + (data.region ? ", " + data.region : "") + ", " + data.countryCode;
					},
					description: "current location"
				};
			}

			if (self.data.basics.label){
				self.commands.lookingfor = {
					title: "Looking For",
					data: self.data.basics.label,
					type: self.commandProcessor.calculated,
					handler: function(data){
						return data + " positions";
					},
					description: "looking for what kind of position"
				};
			}

			if (self.data.basics.profiles){
				self.commands.socialmedia = {
					title: "Social Media",
					data: self.data.basics.profiles,
					type: self.commandProcessor.calculated,
					handler: function(data){
						var result = "";
						$.each(data, function(key, value){
							if (value.network && value.network !== "cmd-resume-pdf"){
								if (key !== 0){
									result += "\n";
								}

					        	if (value.url){
					        		result += value.network + " - " + value.url;
					        	} else if (value.username){
					        		var url = "";

					        		url = buildUrl(value.network, value.username);

					        		if (url){
					        			result += value.network + " - " + url;
					        		}
					        	}

					        	
					    	}
					    });
					    return result;
					},
					description: "social media profiles"
				};
			}

			if (self.data.skills && self.data.skills.length > 0){
				self.commands.skills = {
					title: "Skills",
					type: self.commandProcessor.calculated,
					data: self.data.skills,
					handler: function(data){
						var result = "";

						$.each(data, function(key, value){
							result += value.level;
							result += " in ";
							result += value.name;
							if (key !== data.length - 1){
								result += "\n";
							}
						});

						return result;
					},
					description: "skills obtained"
				};
			}

			if (self.data.cmd_resume && self.data.cmd_resume.splash){
				self.commands.splash = {
					title: "Splash Screen",
					type: self.commandProcessor.calculated,
					data: self.data.cmd_resume.splash,
					handler: function(data){
						var results = "";
						if (data){
							results += data;
							results += "\n\n";
						}

						if (self.data.basics.name){
					        results += "Welcome to " + self.data.basics.name.setName() + "'s résumé.\n";
					    } else {
					        results += "Welcome to my résumé.\n";
					    }

					    results += "Type ";
					    results += "help".setCommand();
					    results +=" for commands";

						return results;
					},
					description: "print the welcome screen"
				};
			}

			if (self.data.education && self.data.education.length > 0){
				self.commands.education = {
					title: "Education",
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
					},
					description: "education history"
				};
			}

			if (self.data.work && self.data.work.length > 0){
				self.commands.employment = {
					title: "Employment",
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
					},
					description: "employment history"
				};
			}

			if (self.data.volunteer && self.data.volunteer.length > 0){
				self.commands.volunteering = {
					title: "Volunteering",
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
					},
					description: "volunteering history"
				};
			}

			if (self.data.awards && self.data.awards.length > 0){
				self.commands.awards = {
					title: "Awards",
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
					},
					description: "awards obtained"
				};
			}

			if (self.data.publications && self.data.publications.length > 0){
				self.commands.publications = {
					title: "Publications",
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
					},
					description: "publications produced"
				};
			}

		};

		// Initialize variables
		self.initVariables = function(){
			$(self.data.basics.profiles).each(function(){
				if (this.network.toLowerCase() === "github"){
					self.data.githubCache = "";
					if (this.username){
						self.data.basics.githubUsername = this.username;
					} else if (this.url){
						// TODO: Parse
						self.data.basics.githubUsername = this.url;
					}
					

					self.getGithub();

					self.commands.github = {
						title: "Github Repositories",
						type: self.commandProcessor.calculated,
						data: self.data.githubCache,
						handler: function(data){
							if (data){
								return data;
							} else {
								return self.getGithub();
							}
						},
						description: "list Github repositories"
					};
				} else if (this.network.toLowerCase() === "cmd-resume-pdf"){
					self.data.basics.pdfLink = this.url;
				}
			});
		};

		self.initSettings = function(){
			self.commandList = self.getCommandList();

			self.settings = {
	            greetings: (null ? self.processCommand(self.commands.splash) : "Something"),
	            onBlur: function() {
	                // prevent loosing focus
	                return false;
	            },
	            completion: self.commandList
	        };
		};

		self.initHTMLTitle = function(){
			updateTitle(self.data.basics.name);
		};

		$.getJSON(endpoint, function(data){
			self.data = data;
			self.init(options);
		});
	};
}(jQuery));
