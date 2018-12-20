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

		mostRecentRequest.respondWith({
			status: 200,
			responseText: JSON.stringify(loadJSON("details-without-resume-link"))
		});

		expect(mostRecentRequest.url).toBe("http://registry.jsonresume.org/test.json");

		enterCommand("pdf");

		var output = pdf.fullCommandOutput();

		expect(output.command).toEqual("Résumé PDF");
		expect(output.values[0]).toEqual("http://registry.jsonresume.org/test.html");
	});

	it("calls full url", function() {
		$("#cmd-resume").CMDResume("http://registry.jsonresume.org/test.json");

		var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

		mostRecentRequest.respondWith({
			status: 200,
			responseText: JSON.stringify(loadJSON("details-without-resume-link"))
		});

		expect(mostRecentRequest.url).toBe("http://registry.jsonresume.org/test.json");

		enterCommand("pdf");

		var output = pdf.fullCommandOutput();

		expect(output.command).toEqual("Résumé PDF");
		expect(output.values[0]).toEqual("http://registry.jsonresume.org/test.html");
	});
});