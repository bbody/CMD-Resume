describe("Utilities", function() {
	beforeEach(function() {
		var div = $("<div id='cmd-resume'></div>");
		$("body").append(div);
		jasmine.Ajax.install();
	});

	afterEach(function() {
		$("#cmd-resume").remove();
		jasmine.Ajax.uninstall();
	});

	describe("Invalid commands", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json");
		});

		it("Empty message", function() {
			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

			mostRecentRequest.respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("");

			var output = getSingleOutput();
			expect(output).toEqual("No command entered.");
		});

		it("Spaces", function() {
			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

			mostRecentRequest.respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("                 ");

			var output = getSingleOutput();
			expect(output).toEqual("No command entered.");
		});

		it("Tab", function() {
			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

			mostRecentRequest.respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("                ");

			var output = getSingleOutput();
			expect(output).toEqual("No command entered.");
		});
	});

	describe("clear command", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("man.json");
		});

		it("Empty results", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("clear");
			expect(getClearOutput()).toEqual(0);
		});
	});

	describe("pdf command", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("man.json");
		});

		it("Empty results", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("pdf");

			var output = pdf.fullCommandOutput();

			expect(output.command).toEqual("Résumé PDF");
			expect(output.values[0]).toEqual("https://en.wikipedia.org/wiki/R%C3%A9sum%C3%A9");
		});
	});

	describe("man command", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("man.json");
		});

		it("Valid command", function() {
			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

			mostRecentRequest.respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("man man");

			var output = manCommandOutput();
			expect(output.command).toEqual("man");
			expect(output.message).toEqual(" - describes what each command does");
		});

		it("No command", function() {
			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

			mostRecentRequest.respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("man");

			var output = manCommandOutput();
			expect(output.command).toEqual("man:");
			expect(output.message).toEqual(" No command entered.");
		});

		it("Invalid command", function() {
			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

			mostRecentRequest.respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("man notacommand");

			var output = manFailedCommandOutput();
			expect(output.man).toEqual("man: ");
			expect(output.command).toEqual("notacommand");
			expect(output.message).toEqual(" is an unknown command.");
		});

		it("Data is empty", function() {
			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();
			var data = loadJSON("details");
			data['basics']['name'] = "";

			mostRecentRequest.respondWith({
				status: 200,
				responseText: JSON.stringify(data)
			});

			enterCommand("man name");

			var output = manFailedCommandOutput();
			expect(output.man).toEqual("man: ");
			expect(output.command).toEqual("name");
			expect(output.message).toEqual(" is an unknown command.");
		});

		it("Data is not provided", function() {
			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

			mostRecentRequest.respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("empty"))
			});

			enterCommand("man name");

			var output = manFailedCommandOutput();
			expect(output.man).toEqual("man: ");
			expect(output.command).toEqual("name");
			expect(output.message).toEqual(" is an unknown command.");
		});
	});

	
});
