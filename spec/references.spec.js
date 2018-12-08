describe("References", function(){
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
		describe("Without references", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noVolunteer.json");
			});

			it("Includes the basic splash", function() {
				jasmine.Ajax.requests.mostRecent().respondWith(successResponse("emptyStrings"));

				enterCommand("references");

				var output = failedCommandOutput();

				expect(output.command).toEqual("references");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("No references", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
			});

			it("Includes the basic splash", function() {
				jasmine.Ajax.requests.mostRecent().respondWith(successResponse("empty"));

				enterCommand("references");

				var output = failedCommandOutput();

				expect(output.command).toEqual("references");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});
	});

	describe("all", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json");
		});

		it("should only show one entry", function(){
			jasmine.Ajax.requests.mostRecent().respondWith(successResponse("references"));

			enterCommand("references");

			var output = references.fullCommandOutput();

			expect(output.command).toEqual("References");
			expect(output.values.length).toEqual(2);
			expect(output.values[0]).toEqual("Name 1    Reference 1");
			expect(output.values[1]).toEqual("Name 2    Reference 2");
		});
	});

	describe("top", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json");
		});

		it("should only show one entry", function(){
			jasmine.Ajax.requests.mostRecent().respondWith(successResponse("details"));

			enterCommand("references -top");

			var output = references.topCommandOutput();

			expect(output).toEqual("Erlich Bachman    It is my pleasure to recommend Richard, his performance working as a consultant for Main St. Company proved that he will be a valuable addition to any company.")
		});
	});

	describe("missing parts", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("references.json");
			jasmine.Ajax.requests.mostRecent().respondWith(successResponse("referencesMissing"));
			enterCommand("references");
		});
		it("Missing name", function(){
			var output = references.fullCommandOutput();
			expect(output.values[0]).toEqual("Reference 1");
		});
		it("Missing reference", function(){
			var output = references.fullCommandOutput();
			expect(output.values[1]).toEqual("Name 2");
		});
	});
});