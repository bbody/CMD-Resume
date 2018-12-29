module.exports = {
	loadSimpleCMDResume: function(browser) {
		browser.execute(function() {
			$("body").CMDResume("./responses/details_nogithub.json");
		});
	},
	loadExtendedCMDResume: function(browser) {
		browser.execute(function() {
			$("body").CMDResume("./responses/details_nogithub.json", {"extraDetails": "./responses/extra-details_nogithub.json"});
		});
	},
	getSingleValue: function(browser) {
		return browser.getText(".terminal-output div:last-child div:nth-child(1)").replace(/ /gi, " ");
	},
	getSimpleValues: function(browser) {
		var key = browser.getText(".terminal-output div:last-child div:nth-child(1)").replace(/ /gi, " ");
		var value = browser.getText(".terminal-output div:last-child div:nth-child(2)").replace(/ /gi, " ");

		return {key: key, value: value};
	},
	getMultiValues: function(browser) {
		var key = $$(".terminal-output div:last-child div:first-child")[0].getText().replace(/ /gi, " ");

		var values = $$(".terminal-output div:last-child div:not(:first-child):not(:last-child)");

		var formattedValues = [];

		values.forEach(function(value) {
			formattedValues.push(value.getText().replace(/ /gi, " "));
		});

		return {key: key, values: formattedValues};
	},
	keyboard: {
		typeCommand: function(browser, command, tab) {
			var result = browser.elementActive();
			var activeElement = result.value && (result.value.ELEMENT || result.value["element-6066-11e4-a52e-4f735466cecf"]);
			// Newer versions of the webdriver like Gecko/IEDriver return the element as "element-6066-11e4-a52e-4f735466cecf" (which is documented in the W3C specs) instead of "ELEMENT".

			var keys = command.replace(/ /gi, "\t ").split("");

			if (tab) {
				keys.push("\uE004");
			}

			if (activeElement) {
				browser.elementIdValue(activeElement, [...keys, "\uE006"]);
			}
		}
	},
	assertDiff(browser, expect) {
		if (browser.checkDocument) {
			var results = browser.checkDocument();
			results.forEach((result) => expect(result.isExactSameImage).toBe(true));
		}
	}
};
