describe("github", function() {
	describe("Github Uri generator", function() {
		it("Produces a valid URI", function() {
			expect(getGithubUri("test")).toBe("https://api.github.com/users/test/repos");
		});

		it("Handles a blank string", function() {
			expect(getGithubUri("")).toBe("");
		});

		it("Handles null", function() {
			expect(getGithubUri(null)).toBe("");
		});

		it("Handles undefined", function() {
			expect(getGithubUri()).toBe("");
		});
	});

	describe("Github filtering and formatting", function() {
		beforeEach(function() {
			this.response = loadJSON("github/withForks");
		});

		it("Without forks", function() {
			expect(filterGithubFork(this.response, "test.github.com", false).length).toBe(4);
		});

		it("With forks", function() {
			expect(filterGithubFork(this.response, "test.github.com", true).length).toBe(5);
		});

		it("Formatting first item", function() {
			expect(formatGithub(this.response[0], true)).toBe("[[b;green;#000]HelloWorld] - Create hello world");
		});

		it("Formatting other items", function() {
			expect(formatGithub(this.response[0], false)).toBe("\n[[b;green;#000]HelloWorld] - Create hello world");
		});

		it("Formatting empty string", function() {
			expect(formatGithub("", true)).toBe("");
		});

		it("Formatting null item", function() {
			expect(formatGithub(null, true)).toBe("");
		});

		it("Formatting empty item", function() {
			expect(formatGithub({}, true)).toBe("");
		});
	});

	describe("getGithub", function() {
		beforeEach(function() {
			this.response = loadJSON("github/withForks");
			jasmine.Ajax.install();
		});

		afterEach(function() {
			jasmine.Ajax.uninstall();
		});

		it("URL is handed to XHR", function() {
			getGithub("http://localhost:8000/spec/responses/github_response.json", "test", false, function() {});
			var request = jasmine.Ajax.requests.mostRecent();

			expect(request.url).toBe("http://localhost:8000/spec/responses/github_response.json");
		});

		it("Handles XHR call", function() {
			var callback = jasmine.createSpy();
			getGithub("http://localhost:8000/spec/responses/github_response.json", "test", false, callback);

			var request = jasmine.Ajax.requests.mostRecent();
			request.respondWith({status: 200, responseText: JSON.stringify(this.response)});

			expect(callback).toHaveBeenCalled();
		});

		it("Handles empty response", function() {
			var callback = jasmine.createSpy();
			getGithub("http://localhost:8000/spec/responses/github_response.json", "test", false, callback);

			var request = jasmine.Ajax.requests.mostRecent();
			request.respondWith({status: 200, responseText: JSON.stringify([])});

			expect(callback).not.toHaveBeenCalled();
		});

		it("Handles no response", function() {
			var callback = jasmine.createSpy();
			getGithub("http://localhost:8000/spec/responses/github_response.json", "test", false, callback);

			expect(callback).not.toHaveBeenCalled();
		});
	});
});
