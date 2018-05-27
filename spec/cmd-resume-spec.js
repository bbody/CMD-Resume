describe("CMDResume Plugin", function() {
	beforeEach(function() {
		var div = $("<div id='cmd-resume'></div>");
		$("body").append(div);
		jasmine.Ajax.install();
	});

	afterEach(function() {
		$("#cmd-resume").remove();
		jasmine.Ajax.uninstall();
	});

	describe("Splash screen", function() {
		describe("Featuring name", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("justName.json", {});
			});

			it("Includes the name in splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("justName"))
				});

				var splash = getSplash();

				expect(splash.intro).toEqual("Welcome to ");
				expect(splash.name).toEqual("Richard Hendriks");
				expect(splash.end).toEqual("'s résumé.");
			});
		});

		describe("Without name", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json", {});
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				var splash = getSimpleSplash();
				expect(splash).toEqual("Welcome to my résumé.");
			});
		});

		describe("Empty name", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json", {});
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				var splash = getSimpleSplash();
				expect(splash).toEqual("Welcome to my résumé.");
			});
		});

		// describe("Custom splash", function() {
		// 	beforeEach(function() {
		// 		$("#cmd-resume").CMDResume("noName",
		// 			{extraDetails: "customSplash.json"});
		// 	});

		// 	it("Includes the basic splash", function() {
		// 		jasmine.Ajax.stubRequest("noName.json").andReturn({
		// 			status: 200,
		// 		    responseText: {basics: {name: "Someoneone"}}
		// 		});

		// 		jasmine.Ajax.stubRequest("customSplash.json").andReturn({
		// 			status: 200,
		// 		    responseText: loadJSON("customSplash")
		// 		});

		// 		jasmine.Ajax.stubRequest("noName").andReturn({
		// 			status: 200,
		// 			"responseText": JSON.stringify(loadJSON("noName"))
		// 		});

		// 		var splash = getSimpleSplash();
		// 		expect(splash).toEqual("Custom splash");
		// 	});
		// });
	});

	describe("Name", function() {
		describe("Featuring name", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("justName.json", {});
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
		});

		describe("Without name", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json", {});
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
				$("#cmd-resume").CMDResume("noName.json", {});
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

	describe("About", function() {
		describe("Featuring about", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("about.json", {});
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
				$("#cmd-resume").CMDResume("noName.json", {});
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
				$("#cmd-resume").CMDResume("noName.json", {});
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
				$("#cmd-resume").CMDResume("about.json", {});
			});

			it("Includes about", function() {
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
		});

		describe("Without content", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json", {});
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
				$("#cmd-resume").CMDResume("noName.json", {});
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
});
