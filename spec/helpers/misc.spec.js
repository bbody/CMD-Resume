describe("misc", function() {
	describe("Tester for undefined and null values", function() {
		it("Empty string", function() {
			expect(isUndefinedOrNull("")).toBeFalsy();
		});

		it("Empty array", function() {
			expect(isUndefinedOrNull([])).toBeFalsy();
		});

		it("Empty object", function() {
			expect(isUndefinedOrNull({})).toBeFalsy();
		});

		it("Empty object", function() {
			expect(isUndefinedOrNull(null)).toBeTruthy();
		});

		it("Empty object", function() {
			expect(isUndefinedOrNull(undefined)).toBeTruthy();
		});
	});

	describe("Page title", function() {
		it("contains spec with an expectation", function() {
			expect(true).toBe(true);
		});

		it("Title changed with name", function() {
			updateTitle("John Doe");
			expect(document.title).toBe("John Doe's Résumé");
		});

		it("Title changed without a name", function() {
			updateTitle();
			expect(document.title).toBe("Command Line Résumé");
		});

		it("Title changed with a blank name", function() {
			updateTitle("");
			expect(document.title).toBe("Command Line Résumé");
		});

		it("Title changed with a null name", function() {
			updateTitle(null);
			expect(document.title).toBe("Command Line Résumé");
		});

		it("Title changed with an undefined name", function() {
			updateTitle(undefined);
			expect(document.title).toBe("Command Line Résumé");
		});
	});
	
	describe("Color validator", function() {
		it("Hex code (3 digits)", function() {
			expect(isValidColor("#FFF")).toBeTruthy();
		});

		it("Hex code (6 digits)", function() {
			expect(isValidColor("#C0FFEE")).toBeTruthy();
		});

		it("Color name", function() {
			expect(isValidColor("white")).toBeTruthy();
		});

		it("Invalid color name", function() {
			expect(isValidColor("test")).toBeFalsy();
		});

		it("Empty string", function() {
			expect(isValidColor("")).toBeFalsy();
		});

		it("Empty string", function() {
			expect(isValidColor(null)).toBeFalsy();
		});

		it("Empty string", function() {
			expect(isValidColor()).toBeFalsy();
		});
	});

	describe("Color validator", function() {
		it("Hex code (3 digits)", function() {
			expect(isValidColor("#FFF")).toBeTruthy();
		});

		it("Hex code (6 digits)", function() {
			expect(isValidColor("#C0FFEE")).toBeTruthy();
		});

		it("Color name", function() {
			expect(isValidColor("white")).toBeTruthy();
		});

		it("Invalid color name", function() {
			expect(isValidColor("test")).toBeFalsy();
		});

		it("Empty string", function() {
			expect(isValidColor("")).toBeFalsy();
		});

		it("Empty string", function() {
			expect(isValidColor(null)).toBeFalsy();
		});

		it("Empty string", function() {
			expect(isValidColor()).toBeFalsy();
		});
	});

	describe("Object has key defined and not empty", function() {
		it("Handles no key", function() {
			expect(isDefinedNotEmpty({}, "key")).toBeFalsy();
		});

		it("Has string with length", function() {
			expect(isDefinedNotEmpty({"key": ""}, "key")).toBeFalsy();
		});

		it("Has string with length", function() {
			expect(isDefinedNotEmpty({"key": "a"}, "key")).toBeTruthy();
		});

		it("Handles empty array", function() {
			expect(isDefinedNotEmpty({"key": []}, "key")).toBeFalsy();
		});

		it("Handles array", function() {
			expect(isDefinedNotEmpty({"key": ["value"]}, "key")).toBeTruthy();
		});
	});
});