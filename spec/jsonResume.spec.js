describe("Basics", function() {
	beforeEach(function() {
		var div = $("<div id='cmd-resume'></div>");
		$("body").append(div);
		jasmine.Ajax.install();
	});

	afterEach(function() {
		$("#cmd-resume").remove();
		jasmine.Ajax.uninstall();
	});

	it("adds json to URL", function() {
		$("#cmd-resume").CMDResume("http://registry.jsonresume.org/test");

		var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

		expect(mostRecentRequest.url).toBe("http://registry.jsonresume.org/test.json");
	});

	it("calls full url", function() {
		$("#cmd-resume").CMDResume("http://registry.jsonresume.org/test.json");

		var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

		expect(mostRecentRequest.url).toBe("http://registry.jsonresume.org/test.json");
	});




	// describe("Name Command", function() {
	// 	describe("Featuring name", function() {
	// 		beforeEach(function() {
	// 			$("#cmd-resume").CMDResume("justName.json");
	// 		});

	// 		it("Includes the name", function() {
	// 			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

	// 			mostRecentRequest.respondWith({
	// 				status: 200,
	// 				responseText: JSON.stringify(loadJSON("justName"))
	// 			});

	// 			enterCommand("name");

	// 			var output = getSimpleOutput();
	// 			expect(output.summary).toEqual("Name");
	// 			expect(output.value).toEqual("Richard Hendriks");
	// 		});

	// 		it("Ignores -top", function() {
	// 			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

	// 			mostRecentRequest.respondWith({
	// 				status: 200,
	// 				responseText: JSON.stringify(loadJSON("justName"))
	// 			});

	// 			enterCommand("name -top");

	// 			var output = getSimpleOutput();
	// 			expect(output.summary).toEqual("Name");
	// 			expect(output.value).toEqual("Richard Hendriks");
	// 		});
	// 	});

	// 	describe("Without name", function() {
	// 		beforeEach(function() {
	// 			$("#cmd-resume").CMDResume("noName.json");
	// 		});

	// 		it("Returns command error", function() {
	// 			var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

	// 			mostRecentRequest.respondWith({
	// 				status: 200,
	// 				responseText: JSON.stringify(loadJSON("empty"))
	// 			});

	// 			enterCommand("name");

	// 			var output = failedCommandOutput();

	// 			expect(output.command).toEqual("name");
	// 			expect(output.message).toEqual(" is an unknown command.");
	// 		});
	// 	});

	// 	describe("Empty name", function() {
	// 		beforeEach(function() {
	// 			$("#cmd-resume").CMDResume("noName.json");
	// 			jasmine.Ajax.requests.mostRecent().respondWith({
	// 				status: 200,
	// 				responseText: JSON.stringify(loadJSON("emptyStrings"))
	// 			});
	// 		});

	// 		it("Returns command error", function() {

	// 			enterCommand("name");

	// 			var output = failedCommandOutput();

	// 			expect(output.command).toEqual("name");
	// 			expect(output.message).toEqual(" is an unknown command.");
	// 		});
	// 	});
	// });
});