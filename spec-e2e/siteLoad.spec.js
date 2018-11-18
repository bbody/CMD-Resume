var helper = require('./support/helper.js');

describe("Website load", function() {
	describe("Website title", function() {
		beforeEach(function(){
			browser.url('/');
		});

		it("changes once plugin loads", function(){
			var title = browser.getTitle();
			expect(title).toBe("Command Line Résumé");
			helper.loadSimpleCMDResume(browser);

			var terminal = $('body.terminal');

			terminal.waitForExist(5000);

			title = browser.getTitle();
			expect(title).toBe("Richard Hendriks's Résumé");
		});

	});
	describe("Splash message", function() {
		beforeEach(function(){
			helper.loadSimpleCMDResume(browser);

			$('body.terminal').waitForExist(5000);
		});

		it("has welcome message", function(){
			var welcomeMessage = browser.getText('.terminal-output div[data-index="0"] div:first-child');

			expect(welcomeMessage).toBe("Welcome to Richard Hendriks's résumé.");
		});

		it("has help message", function(){
			var helpMessage = browser.getText('.terminal-output div[data-index="0"] div:last-child');

			expect(helpMessage).toBe("Type help for commands");
		});
	});

	describe("Extended splash message", function(){
		beforeEach(function(){
			browser.url('/');

			helper.loadExtendedCMDResume(browser);

			$('body.terminal').waitForExist(5000);
		});

		it("has a splashscreen", function(){
			var splash = $$('.terminal-output div[data-index="0"] div');

			expect(splash.length).toBeGreaterThan(5);
		});
	});
});
