describe("Publications", function() {
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
				jasmine.Ajax.requests.mostRecent().respondWith(successResponse("emptyStrings"));

				enterCommand("publications");

				var output = failedCommandOutput();

				expect(output.command).toEqual("publications");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("No volunteer", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith(successResponse("empty"));

				enterCommand("publications");

				var output = failedCommandOutput();

				expect(output.command).toEqual("publications");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});
	});

	describe("all", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json");
		});

		it("should only show one entry", function() {
			jasmine.Ajax.requests.mostRecent().respondWith(successResponse("publications"));

			enterCommand("publications");

			var output = fullCommandOutput();

			expect(output.command).toEqual("Publications");
			expect(output.values.length).toEqual(3);
			expect(output.values[0]).toEqual("Company 1    Name 1    Date 1");
			expect(output.values[1]).toEqual("Company 2    Name 2    Date 2");
			expect(output.values[2]).toEqual("Company 3    Name 3    Date 3");

		});
	});

	describe("top", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json");
		});

		it("should only show one entry", function() {
			jasmine.Ajax.requests.mostRecent().respondWith(successResponse("details"));

			enterCommand("publications -top");

			var output = topCommandOutput();

			expect(output).toEqual("Hooli    Video compression for 3d media    2014-10-01");
		});
	});

	describe("missing parts", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("volunteer.json");
			jasmine.Ajax.requests.mostRecent().respondWith(successResponse("publicationsMissing"));
			enterCommand("publications");
		});
		it("Missing name", function() {
			var output = fullCommandOutput();
			expect(output.values[0]).toEqual("Hooli    2014-10-01");
		});
		it("Missing publisher", function() {
			var output = fullCommandOutput();
			expect(output.values[1]).toEqual("Video compression for 3d media    2014-10-01");
		});
		it("Missing date", function() {
			var output = fullCommandOutput();
			expect(output.values[2]).toEqual("Hooli    Video compression for 3d media");
		});
	});
});
