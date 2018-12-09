describe("Awards", function(){
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

				enterCommand("awards");

				var output = failedCommandOutput();

				expect(output.command).toEqual("awards");
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

				enterCommand("awards");

				var output = failedCommandOutput();

				expect(output.command).toEqual("awards");
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
				responseText: JSON.stringify(loadJSON("awards"))
			});

			enterCommand("awards");

			var output = fullCommandOutput();

			expect(output.command).toEqual("Awards");
			expect(output.values.length).toEqual(3);
			expect(output.values[0]).toEqual("Awarder 1    Title 1    Date 1");
			expect(output.values[1]).toEqual("Awarder 2    Title 2    Date 2");
			expect(output.values[2]).toEqual("Awarder 3    Title 3    Date 3");

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

			enterCommand("awards -top");

			var output = topCommandOutput();

			expect(output).toEqual("Techcrunch    Digital Compression Pioneer Award    2014-11-01");
		});
	});

	describe("missing parts", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("volunteer.json");
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("awardsMissing"))
			});
			enterCommand("awards");
		});
		it("Missing title", function(){
			var output = fullCommandOutput();
			expect(output.values[0]).toEqual("Awarder 1    Date 1");
		});
		it("Missing date", function(){
			var output = fullCommandOutput();
			expect(output.values[1]).toEqual("Awarder 2    Title 2");
		});
		it("Missing awarder", function(){
			var output = fullCommandOutput();
			expect(output.values[2]).toEqual("Title 3    Date 3");
		});
	});
});