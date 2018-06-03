describe("Interests", function(){
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
		describe("Without interests", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noVolunteer.json", {});
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				enterCommand("interests");

				var output = failedCommandOutput();

				expect(output.command).toEqual("interests");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("No interests", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json", {});
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("interests");

				var output = failedCommandOutput();

				expect(output.command).toEqual("interests");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});
	});

	describe("all", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json", {});
		});

		it("should only show one entry", function(){
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("interests"))
			});

			enterCommand("interests");

			var output = interests.fullCommandOutput();

			expect(output.command).toEqual("Interests");
			expect(output.values.length).toEqual(2);
			expect(output.values[0]).toEqual("Name 1    Internet 1, Internet 2");
			expect(output.values[1]).toEqual("Name 2    Internet 3, Internet 4");

		});
	});

	describe("top", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json", {});
		});

		it("should only show one entry", function(){
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("interests -top");

			var output = interests.topCommandOutput();

			expect(output).toEqual("Wildlife    Ferrets, Unicorns");
		});
	});

	describe("missing parts", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("interests.json", {});
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("interestsMissing"))
			});
			enterCommand("interests");
		});
		it("Missing name", function(){
			var output = interests.fullCommandOutput();
			expect(output.values[0]).toEqual("Internet 1, Internet 2");
		});
		it("Missing list", function(){
			var output = interests.fullCommandOutput();
			expect(output.values[1]).toEqual("Name 2");
		});
	});
});