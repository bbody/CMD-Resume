describe("Basics", function() {
	beforeEach(function() {
		var div = $("<div id='cmd-resume'></div>");
		$("body").append(div);
		jasmine.Ajax.install();
	});

	afterEach(function() {
		$("#cmd-resume").remove();
		jasmine.Ajax.uninstall();
	});

	describe("Name Command", function() {
		describe("Featuring name", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("justName.json");
			});

			it("Includes the name", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("justName"))
				});

				enterCommand("name");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Name");
				expect(output.value).toEqual("Richard Hendriks");
			});

			it("Ignores -top", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("justName"))
				});

				enterCommand("name -top");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Name");
				expect(output.value).toEqual("Richard Hendriks");
			});
		});

		describe("Without name", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
			});

			it("Returns command error", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("name");

				var output = failedCommandOutput();

				expect(output.command).toEqual("name");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("Empty name", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
				jasmine.Ajax.requests.mostRecent().respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});
			});

			it("Returns command error", function() {

				enterCommand("name");

				var output = failedCommandOutput();

				expect(output.command).toEqual("name");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});
	});

	describe("Help", function() {
		describe("Full command set", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("details-without-github"))
				});
			});
			it("List of commands", function() {
				enterCommand("help");
				var output = helpOutput();
				expect(output.command).toEqual("Available Commands:");
				expect(output.values.length).toEqual(19);
			});
		});

		describe("Reduced command set", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();
				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("details-without-volunteering"))
				});
			});

			it("List of commands", function() {
				enterCommand("help");
				var output = helpOutput();
				expect(output.command).toEqual("Available Commands:");
				expect(output.values.length).toEqual(18);
			});

			it("Ignores top", function() {
				enterCommand("help -top");
				var output = helpOutput();
				expect(output.command).toEqual("Available Commands:");
				expect(output.values.length).toEqual(18);
			});
		});

		describe("Base commands", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});
			});

			it("List of commands", function() {
				enterCommand("help");

				var output = helpOutput();

				expect(output.command).toEqual("Available Commands:");
				expect(output.values.length).toEqual(4);
				expect(output.values[0]).toEqual("clear - clear command history from screen");
				expect(output.values[1]).toEqual("man - describes what each command does");
				expect(output.values[2]).toEqual("help - lists help for all the commands");
				expect(output.values[3]).toEqual("splash - print the welcome screen");
			});
		});
	});

	describe("About", function() {
		describe("Featuring about", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("about.json");
			});

			it("Includes about", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("about"))
				});

				enterCommand("about");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("About");
				expect(output.value).toEqual("Some blurb");
			});
		});

		describe("Without about", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
			});

			it("Returns command error", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("about");

				var output = failedCommandOutput();

				expect(output.command).toEqual("about");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("Empty about", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
				jasmine.Ajax.requests.mostRecent().respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});
			});

			it("Returns command error", function() {

				enterCommand("about");

				var output = failedCommandOutput();

				expect(output.command).toEqual("about");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});
	});

	describe("Location", function() {
		describe("Featuring location", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("about.json");
			});

			it("Includes location", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("fullExample"))
				});

				enterCommand("location");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Location");
				expect(output.value).toEqual("San Francisco, California, US");
			});

			it("Ignores top", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("fullExample"))
				});

				enterCommand("location -top");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Location");
				expect(output.value).toEqual("San Francisco, California, US");
			});

			it("Only has city", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify({basics: {location: {city: "San Francisco"}}})
				});

				enterCommand("location");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Location");
				expect(output.value).toEqual("San Francisco");
			});

			it("Only has state/province/region", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify({basics: {location: {region: "California"}}})
				});

				enterCommand("location");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Location");
				expect(output.value).toEqual("California");
			});

			it("Only has country", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify({basics: {location: {countryCode: "US"}}})
				});

				enterCommand("location");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Location");
				expect(output.value).toEqual("US");
			});

			it("Only city and country", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify({basics: {location: {city: "San Francisco", countryCode: "US"}}})
				});

				enterCommand("location");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Location");
				expect(output.value).toEqual("San Francisco, US");
			});

			it("Only state/province/region and country", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify({basics: {location: {region: "California", countryCode: "US"}}})
				});

				enterCommand("location");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Location");
				expect(output.value).toEqual("California, US");
			});

			it("Only city and state/province/region", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify({basics: {location: {region: "California", city: "San Francisco"}}})
				});

				enterCommand("location");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Location");
				expect(output.value).toEqual("San Francisco, California");
			});
		});

		describe("Without content", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
			});

			it("Returns command error", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("location");

				var output = failedCommandOutput();

				expect(output.command).toEqual("location");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("Empty string", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
				jasmine.Ajax.requests.mostRecent().respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});
			});

			it("Returns command error", function() {

				enterCommand("location");

				var output = failedCommandOutput();

				expect(output.command).toEqual("location");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});
	});

	describe("Looking For Command", function() {
		describe("Featuring label", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("justName.json");
			});

			it("Includes the name", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("details"))
				});

				enterCommand("label");

				var output = getSimpleOutput();
				expect(output.summary).toEqual("Label");
				expect(output.value).toEqual("Programmer");
			});
		});

		describe("Without label", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
			});

			it("Returns command error", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("label");

				var output = failedCommandOutput();

				expect(output.command).toEqual("label");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("Empty label", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
				jasmine.Ajax.requests.mostRecent().respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});
			});

			it("Returns command error", function() {

				enterCommand("label");

				var output = failedCommandOutput();

				expect(output.command).toEqual("label");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});
	});
});
