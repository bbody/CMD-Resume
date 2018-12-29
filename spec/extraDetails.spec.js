describe("Extra details", function() {
	beforeEach(function() {
		var div = $("<div id='cmd-resume'></div>");
		$("body").append(div);
		jasmine.Ajax.install();
	});

	afterEach(function() {
		$("#cmd-resume").remove();
		jasmine.Ajax.uninstall();
	});

	describe("PGP", function() {
		beforeEach(function() {
			jasmine.Ajax.stubRequest("emptyStrings.json").andReturn(successResponse("emptyStrings"));
			jasmine.Ajax.stubRequest("pgp.json").andReturn(successResponse("extraDetails/pgp"));

			$("#cmd-resume").CMDResume("emptyStrings.json", {extraDetails: "pgp.json"});
		});

		it("Includes the basic splash", function() {
			enterCommand("pgpkey");

			var output = fullCommandOutput();
			expect(output.command).toEqual("PGP Key");
			expect(output.values.length).toEqual(2);
			expect(output.values[0]).toEqual("PGP Line 1");
			expect(output.values[1]).toEqual("PGP Line 2");

		});
	});

	describe("Github User Override", function() {
		beforeEach(function() {
			jasmine.Ajax.stubRequest("details.json").andReturn(successResponse("emptyStrings"));
			jasmine.Ajax.stubRequest("github.json").andReturn(successResponse("extraDetails/github"));
			jasmine.Ajax.stubRequest("https://api.github.com/users/example/repos").andReturn(successResponse("github/override"));

			$("#cmd-resume").CMDResume("details.json", {extraDetails: "github.json"});
		});

		it("Has the repositories", function() {
			enterCommand("github");

			var output = github.fullCommandOutput();
			expect(output.command).toEqual("Github Repositories");
			expect(output.values.length).toEqual(2);
			expect(output.values[0]).toEqual("HelloWorld - Create hello world");
			expect(output.values[1]).toEqual("GoodbyeWorld");
		});
	});

	describe("Github Empty Response", function() {
		beforeEach(function() {
			jasmine.Ajax.stubRequest("details.json").andReturn(successResponse("emptyStrings"));
			jasmine.Ajax.stubRequest("github.json").andReturn(successResponse("extraDetails/github"));
			jasmine.Ajax.stubRequest("https://api.github.com/users/example/repos").andReturn({});

			$("#cmd-resume").CMDResume("details.json", {extraDetails: "github.json"});
		});

		it("Failed command", function() {
			enterCommand("github");

			var output = failedCommandOutput();

			expect(output.command).toEqual("github");
			expect(output.message).toEqual(" is an unknown command.");
		});
	});
});
