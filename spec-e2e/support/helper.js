module.exports = {
	loadCMDResume: function() {
		$('body').CMDResume('./responses/details.json', {'extraDetails': './responses/extra-details.json'});
	},
	getSimpleValues: function(browser){
		var key = browser.getText('.terminal-output div:last-child div:nth-child(1)');
		var value = browser.getText('.terminal-output div:last-child div:nth-child(2)');

		return {key: key, value: value};
	},
	keyboard: {
		typeCharacters: function(browser, keys) {
			var keys = [];
			for (var i = 0; i < keys.length; i++){
				var key = {
					type: 'key',
					id: `keyboard${i}`,
					actions: [
						{"type": "keyDown", "value": keys[i]},
						{"type": "pause", "value": 500}
					]
				};
				keys.push(key);
			}

			browser.actions(keys);

		},
		typeEnter: function(browser) {
			browser.actions([
				{
					type: 'key',
					id: 'keyboard',
					actions: [
						{"type": "keyDown", "value": "a"},
						{"type": "pause", "value": 500}
					]
				}
			]);

			browser.actions();
		}
	}
};