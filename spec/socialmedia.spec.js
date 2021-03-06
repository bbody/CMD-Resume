describe("Social Media", function() {
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
		describe("Without socialmedia", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noVolunteer.json");
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("emptyStrings"))
				});

				enterCommand("socialmedia");

				var output = failedCommandOutput();

				expect(output.command).toEqual("socialmedia");
				expect(output.message).toEqual(" is an unknown command.");
			});
		});

		describe("No socialmedia", function() {
			beforeEach(function() {
				$("#cmd-resume").CMDResume("noName.json");
			});

			it("Includes the basic splash", function() {
				var mostRecentRequest = jasmine.Ajax.requests.mostRecent();

				mostRecentRequest.respondWith({
					status: 200,
					responseText: JSON.stringify(loadJSON("empty"))
				});

				enterCommand("socialmedia");

				var output = failedCommandOutput();

				expect(output.command).toEqual("socialmedia");
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
				responseText: JSON.stringify(loadJSON("socialmedia"))
			});

			enterCommand("socialmedia");

			var output = socialmedia.fullCommandOutput();

			expect(output.command).toEqual("Social Media");
			expect(output.values.length).toEqual(4);
			expect(output.values[0]).toEqual("Twitter - http://www.twitter.com/something");
			expect(output.values[1]).toEqual("SoundCloud - https://soundcloud.com/dandymusicnl");
			expect(output.values[2]).toEqual("GitHub - https://github.com/bbody/");
			expect(output.values[3]).toEqual("Resume - http://en.wikipedia.org/wiki/R%C3%A9sum%C3%A9");
		});
	});
	describe("missing parts", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("socialmedia.json");
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify(loadJSON("socialmediaMissing"))
			});
			enterCommand("socialmedia");
		});
		it("Missing network", function() {
			var output = socialmedia.fullCommandOutput();
			expect(output.values[0]).toEqual("http://www.twitter.com/something");
		});
		it("Missing url", function() {
			var output = socialmedia.fullCommandOutput();
			expect(output.values.length).toEqual(1);
		});
	});

	describe("Email", function() {
		beforeEach(function() {
			$("#cmd-resume").CMDResume("socialmedia.json");
		});
		it("Has mailto", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify({basics: {profiles: [{network: "email", url: "mailto:test@example.com"}]}})
			});
			enterCommand("socialmedia");

			var output = socialmedia.fullCommandOutput();
			expect(output.values[0]).toEqual("Email - test@example.com");
		});
		it("Straight email", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify({basics: {profiles: [{network: "email", url: "test@example.com"}]}})
			});
			enterCommand("socialmedia");

			var output = socialmedia.fullCommandOutput();
			expect(output.values[0]).toEqual("Email - test@example.com");
		});
		it("Is missing url", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify({basics: {profiles: [{network: "email", username: "test@example.com"}]}})
			});
			enterCommand("socialmedia");

			var output = socialmedia.fullCommandOutput();
			expect(output.values[0]).toEqual("Email - test@example.com");
		});

		it("Is missing url and username", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify({basics: {profiles: [{network: "email"}]}})
			});
			enterCommand("socialmedia");

			var output = socialmedia.fullCommandOutput();
			expect(output.command).toEqual("Social Media");
			expect(output.values.length).toEqual(0);
		});

		it("It builds url with username", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify({basics: {profiles: [{network: "GitHub", username: "test"}]}})
			});
			enterCommand("socialmedia");

			var output = socialmedia.fullCommandOutput();
			expect(output.command).toEqual("Social Media");
			expect(output.values[0]).toEqual("GitHub - https://www.github.com/test");
		});

		it("It isn't a known network (network, username)", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify({basics: {profiles: [{network: "Network", username: "test"}]}})
			});
			enterCommand("socialmedia");

			var output = socialmedia.fullCommandOutput();
			expect(output.command).toEqual("Social Media");
			expect(output.values.length).toEqual(0);
		});

		it("It isn't a known network (url)", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify({basics: {profiles: [{url: "http://example.com/"}]}})
			});
			enterCommand("socialmedia");

			var output = socialmedia.fullCommandOutput();
			expect(output.command).toEqual("Social Media");
			expect(output.values[0]).toEqual("http://example.com/");
		});

		it("It isn't a known network (username)", function() {
			jasmine.Ajax.requests.mostRecent().respondWith({
				status: 200,
				responseText: JSON.stringify({basics: {profiles: [{username: "test"}]}})
			});
			enterCommand("socialmedia");

			var output = socialmedia.fullCommandOutput();
			expect(output.command).toEqual("Social Media");
			expect(output.values.length).toEqual(0);
		});
	});

	describe("Github no username supplied", function() {
		beforeEach(function() {
			jasmine.Ajax.stubRequest("details.json").andReturn(successResponse("noGithubUsername"));
			jasmine.Ajax.stubRequest("https://api.github.com/users/example/repos").andReturn(successResponse("github/override"));

			$("#cmd-resume").CMDResume("details.json");
		});

		it("Failed command", function() {
			enterCommand("github");

			var output = failedCommandOutput();

			expect(output.command).toEqual("github");
			expect(output.message).toEqual(" is an unknown command.");
		});
	});
});
