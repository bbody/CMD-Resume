(function($){
	"use strict";

	$.fn.CMDResume = function(endpoint, options){
		// String comparison for better readability
		String.prototype.is = function(comparison){
		    return ("" + this) === comparison;
		};

		String.prototype.capitalizeFirstLetter = function(){
		    var temp = this.replace(/\b[a-z]/g, function(letter) {
		        return letter.toUpperCase();
		    });

		    return temp;
		};

		// Return colour
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

		var updateTitle = function(name){
		    if (name){
		        document.title = name + "'s Résumé";
		    }
		};

		String.prototype.setTitle = function(){
		    return this.setFormat("red", true);
		};

		String.prototype.setCommand = function(){
		    return this.setFormat("white", false, true);
		};

		String.prototype.setName = function(){
		    return this.setFormat("green", true);
		};

		String.prototype.setPGP = function(){
			return this.setFormat("white", false, true);
		};

		function isNotEmpty(string){
		    if (string === undefined || string === null || string.length === 0){
		        return false;
		    } else {
		        return true;
		    }
		}

		function getDate(startDate, endDate){
		    return endDate ? startDate + " - " + endDate : startDate + " - Present";
		}

		function getFullDegree(studyType, area){
		    return studyType ? studyType + " of " + area : area;
		}

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

		// Get current 
		var element = $(this);
		var self = {};

		self.commandFunctionMap = {
			hasCommand: function(command){
			    if (command === "hasCommand"){
			        return false;
			    } else {
			        return this[command] !== undefined;
			    }
			}
		};

		self.commandMap = {
			getKeys: function(){ // Get list of functions from command map
			    var commands = [];
			    $.map(this, function(element,index) {
			        commands.push(index);
			    });
			    return commands;
			},
			getCommandList: function (){ // Get key list of the command map
			    var commands = "Available Commands:".setTitle();
			    for (var key in this) {
			        if( typeof this[key] !== 'function') {
			            commands += "\n";
			            commands += key.setCommand() + " - " + this[key];
			        }
			    }
			    return commands;
			}
		};

		self.initTerminal = function(){
			element.terminal(function(command, term) {
                term.echo(self.commandLineParse(command) + "\n");
            }, self.settings);
		};

		self.init = function(options){
			self.initTerminal();
			//self.initVariables();
		};

		var arrayHandlerFunction = function(command, top){
			var result = "";
			if (!top){
				result += command.title.setTitle();
			}

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
			return command.handler(command.data);
		};


		// Parse command line
		self.commandLineParse = function(input){
		    var commandList = input.toLowerCase().split(" ");

		    // Command sections
		    var rootCommand = commandList[0] !== undefined ? commandList[0] : false;
		    var stemCommand = commandList[1] !== undefined && commandList[1].length > 0 ? commandList[1] : false;

		    if (rootCommand === "help"){
		        return self.commands.system.help.handler();
		    } else if (rootCommand === "man"){
		        return self.commands.system.man.handler(stemCommand);
		    } else if (self.commands.arrays[rootCommand]) {
		    	var top = stemCommand && stemCommand === "-top";
		    	return arrayHandlerFunction(self.commands.arrays[rootCommand], top);
		    } else if (self.commands.basic[rootCommand]){
		    	return self.commands.basic[rootCommand].title.setTitle() + "\n" + self.commands.basic[rootCommand].data;
		    } else if (self.commands.calculated[rootCommand]){
		    	return self.commands.calculated[rootCommand].title.setTitle() + "\n" + calculatedHandlerFunction(self.commands.calculated[rootCommand]);
		    // } else if (rootCommand.is("skills")){
		    //     if (stemCommand){
		    //         var fullCommand = rootCommand + " " + stemCommand;
		    //         if (fullCommand in this.commandFunctionMap){
		    //             return this.commandFunctionMap[fullCommand];
		    //         } else {
		    //             return "Warning: Invalid arguments";
		    //         }
		    //     } else {
		    //         return this.commandFunctionMap[rootCommand];
		    //     }
		    } else {
		        if (rootCommand.length > 0){
		            return rootCommand.setCommand() + " is an unknown command.";
		        } else {
		            return "No command entered.";
		        }
		    }

		    return input;
		};

		
		// Get the Github information
		self.getGithub = function(){
		        if (self.data.githubCache){
		        $.getJSON('https://api.github.com/users/' + self.data.basics.githubUsername + '/repos?callback=?', function(response){
		            var repos = response.data;

		            $(repos).each(function() {
		            	if (this && (this.name !== (self.data.basics.githubUsername.toLowerCase() + '.github.com'))){
		            		var repoCache = "\n";

			            	repoCache += this.name.setName();

			            	if (this.description){
			            		repoCache += " - " + this.description;
			            	}

			            	console.log(repoCache);
			            	
			            	self.data.githubCache += repoCache;
			            	console.log(self.data.githubCache);
		            	}
		            });
		            return self.data.githubCache;
		        });
		    }

		    return self.data.githubCache;
		};

		self.setToppedCommand = function(command, information, functionPointer){
		    var loweredCommand = command.toLowerCase();
		    self.commandMap[loweredCommand] = information + " [-top]";
		    self.commandFunctionMap[loweredCommand] = command.setTitle() + functionPointer();
		    self.commandFunctionMap[loweredCommand + " -top"] = functionPointer();
		};
		
		self.setCommand = function(command, information, method, data){
	        if (isNotEmpty(data)){
	            this.commandMap[command] = information;
	            this.commandFunctionMap[command] = method;
	        }
		};

		// Get list of commands for autocomplete
		self.getCommandList = function(){
			var commands = [];

			$.map(self.commands, function(value, key) {
		        $.map(value, function(value, key) {
			        commands.push(key);
			    });
		    });

			return commands;
		};

		self.hasCommand = function(command){
			return self.commandList.indexOf(command) >= 0;
		};

		self.getCategory = function(command){
			var category = "";
			$.map(self.commands, function(parentValue, parentKey) {
		        $.map(parentValue, function(value, key) {
		        	if (command === key){
		        		category = parentKey;
		        		return false;
		        	}
			    });
		    });

			return category;
		};

		// Initialize variables
		self.initVariables = function(){
			self.commands = {
				system:{},
				basic:{},
				calculated:{},
				arrays:{}
			};

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

					self.commands.calculated.github = {
						title: "Github Repositories",
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
					//
					//self.initGithub();
				} else if (this.network.toLowerCase() === "cmd-resume-pdf"){
					self.data.basics.pdfLink = this.url;
				}
			});

			
			self.commands.system.man = {
				title: "man".setCommand(),
				handler: function(command){
					if (!command){
				        return "man:".setCommand() + " No command entered.";
				    } else if (self.hasCommand(command)){
				        return command.setCommand() + " - " + self.commands[self.getCategory(command)][command].description;
				    } else {
				        return "man:".setCommand() + " `" + command + "` is an unknown command.";
				    }
				},
				description: "describes what each command does"
			};

			self.commands.system.help = {
				title: "Help",
				handler: function(){
					var commands = "Available Commands:".setTitle();
					$.map(self.commands, function(value, key) {
				        $.map(value, function(value, key) {
				        	commands += "\n";
				            commands += key.setCommand() + " - " + value.description;
					    });
				    });
				    return commands;
				},
				description: "lists help for all the commands"
			};

			self.commands.system.clear = {
				description: "clear command history from screen"
			};

			if (self.data.basics.name){
				self.commands.basic.name = {
					title: "Name",
					data: self.data.basics.name,
					description: "owner of the résumé"
				};
			}

			if (self.data.cmd_resume && self.data.cmd_resume.pgpkey){
				self.commands.calculated.pgpkey = {
					title: "PGP Key",
					data: self.data.cmd_resume.pgpkey,
					handler: function(data){
						return data.setPGP();
					},
					description: "public PGP key"
				};
			}

			if (self.data.basics.summary){
				self.commands.basic.about = {
					title: "About",
					data: self.data.basics.summary,
					description: "about me"
				};
			}

			if (self.data.basics.pdfLink){
				self.commands.calculated.pdf = {
					title: "Resume PDF",
					data: self.data.basics.pdfLink,
					handler: function(data){
						window.open(data);
						return data + "\nHint: May need to allow pop-ups.";
					},
					description: "pdf version of the résumé"
				};
			}

			if (self.data.basics.location){
				self.commands.calculated.location = {
					title: "Location",
					data: self.data.basics.location,
					handler: function(data){
						return data.city + (data.region ? ", " + data.region : "") + ", " + data.countryCode;
					},
					description: "current location"
				};
			}

			if (self.data.basics.label){
				self.commands.calculated.lookingfor = {
					title: "Looking For",
					data: self.data.basics.label,
					handler: function(data){
						return data + " positions";
					},
					description: "looking for what kind of position"
				};
			}

			if (self.data.basics.profiles){
				self.commands.calculated.socialmedia = {
					title: "Social Media",
					data: self.data.basics.profiles,
					handler: function(data){
						var result = "";
						$(data).each(function(){
							if (this.network && this.network !== "cmd-resume-pdf"){
					        	if (this.url){
					        		result += "\n";
					        		result += this.network + " - " + this.url;
					        	} else if (this.username){
					        		var url = "";

					        		url = buildUrl(this.network, this.username);

					        		if (url){
					        			result += "\n";
					        			result += this.network + " - " + url;
					        		}
					        	}
					    	}
					    });
					    return result;
					},
					description: "social media profiles"
				};
			}

			if (self.data.cmd_resume && self.data.cmd_resume.splash){
				self.commands.calculated.splash = {
					title: "Splash Screen",
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
				self.commands.arrays.education = {
					title: "Education",
					data: self.data.education,
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
				self.commands.arrays.employment = {
					title: "Employment",
					data: self.data.work,
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
				self.commands.arrays.volunteering = {
					title: "Volunteering",
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
				self.commands.arrays.awards = {
					title: "Awards",
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

			if (self.data.publications && self.data.awards.publications > 0){
				self.commands.arrays.publications = {
					title: "Publications",
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

			self.commandList = self.getCommandList();

			self.settings = {
	            greetings: (self.commands.calculated.splash ? self.commands.calculated.splash.handler(self.commands.calculated.splash.data) : "Something"),
	            onBlur: function() {
	                // prevent loosing focus
	                return false;
	            },
	            completion: self.commandList
	        };

	        updateTitle(self.data.basics.name);
		};

		$.getJSON(endpoint, function(data){
			self.data = data;

			self.initVariables();

			self.init(options);
		});
	};
}(jQuery));
