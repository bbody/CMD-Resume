describe("Splash screen", function() {
	beforeEach(function() {
		var div = $("<div id='cmd-resume'></div>");
		$("body").append(div);
		jasmine.Ajax.install();
	});

	afterEach(function() {
		$("#cmd-resume").remove();
		jasmine.Ajax.uninstall();
	});
	
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

	describe("Custom splash", function() {
		describe("Single line", function() {
			beforeEach(function() {
				jasmine.Ajax.stubRequest('emptyStrings.json').andReturn({
					status: 200,
				    responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				jasmine.Ajax.stubRequest('customSplash.json').andReturn({
					status: 200,
				    responseText: JSON.stringify(loadJSON("extraDetails/customSplash"))
				});

				$("#cmd-resume").CMDResume("emptyStrings.json", {extraDetails: "customSplash.json"});
			});

			it("Includes the basic splash", function() {
				var splash = getSimpleSplash();
				expect(splash).toEqual("Custom splash");
			});
		});

		describe("Multiple lines", function() {
			beforeEach(function() {
				jasmine.Ajax.stubRequest('emptyStrings.json').andReturn({
					status: 200,
				    responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				jasmine.Ajax.stubRequest('customSplash.json').andReturn({
					status: 200,
				    responseText: JSON.stringify(loadJSON("extraDetails/largeCustomSplash"))
				});

				$("#cmd-resume").CMDResume("emptyStrings.json", {extraDetails: "customSplash.json"});
			});

			it("Includes the basic splash", function() {
				var splash = getMultilineSplash();
				expect(splash[0]).toEqual("Custom");
				expect(splash[1]).toEqual("splash");
			});
		});
	});

	describe("Splash Command", function() {
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

				enterCommand("splash");

				var lines = $(".terminal-output > div");
				var output = $(lines[lines.length - 1]).find("div span");

				expect($(output[0]).html().decodeSpace()).toEqual("Welcome to ");
				expect($(output[1]).html().decodeSpace()).toEqual("Richard Hendriks");
				expect($(output[2]).html().decodeSpace()).toEqual("'s résumé.");

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

				enterCommand("splash");

				var lines = $(".terminal-output > div");
				var output = $(lines[lines.length - 1]).find("div span");

				expect($(output[0]).html().decodeSpace()).toEqual("Welcome to my résumé.");
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

				enterCommand("splash");

				var lines = $(".terminal-output > div");
				var output = $(lines[lines.length - 1]).find("div span");

				expect($(output[0]).html().decodeSpace()).toEqual("Welcome to my résumé.");
			});
		});

		describe("Custom splash", function() {
			beforeEach(function() {
				jasmine.Ajax.stubRequest('emptyStrings.json').andReturn({
					status: 200,
				    responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				jasmine.Ajax.stubRequest('customSplash.json').andReturn({
					status: 200,
				    responseText: JSON.stringify(loadJSON("extraDetails/customSplash"))
				});

				$("#cmd-resume").CMDResume("emptyStrings.json", {extraDetails: "customSplash.json"});
			});

			it("Includes the basic splash", function() {

				enterCommand("splash");

				var lines = $(".terminal-output > div");
				var output = $(lines[lines.length - 1]).find("div span");

				expect($(output[0]).html().decodeSpace()).toEqual("Custom splash");
			});
		});
	});
});
