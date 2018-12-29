var helper = require("./support/helper.js");

describe("Website load", function() {
	describe("Website title", function() {
		beforeEach(function() {
			browser.url("/");
		});

		it("changes once plugin loads", function() {
			var title = browser.getTitle();
			expect(title).toBe("Command Line Résumé");
			helper.loadSimpleCMDResume(browser);

			var terminal = $("body.full-screen-terminal");

			terminal.waitForExist(5000);

			title = browser.getTitle().replace(/ /gi, " ");
			expect(title).toBe("Richard Hendriks's Résumé");
		});

	});
	describe("Splash message", function() {
		beforeEach(function() {
			browser.url("/");
			helper.loadSimpleCMDResume(browser);

			$("body.full-screen-terminal").waitForExist(5000);
		});

		it("has welcome message", function() {
			var welcomeMessage = browser.getText(".terminal-output div[data-index='0'] div:first-child").replace(/ /gi, " ");

			expect(welcomeMessage).toBe("Welcome to Richard Hendriks's résumé.");
		});

		it("has help message", function() {
			var helpMessage = browser.getText(".terminal-output div[data-index='0'] div:last-child").replace(/ /gi, " ");

			expect(helpMessage).toBe("Type help for commands");
		});
	});

	describe("Extended splash message", function() {
		beforeEach(function() {
			browser.url("/");

			helper.loadExtendedCMDResume(browser);

			$("body.full-screen-terminal").waitForExist(5000);
		});

		it("has a splashscreen", function() {
			var splash = $$(".terminal-output div[data-index='0'] div");

			expect(splash.length).toBeGreaterThan(5);
		});
	});
});
