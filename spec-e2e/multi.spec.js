var helper = require('./support/helper.js');

describe("Multi", function() {
	beforeEach(function(){
		browser.url('/');

		helper.loadSimpleCMDResume(browser);

		$('body.full-screen-terminal').waitForExist(5000);
	});

	it("returns help", function(){
		helper.keyboard.typeCommand(browser, 'help');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Available Commands");
		expect(commandOutput.values.length).toBeGreaterThan(1);
		helper.assertDiff(browser, expect);
	});

	it("returns socialmedia", function(){
		helper.keyboard.typeCommand(browser, 'socialmedia');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Social Media");
		expect(commandOutput.values[0]).toContain("Twitter");
		expect(commandOutput.values.length).toBeGreaterThan(1);
		helper.assertDiff(browser, expect);
	});

	it("returns skills", function(){
		helper.keyboard.typeCommand(browser, 'skills');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Skills");
		expect(commandOutput.values.length).toBeGreaterThan(1);
		helper.assertDiff(browser, expect);
	});

	it("returns education", function(){
		helper.keyboard.typeCommand(browser, 'education');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Education");
		expect(commandOutput.values.length).toBeGreaterThan(1);
		helper.assertDiff(browser, expect);
	});

	it("returns employment", function(){
		helper.keyboard.typeCommand(browser, 'employment');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Employment");
		expect(commandOutput.values.length).toBeGreaterThan(1);
		helper.assertDiff(browser, expect);
	});

	it("returns volunteering", function(){
		helper.keyboard.typeCommand(browser, 'volunteering');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Volunteering");
		expect(commandOutput.values.length).toBe(1);
		helper.assertDiff(browser, expect);
	});

	it("returns awards", function(){
		helper.keyboard.typeCommand(browser, 'awards');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Awards");
		expect(commandOutput.values.length).toBe(1);
		helper.assertDiff(browser, expect);
	});

	it("returns publications", function(){
		helper.keyboard.typeCommand(browser, 'publications');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Publications");
		expect(commandOutput.values.length).toBe(1);
		helper.assertDiff(browser, expect);
	});

	it("returns languages", function(){
		helper.keyboard.typeCommand(browser, 'languages');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Languages");
		expect(commandOutput.values.length).toBe(1);
		helper.assertDiff(browser, expect);
	});

	it("returns interests", function(){
		helper.keyboard.typeCommand(browser, 'interests');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("Interests");
		expect(commandOutput.values.length).toBe(1);
		helper.assertDiff(browser, expect);
	});

	it("returns references", function(){
		helper.keyboard.typeCommand(browser, 'references');
		
		var commandOutput = helper.getMultiValues(browser);

		expect(commandOutput.key).toContain("References");
		expect(commandOutput.values.length).toBeGreaterThan(0);
		helper.assertDiff(browser, expect);
	});

	describe("top", function() {
		it("returns education", function(){
			helper.keyboard.typeCommand(browser, 'education -top');
			
			var commandOutput = helper.getSingleValue(browser);

			expect(commandOutput).toContain("University");
			helper.assertDiff(browser, expect);
		});

		it("returns employment", function(){
			helper.keyboard.typeCommand(browser, 'employment -top');
			
			var commandOutput = helper.getSingleValue(browser);

			expect(commandOutput).toContain("CEO");
			helper.assertDiff(browser, expect);
		});

		it("returns volunteering", function(){
			helper.keyboard.typeCommand(browser, 'volunteering -top');
			
			var commandOutput = helper.getSingleValue(browser);

			expect(commandOutput).toContain("Teacher");
			helper.assertDiff(browser, expect);
		});

		it("returns awards", function(){
			helper.keyboard.typeCommand(browser, 'awards -top');
			
			var commandOutput = helper.getSingleValue(browser);

			expect(commandOutput).toContain("Award");
			helper.assertDiff(browser, expect);
		});

		it("returns publications", function(){
			helper.keyboard.typeCommand(browser, 'publications -top');
			
			var commandOutput = helper.getSingleValue(browser);

			expect(commandOutput).toContain("for");
			helper.assertDiff(browser, expect);
		});

		it("returns languages", function(){
			helper.keyboard.typeCommand(browser, 'languages -top');
			
			var commandOutput = helper.getSingleValue(browser);

			expect(commandOutput).toContain("English");
			helper.assertDiff(browser, expect);
		});

		it("returns interests", function(){
			helper.keyboard.typeCommand(browser, 'interests -top');
			
			var commandOutput = helper.getSingleValue(browser);

			expect(commandOutput).toContain("Unicorns");
			helper.assertDiff(browser, expect);
		});

		it("returns references", function(){
			helper.keyboard.typeCommand(browser, 'references -top');
			
			var commandOutput = helper.getSingleValue(browser);

			expect(commandOutput).toContain("Erlich");
			helper.assertDiff(browser, expect);
		});
	});
});
