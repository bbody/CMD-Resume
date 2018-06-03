describe("Skills", function(){
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
		describe("Without skills", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noVolunteer.json", {});
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				enterCommand("skills");

				var output = failedCommandOutput();

				expect(output.command).toEqual("skills");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("No skills", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json", {});
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("skills");

				var output = failedCommandOutput();

				expect(output.command).toEqual("skills");
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
				responseText: JSON.stringify(loadJSON("skills"))
			});

			enterCommand("skills");

			var output = skills.fullCommandOutput();

			expect(output.command).toEqual("Skills");
			expect(output.values.length).toEqual(2);
			expect(output.values[0]).toEqual("Level 1 in Name 1");
			expect(output.values[1]).toEqual("Level 2 in Name 2");

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

			enterCommand("skills -top");

			var output = skills.topCommandOutput();

			expect(output).toEqual("Master in Web Development");
		});
	});

	describe("missing parts", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("skills.json", {});
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("skillsMissing"))
			});
			enterCommand("skills");
		});
		it("Missing name", function(){
			var output = skills.fullCommandOutput();
			expect(output.values[0]).toEqual("Level 1");
		});
		it("Missing list", function(){
			var output = skills.fullCommandOutput();
			expect(output.values[1]).toEqual("Name 2");
		});
	});
});