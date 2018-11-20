module.exports = {
	loadSimpleCMDResume: function(browser) {
		browser.execute(function(){
			$('body').CMDResume('./responses/details_nogithub.json');
		});
	},
	loadExtendedCMDResume: function(browser){
		browser.execute(function(){
			$('body').CMDResume('./responses/details_nogithub.json', {'extraDetails': './responses/extra-details_nogithub.json'});
		});
	},
	getSingleValue: function(browser){
		return browser.getText('.terminal-output div:last-child div:nth-child(1)');
	},
	getSimpleValues: function(browser){
		var key = browser.getText('.terminal-output div:last-child div:nth-child(1)');
		var value = browser.getText('.terminal-output div:last-child div:nth-child(2)');

		return {key: key, value: value};
	},
	getMultiValues: function(browser){
		var key = $$('.terminal-output div:last-child div:first-child')[0].getText();

		var values = $$('.terminal-output div:last-child div:not(:first-child):not(:last-child)');

		var formattedValues = [];

		values.forEach(function(value){
			formattedValues.push(value.getText());
		});

		return {key: key, values: formattedValues};
	},
	keyboard: {
		typeCommand: function(browser, command, tab) {
			var keys = command.split('');

			if (tab){
				keys.push('\uE004');
			}

			browser.keys([...keys, '\uE006']);
		}
	}
};