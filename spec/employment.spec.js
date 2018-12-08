describe("Employment", function(){
	beforeEach(function() {
		var div = $("<div id='cmd-resume'></div>");
		$("body").append(div);
		jasmine.Ajax.install();
	});

	afterEach(function() {
		$("#cmd-resume").remove();
		jasmine.Ajax.uninstall();
	});
	
	describe("empty", function(){
		describe("Without employment", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noEmployment.json");
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				var splash = getSimpleSplash();
				expect(splash).toEqual("Welcome to my résumé.");

				enterCommand("employment");

				var output = failedCommandOutput();

				expect(output.command).toEqual("employment");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("No employment", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("employment");

				var output = failedCommandOutput();

				expect(output.command).toEqual("employment");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});
	});

	describe("all", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json");
		});

		it("should only show one entry", function(){
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("employment");

			var output = fullCommandOutput();

			expect(output.command).toEqual("Employment");
			expect(output.values.length).toEqual(5);
			expect(output.values[0]).toEqual("Pied Piper    CEO    2013-12-01 - 2014-12-01");
			expect(output.values[1]).toEqual("Pied Piper    CTO    2013-12-01 - 2014-12-01");
			expect(output.values[2]).toEqual("Pied Piper    Programmer    2013-12-01 - 2014-12-01");
			expect(output.values[3]).toEqual("Pied Piper    President    2013-12-01 - 2014-12-01");
			expect(output.values[4]).toEqual("Pied Piper    Entrepreneur    2013-12-01 - 2014-12-01");

		});
	});

	describe("top", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json");
		});

		it("should only show one entry", function(){
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("employment -top");

			var output = topCommandOutput();

			expect(output).toEqual("Pied Piper    CEO    2013-12-01 - 2014-12-01");
		});
	});

	describe("missing parts", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("employment.json");
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("employment"))
			});
			enterCommand("employment");
		});
		it("Missing end date", function(){
			var output = fullCommandOutput();
			expect(output.values[0]).toEqual("Pied Piper    CEO    2013-12-01 - Present");
		});
		it("Missing start date", function(){
			var output = fullCommandOutput();
			expect(output.values[1]).toEqual("Pied Piper    CTO    Until 2014-12-01");
		});
		it("Missing both dates", function(){
			var output = fullCommandOutput();
			expect(output.values[2]).toEqual("Pied Piper    Programmer");
		});
		it("Missing title", function(){
			var output = fullCommandOutput();
			expect(output.values[3]).toEqual("Pied Piper    2013-12-01 - 2014-12-01");
		});
		it("Missing company", function(){
			var output = fullCommandOutput();
			expect(output.values[4]).toEqual("Entrepreneur    2013-12-01 - 2014-12-01");
		});
	});
});
