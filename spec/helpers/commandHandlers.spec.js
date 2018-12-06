describe("commandHandlers", function(){
	describe("Basic command handler", function() {
		it("Returns base case", function() {
			var command = {
				data: "Test"
			};

			expect(basicHandlerFunction(command)).toBe("\nTest");
		});

		it("Handles null input", function() {
			expect(basicHandlerFunction(null)).toBe("\n");
		});

		it("Handles no command", function() {
			expect(basicHandlerFunction({})).toBe("\n");
		});
	});

	describe("System command handler", function() {
		it("Handles valid input", function() {
			var command = {
				data: "Test",
				handler: function(data) {
					return data;
				}
			};

			expect(systemHandlerFunction(command)).toBe("Test");
		});

		it("Handles null input", function() {
			expect(systemHandlerFunction(null)).toBe("");
		});

		it("Handles no handle but data", function() {
			expect(systemHandlerFunction({data: "Test"})).toBe("Test");
		});

		it("Handles no handle and no data", function() {
			expect(systemHandlerFunction({})).toBe("");
		});
	});

	describe("Calculated command handler", function() {
		it("Handles valid input", function() {
			var command = {
				data: "Test",
				handler: function(data) {
					return data;
				}
			};

			expect(calculatedHandlerFunction(command)).toBe("\nTest");
		});

		it("Handles a null command", function() {
			expect(calculatedHandlerFunction(null)).toBe("\n");
		});

		it("Handles no handle but data", function() {
			expect(calculatedHandlerFunction({data: "Test"})).toBe("\nTest");
		});

		it("Handles undefined handler and no data", function() {
			expect(calculatedHandlerFunction({})).toBe("\n");
		});
	});
	describe("Calculated command handler", function() {
		beforeEach(function() {
			this.data = [
			{
				title: "Title 1",
				organisation: "Organisation 1",
				date: "Date 1"
			},
			{
				title: "Title 2",
				organisation: "Organisation 2",
				date: "Date 2"
			}
			];
		});

		it("Returns back the sent data", function() {
			var command = {
				data: this.data,
				handlers: {
					organisation: function(value) {
						return value.organisation;
					},
					title: function(value) {
						return value.title;
					},
					date: function(value) {
						return value.date;
					}
				}
			};

			expect(arrayHandlerFunction(command, false)).toBe("\nOrganisation 1    Title 1    Date 1\nOrganisation 2    Title 2    Date 2");
		});

		it("Top returns back first row", function() {
			var command = {
				data: this.data,
				handlers: {
					organisation: function(value) {
						return value.organisation;
					},
					title: function(value) {
						return value.title;
					},
					date: function(value) {
						return value.date;
					}
				}
			};

			expect(arrayHandlerFunction(command, true)).toBe("Organisation 1    Title 1    Date 1");
		});

		describe("Missing handlers", function() {
			it("Returns nothing when there are no handlers", function() {
				var command = {
					data: this.data
				};

				expect(arrayHandlerFunction(command)).toBe("");
			});

			it("Returns nothing when there are no handlers", function() {
				var command = {
					data: this.data,
					handlers: {}
				};

				expect(arrayHandlerFunction(command)).toBe("");
			});
			it("Returns without any organisation", function() {
				var command = {
					data: this.data,
					handlers: {
						title: function(value) {
							return value.title;
						},
						date: function(value) {
							return value.date;
						}
					}
				};

				expect(arrayHandlerFunction(command)).toBe("\nTitle 1    Date 1\nTitle 2    Date 2");
			});

			it("Returns without any organisation with top", function() {
				var command = {
					data: this.data,
					handlers: {
						title: function(value) {
							return value.title;
						},
						date: function(value) {
							return value.date;
						}
					}
				};

				expect(arrayHandlerFunction(command, true)).toBe("Title 1    Date 1");
			});

			it("Returns without any title", function() {
				var command = {
					data: this.data,
					handlers: {
						organisation: function(value) {
							return value.organisation;
						},
						date: function(value) {
							return value.date;
						}
					}
				};

				expect(arrayHandlerFunction(command)).toBe("\nOrganisation 1    Date 1\nOrganisation 2    Date 2");
			});

			it("Returns without any title with top", function() {
				var command = {
					data: this.data,
					handlers: {
						organisation: function(value) {
							return value.organisation;
						},
						date: function(value) {
							return value.date;
						}
					}
				};

				expect(arrayHandlerFunction(command, true)).toBe("Organisation 1    Date 1");
			});

			it("Returns without any date", function() {
				var command = {
					data: this.data,
					handlers: {
						title: function(value) {
							return value.title;
						},
						organisation: function(value) {
							return value.organisation;
						}
					}
				};

				expect(arrayHandlerFunction(command), "\nOrganisation 1    Title 1\nOrganisation 2    Title 2");
			});

			it("Returns without any date with top", function() {
				var command = {
					data: this.data,
					handlers: {
						organisation: function(value) {
							return value.organisation;
						},
						title: function(value) {
							return value.title;
						}
					}
				};

				expect(arrayHandlerFunction(command, true)).toBe("Organisation 1    Title 1");
			});

			it("Returns with only date", function() {
				var command = {
					data: this.data,
					handlers: {
						date: function(value) {
							return value.date;
						}
					}
				};

				expect(arrayHandlerFunction(command)).toBe("\nDate 1\nDate 2");
			});

			it("Returns with only date with top", function() {
				var command = {
					data: this.data,
					handlers: {
						date: function(value) {
							return value.date;
						}
					}
				};

				expect(arrayHandlerFunction(command, true)).toBe("Date 1");
			});

			it("Returns with only organisation", function() {
				var command = {
					data: this.data,
					handlers: {
						organisation: function(value) {
							return value.organisation;
						}
					}
				};

				expect(arrayHandlerFunction(command)).toBe("\nOrganisation 1\nOrganisation 2");
			});

			it("Returns with only organisation with top", function() {
				var command = {
					data: this.data,
					handlers: {
						organisation: function(value) {
							return value.organisation;
						}
					}
				};

				expect(arrayHandlerFunction(command, true)).toBe("Organisation 1");
			});

			it("Returns with only title", function() {
				var command = {
					data: this.data,
					handlers: {
						title: function(value) {
							return value.title;
						}
					}
				};

				expect(arrayHandlerFunction(command)).toBe("\nTitle 1\nTitle 2");
			});

			it("Returns with only title with top", function() {
				var command = {
					data: this.data,
					handlers: {
						title: function(value) {
							return value.title;
						}
					}
				};

				expect(arrayHandlerFunction(command, true)).toBe("Title 1");
			});
		});

		describe("Missing information", function() {
			it("Returns nothing if has no values", function() {
				var command = {
					data: this.data,
					handlers: {
						organisation: function(value) {},
						title: function(value) { return ""; },
						date: function(value) { return null; }
					}
				};

				expect(arrayHandlerFunction(command, false)).toBe("");
			});

			it("Returns nothing if has no values with top", function() {
				var command = {
					data: this.data,
					handlers: {
						organisation: function(value) {},
						title: function(value) { return ""; },
						date: function(value) { return null; }
					}
				};

				expect(arrayHandlerFunction(command, true)).toBe("");
			});

			it("Handles missing organisation", function() {
				var command = {
					data: this.data,
					handlers: {
						organisation: function(value) { return undefined; },
						title: function(value) { return value.title; },
						date: function(value) { return value.date; }
					}
				};

				expect(arrayHandlerFunction(command, false)).toBe("\nTitle 1    Date 1\nTitle 2    Date 2");
			});

			it("Handles missing title", function() {
				var command = {
					data: this.data,
					handlers: {
						organisation: function(value) { return value.organisation},
						title: function(value) { return undefined; },
						date: function(value) { return value.date; }
					}
				};

				expect(arrayHandlerFunction(command, false)).toBe("\nOrganisation 1    Date 1\nOrganisation 2    Date 2");
			});

			it("Handles missing date", function() {
				var command = {
					data: this.data,
					handlers: {
						organisation: function(value) { return value.organisation},
						title: function(value) { return value.title; },
						date: function(value) { return undefined; }
					}
				};

				expect(arrayHandlerFunction(command, false)).toBe("\nOrganisation 1    Title 1\nOrganisation 2    Title 2");
			});
		});
	});

	
	describe("Date formatting", function() {
		it("To and from dates", function() {
			expect(getDate("19/10/2014", "20/02/2016")).toBe("19/10/2014 - 20/02/2016");
		});

		it("To present date", function() {
			expect(getDate("19/10/2014")).toBe("19/10/2014 - Present");
		});

		it("Has no date", function() {
			expect(getDate()).toBe("");
		});
	});

	describe("Degree name formatting", function() {
		it("Formats full degree name", function() {
			expect(getFullDegree("Bachelor", "Engineering")).toBe("Bachelor of Engineering");
		});

		it("Formats degree without type", function() {
			expect(getFullDegree("Engineering")).toBe("Engineering");
		});

		it("Has no variables", function() {
			expect(getFullDegree()).toBe("");
		});
	});

	describe("Social Network URL builder", function() {
		it("Twitter", function() {
			expect(buildUrl("TWITTER", "test")).toBe("https://www.twitter.com/test");
		});

		it("Facebook", function() {
			expect(buildUrl("Facebook", "test")).toBe("https://www.facebook.com/test");
		});

		it("Github", function() {
			expect(buildUrl("github", "test")).toBe("https://www.github.com/test");
		});

		it("LinkedIn", function() {
			expect(buildUrl("linkedin", "test")).toBe("https://www.linkedin.com/in/test");
		});

		it("Reddit", function() {
			expect(buildUrl("reddit", "test")).toBe("https://www.reddit.com/user/test");
		});

		it("Hacker News", function() {
			expect(buildUrl("hackernews", "test")).toBe("https://news.ycombinator.com/user?id=test");
		});

		it("MySpace", function() {
			expect(buildUrl("myspace", "test")).toBe("");
		});

		it("Empty string", function() {
			expect(buildUrl("", "test")).toBe("");
		});

		it("No username", function() {
			expect(buildUrl("Twitter", "")).toBe("");
		});

		it("Null social media", function() {
			expect(buildUrl(null, "test")).toBe("");
		});

		it("Null username", function() {
			expect(buildUrl("twitter", null)).toBe("");
		});

		it("Undefined social media", function() {
			expect(buildUrl(undefined, "test")).toBe("");
		});

		it("Undefined username", function() {
			expect(buildUrl("twitter", undefined)).toBe("");
		});
	});

	describe("buildSocialNetworkAddress", function() {
		it("handles email", function() {
			spyOn(window, "buildEmail");
			buildSocialNetworkAddress("email", "url", "username");

			expect(window.buildEmail).toHaveBeenCalled();
			expect(window.buildEmail).toHaveBeenCalledWith("url", "username");
		});

		it("handles just url", function() {
			var result = buildSocialNetworkAddress("email", "url", "username");
			expect(result).toBe("url");
		});

		it("handles just username", function() {
			spyOn(window, "buildUrl").and.returnValue("url");
			var result = buildSocialNetworkAddress("", "", "username");
			expect(result).toBe("url");
		});

		it("handles just username without valid social network", function() {
			spyOn(window, "buildUrl").and.returnValue("");
			var result = buildSocialNetworkAddress("", "", "username");
			expect(result).toBe(false);
		});

		it("handles without any values", function() {
			var result = buildSocialNetworkAddress("", "", "");
			expect(result).toBe(false);
		});
	});

	describe("upperCaseFirstLetter", function() {
		it("handles single character", function() {
			expect("a".upperCaseFirstLetter()).toBe("A");
		});

		it("handles single character uppercase", function() {
			expect("A".upperCaseFirstLetter()).toBe("A");
		});

		it("handles empty string", function() {
			expect("".upperCaseFirstLetter()).toBe("");
		});

		it("handles multi character string", function() {
			expect("hello".upperCaseFirstLetter()).toBe("Hello");
		});

		it("handles multi character string (first uppercase)", function() {
			expect("HELLO".upperCaseFirstLetter()).toBe("HELLO");
		});
	});

	describe("buildSocialNetwork", function() {
		it("handles no network", function() {
			var value = {
				url: "url"
			};
			expect(buildSocialNetwork(value)).toBe("url");
		});

		it("handles no network no url", function() {
			expect(buildSocialNetwork({})).toBe(false);
		});

		it("handles having an address", function() {
			spyOn(window, "buildSocialNetworkAddress").and.returnValue("url");
			var value = {
				network: "network"
			};
			expect(buildSocialNetwork(value)).toBe("Network - url");
		});

		it("handles not having an address", function() {
			spyOn(window, "buildSocialNetworkAddress").and.returnValue("");
			var value = {
				network: "network"
			};
			expect(buildSocialNetwork(value)).toBe(false);
		});
	});

	describe("parseEmail", function() {
		it("handles empty email", function() {
			expect(parseEmail("")).toBe("");
		});

		it("handles email", function() {
			expect(parseEmail("person@example.com")).toBe("person@example.com");
		});

		it("handles email with mailto", function() {
			expect(parseEmail("mailto:person@example.com")).toBe("person@example.com");
		});
	});

	describe("buildEmail", function() {
		it("handles email", function() {
			spyOn(window, "parseEmail").and.returnValue("person@example.com");

			var result = buildEmail("person@example.com", "");
			expect(result).toBe("person@example.com");
		});

		it("handles email as username", function() {
			spyOn(window, "parseEmail").and.returnValue("person@example.com");

			var result = buildEmail("", "person@example.com");
			expect(result).toBe("person@example.com");
		});

		it("handles no email or username", function() {
			var result = buildEmail("", "");
			expect(result).toBe(false);
		});
	});

	describe("isValidCommandType", function() {
		it("handles not being a command", function() {
			expect(isValidCommandType("")).toBe(false);
		});

		it("handles not being a valid command", function() {
			expect(isValidCommandType("notACommand")).toBe(false);
		});

		it("handles being a valid command", function() {
			expect(isValidCommandType("basic")).toBe(true);
		});
	});

	describe("isValidCommand", function() {
		beforeEach(function() {
			spyOn(console, 'error');
		});

		describe("name", function() {
			it("handles no command name", function() {
				expect(isValidCommand({})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("Command must have a name");
			});

			it("handles null command name", function() {
				expect(isValidCommand({name: null})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("Command must have a name");
			});

			it("handles undefined command name", function() {
				expect(isValidCommand({name: undefined})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("Command must have a name");
			});

			it("handles empty command name", function() {
				expect(isValidCommand({name: ""})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("Command must have a name");
			});
		});

		describe("describe", function() {
			it("handles no command name", function() {
				expect(isValidCommand({name: "command"})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'command' does not have a 'description'");
			});

			it("handles null command name", function() {
				expect(isValidCommand({name: "command", description: null})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'command' does not have a 'description'");
			});

			it("handles undefined command name", function() {
				expect(isValidCommand({name: "command", description: undefined})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'command' does not have a 'description'");
			});

			it("handles empty command name", function() {
				expect(isValidCommand({name: "command", description: ""})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'command' does not have a 'description'");
			});
		});

		describe("type", function() {
			it("handles no command type", function() {
				expect(isValidCommand({name: 'command', description: "description"})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'command' does not have a valid type [basic, system, array, calculated]");
			});

			it("handles invalid command type", function() {
				expect(isValidCommand({name: 'command', description: "description", type: 'notACommand'})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'command' does not have a valid type [basic, system, array, calculated]");
			});

			it("handles empty command type", function() {
				expect(isValidCommand({name: 'command', description: "description", type: ''})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'command' does not have a valid type [basic, system, array, calculated]");
			});

			it("handles empty command type", function() {
				expect(isValidCommand({name: 'command', description: "description", type: null})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'command' does not have a valid type [basic, system, array, calculated]");
			});

			it("handles empty command type", function() {
				expect(isValidCommand({name: 'command', description: "description", type: undefined})).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'command' does not have a valid type [basic, system, array, calculated]");
			});
		});

		describe("ARRAY type", function() {
			it("handles no data", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "array"
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'array' command type requires 'data'");
			});

			it("handles empty data", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "array",
					data: ""
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'array' command type requires 'data'");
			});

			it("handles null data", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "array",
					data: null
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'array' command type requires 'data'");
			});

			it("handles undefined data", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "array",
					data: undefined
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'array' command type requires 'data'");
			});

			it("handles no handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "array",
					data: "something"
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'array' command type requires 'handlers'");
			});

			it("handles null handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "array",
					data: ["something"],
					handlers: null
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'array' command type requires 'handlers'");
			});

			it("handles undefined handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "array",
					data: ["something", "else"],
					handlers: undefined
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'array' command type requires 'handlers'");
			});

			it("handles handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "array",
					data: ["something", "else"],
					handlers: function() {}
				};

				expect(isValidCommand(command)).toBe(true);

				expect(console.error).not.toHaveBeenCalled();
			});
		});

		describe("SYSTEM type", function() {
			it("handles no handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "system"
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'system' command type requires 'handler'");
			});

			it("handles null handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "system",
					handler: null
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'system' command type requires 'handler'");
			});

			it("handles undefined handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "system",
					data: ["something", "else"],
					handler: undefined
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'system' command type requires 'handler'");
			});

			it("handles handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "system",
					data: ["something", "else"],
					handler: function() {}
				};

				expect(isValidCommand(command)).toBe(true);

				expect(console.error).not.toHaveBeenCalled();
			});
		});

		describe("CALCULATED type", function() {
			it("handles no handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "calculated"
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'calculated' command type requires 'handler'");
			});

			it("handles null handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "calculated",
					handler: null
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'calculated' command type requires 'handler'");
			});

			it("handles undefined handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "calculated",
					handler: undefined
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'calculated' command type requires 'handler'");
			});

			it("handles handler", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "calculated",
					handler: function(data) {}
				};

				expect(isValidCommand(command)).toBe(true);

				expect(console.error).not.toHaveBeenCalled();
			});
		});

		describe("BASIC type", function() {
			it("handles no data", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "basic"
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'basic' command type requires 'data'");
			});

			it("handles empty data", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "basic",
					data: ""
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'basic' command type requires 'data'");
			});

			it("handles null data", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "basic",
					data: null
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'basic' command type requires 'data'");
			});

			it("handles undefined data", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "basic",
					data: undefined
				};

				expect(isValidCommand(command)).toBe(false);

				expect(console.error).toHaveBeenCalled();
				expect(console.error).toHaveBeenCalledWith("'basic' command type requires 'data'");
			});

			it("handles successful", function() {
				var command = {
					name: 'command',
					description: "description",
					type: "basic",
					data: ["key"]
				};

				expect(isValidCommand(command)).toBe(true);
				expect(console.error).not.toHaveBeenCalled();
			});
		});
	});
});
