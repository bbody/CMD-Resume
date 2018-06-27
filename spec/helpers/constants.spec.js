describe("constants", function() {
	describe("StyleEnum produces the correct text", function() {
		it("Standard style", function() {
			expect(StyleEnum.toString(StyleEnum.STANDARD)).toBe("standard");
		});

		it("Title style", function() {
			expect(StyleEnum.toString(StyleEnum.TITLE)).toBe("title");
		});

		it("Command style", function() {
			expect(StyleEnum.toString(StyleEnum.COMMAND)).toBe("command");
		});

		it("Name style", function() {
			expect(StyleEnum.toString(StyleEnum.NAME)).toBe("name");
		});

		it("PGP style", function() {
			expect(StyleEnum.toString(StyleEnum.PGP)).toBe("pgp");
		});

		it("Invalid style name", function() {
			expect(StyleEnum.toString(-100)).toBe(false);
		});
	});
});