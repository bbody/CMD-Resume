describe("Education", function(){
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
		describe("Without education", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noEducation.json", {});
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				var splash = getSimpleSplash();
				expect(splash).toEqual("Welcome to my résumé.");

				enterCommand("education");

				var output = failedCommandOutput();

				expect(output.command).toEqual("education");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("No education", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json", {});
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("education");

				var output = failedCommandOutput();

				expect(output.command).toEqual("education");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});
	});

	describe("all", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("details.json", {});
		});

		it("should only show all entries", function(){
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("education"))
			});

			enterCommand("education");

			var output = fullCommandOutput();

			expect(output.command).toEqual("Education");
			expect(output.values.length).toEqual(5);
			expect(output.values[0]).toEqual("University of Oklahoma    PhD of Computer Science    2013-12-01 - 2014-12-01");
			expect(output.values[1]).toEqual("University of Virginia    Master of Something Else    2013-12-01 - 2014-12-01");
			expect(output.values[2]).toEqual("University of California    Master of Computer Science    2013-12-01 - 2014-12-01");
			expect(output.values[3]).toEqual("University of Queensland    Bachelor of Something Else    2013-12-01 - 2014-12-01");
			expect(output.values[4]).toEqual("University of Oklahoma    Bachelor of Information Technology    2013-12-01 - 2014-12-01");
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

			enterCommand("education -top");

			var output = topCommandOutput();

			expect(output).toEqual("University of Oklahoma    Bachelor of Information Technology    2011-06-01 - 2014-01-01");
		});
	});

	describe("missing parts", function(){
		beforeEach(function() {
			$("#cmd-resume").CMDResume("education.json", {});
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("educationMissing"))
			});
			enterCommand("education");
		});
		it("Missing end date", function(){
			var output = fullCommandOutput();
			expect(output.values[0]).toEqual("University of Oklahoma    Bachelor of Information Technology    2011-06-01 - Present");
		});
		it("Missing start date", function(){
			var output = fullCommandOutput();
			expect(output.values[1]).toEqual("University of Oklahoma    Bachelor of Information Technology    Until 2014-01-01");
		});
		it("Missing both dates", function(){
			var output = fullCommandOutput();
			expect(output.values[2]).toEqual("University of Oklahoma    Bachelor of Information Technology");
		});
		it("Missing area", function(){
			var output = fullCommandOutput();
			expect(output.values[3]).toEqual("University of Oklahoma    Bachelor    2011-06-01 - 2014-01-01");
		});
		it("Missing company", function(){
			var output = fullCommandOutput();
			expect(output.values[4]).toEqual("Bachelor of Information Technology    2011-06-01 - 2014-01-01");
		});
		it("Missing level", function(){
			var output = fullCommandOutput();
			expect(output.values[5]).toEqual("University of Oklahoma    Information Technology    2011-06-01 - 2014-01-01");
		});
	});
});