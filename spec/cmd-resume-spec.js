describe("CMDResume Plugin", function() {
	beforeEach(function() {
		var div = $("<div id='cmd-resume'></div>");
		$("body").append(div);
	});

	afterEach(function() {
		$("#cmd-resume").remove();
	});

	describe("Splash screen", function() {
		describe("Featuring name", function() {
			beforeEach(function() {
				spyOn($, "getJSON").and.callFake(function(url, success) {
					// console.log(loadJSON('justName'));
					success(loadJSON('justName'));

					return {
						fail: () => {}
					};
				});

				$("#cmd-resume").CMDResume("justName.json", {});
			});

			it("Includes the name in splash", function() {
				var splash = getSplash();

				expect(splash.intro).toEqual("Welcome to ");
				expect(splash.name).toEqual("Richard Hendriks");
				expect(splash.end).toEqual("'s résumé.");
			});
		});

		describe("Without name", function() {
			beforeEach(function() {
				spyOn($, "getJSON").and.callFake(function(url, success) {
					success(loadJSON('empty'));
					return {
						fail: () => {}
					};
				});
				$("#cmd-resume").CMDResume("noName.json", {});
			});

			it("Includes the basic splash", function() {
				var splash = getSimpleSplash();
				expect(splash).toEqual("Welcome to my résumé.");
			});
		});
	});
});
