describe("Volunteer", function() {
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
		describe("Without volunteer", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noVolunteer.json");
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				var splash = getSimpleSplash();
				expect(splash).toEqual("Welcome to my résumé.");

				enterCommand("volunteering");

				var output = failedCommandOutput();

				expect(output.command).toEqual("volunteering");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("No volunteer", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("volunteering");

				var output = failedCommandOutput();

				expect(output.command).toEqual("volunteering");
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
				responseText: JSON.stringify(loadJSON("volunteer"))
			});

			enterCommand("volunteering");

			var output = fullCommandOutput();

			expect(output.command).toEqual("Volunteering");
			expect(output.values.length).toEqual(3);
			expect(output.values[0]).toEqual("CoderDojo    Teacher    2012-01-01 - 2013-01-01");
			expect(output.values[1]).toEqual("CoderDojo    Teacher    2012-01-01 - 2013-01-01");
			expect(output.values[2]).toEqual("CoderDojo    Teacher    2012-01-01 - 2013-01-01");

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

			enterCommand("volunteering -top");

			var output = topCommandOutput();

			expect(output).toEqual("CoderDojo    Teacher    2012-01-01 - 2013-01-01");
		});
	});

	describe("missing parts", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("volunteer.json");
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("volunteerMissing"))
			});
			enterCommand("volunteering");
		});
		it("Missing end date", function() {
			var output = fullCommandOutput();
			expect(output.values[0]).toEqual("CoderDojo    Teacher    2012-01-01 - Present");
		});
		it("Missing start date", function() {
			var output = fullCommandOutput();
			expect(output.values[1]).toEqual("CoderDojo    Teacher    Until 2013-01-01");
		});
		it("Missing both dates", function() {
			var output = fullCommandOutput();
			expect(output.values[2]).toEqual("CoderDojo    Teacher");
		});
		it("Missing title", function() {
			var output = fullCommandOutput();
			expect(output.values[3]).toEqual("CoderDojo    2012-01-01 - 2013-01-01");
		});
		it("Missing company", function() {
			var output = fullCommandOutput();
			expect(output.values[4]).toEqual("Teacher    2012-01-01 - 2013-01-01");
		});
	});
});
