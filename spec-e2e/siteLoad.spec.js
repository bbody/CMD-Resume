var helper = require('./support/helper.js');

describe("Website load", function() {
	describe("Website title", function() {
		beforeEach(function(){
			browser.url('/');
		});

		it("changes once plugin loads", function(){
			var title = browser.getTitle();
			expect(title).toBe("Command Line Résumé");
			browser.execute(function(){
				$('body').CMDResume('./responses/details.json');
			});

			var terminal = $('body.terminal');

			terminal.waitForExist(5000);

			title = browser.getTitle();
			expect(title).toBe("Richard Hendriks's Résumé");
		});

	});
	describe("Splash message", function() {
		beforeEach(function(){
			browser.execute(function(){
				$('body').CMDResume('./responses/details.json');
			});

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
});
