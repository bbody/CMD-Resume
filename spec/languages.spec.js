describe("Languages", function() {
	beforeEach(function() {
		var div = $("<div id='cmd-resume'></div>");
		$("body").append(div);
		jasmine.Ajax.install();
	});

	afterEach(function() {
		$("#cmd-resume").remove();
		jasmine.Ajax.uninstall();
	});
	describe("empty", function() {
		describe("Without languages", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noVolunteer.json");
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				enterCommand("languages");

				var output = failedCommandOutput();

				expect(output.command).toEqual("languages");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("No languages", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("languages");

				var output = failedCommandOutput();

				expect(output.command).toEqual("languages");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});
	});

	describe("all", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json");
		});

		it("should only show one entry", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("languages"))
			});

			enterCommand("languages");

			var output = fullCommandOutput();

			expect(output.command).toEqual("Languages");
			expect(output.values.length).toEqual(2);
			expect(output.values[0]).toEqual("Language 1    Fluency 1");
			expect(output.values[1]).toEqual("Language 2    Fluency 2");

		});
	});

	describe("top", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json");
		});

		it("should only show one entry", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("details"))
			});

			enterCommand("languages -top");

			var output = topCommandOutput();

			expect(output).toEqual("English    Native speaker");
		});
	});

	describe("missing parts", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("languages.json");
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("languagesMissing"))
			});
			enterCommand("languages");
		});
		it("Missing language", function() {
			var output = fullCommandOutput();
			expect(output.values[0]).toEqual("Fluency 1");
		});
		it("Missing fluency", function() {
			var output = fullCommandOutput();
			expect(output.values[1]).toEqual("Language 2");
		});
	});
});
