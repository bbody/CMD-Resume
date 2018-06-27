describe("formatters", function() {
	describe("Merge formatting", function() {
		beforeEach(function() {
			this.tempBackgroundColor = defaultStyles.standard.backgroundColor;
			defaultStyles.standard.backgroundColor = "#000";
		});
		
		afterEach(function() {
			defaultStyles.standard.backgroundColor = this.tempBackgroundColor;
		});

		it("Handle Background Color", function() {
			var overrideStyle = { backgroundColor: "purple"};
			var baseStyle = defaultStyles.standard;
			expect(baseStyle.backgroundColor).toBe("#000");
			var outputStyle = mergeFormatting(baseStyle, overrideStyle);
			expect(outputStyle.backgroundColor).toBe("purple");
		});
	});

	describe("Wrap formatting", function() {
		beforeEach(function() {
			this.text = "text";
			this.style = "style";
		});

		it("Takes both arguments", function() {
			expect(wrappedFormatting(this.style, this.text)).toBe("[[style]text]");
		});

		it("Wrap text without formatting", function() {
			expect(wrappedFormatting("", this.text)).toBe("[[]text]");
		});

		it("Wraps formatting without text", function() {
			expect(wrappedFormatting(this.style, "")).toBe("");
		});

		it("Wraps formatting with no text", function() {
			expect(wrappedFormatting(this.style, ""), "");
		});

		it("Wraps formatting with null style", function() {
			expect(wrappedFormatting(null, this.text)).toBe("[[]text]");
		});

		it("Wraps formatting with null text", function() {
			expect(wrappedFormatting(this.style, null)).toBe("");
		});

		it("Wrap formatting with null style and text", function() {
			expect(wrappedFormatting()).toBe("");
		});
	});

	describe("Set format", function() {
		beforeEach(function() {
			this.exampleText = "Hello World";
		});
		
		afterEach(function() {
			defaultStyles.name.color = "green";
			defaultStyles.title.color = "red";
		});

		it("Title format", function() {
			expect(this.exampleText.setFormat(StyleEnum.TITLE)).toBe("[[b;red;#000]Hello World]");
			expect(this.exampleText.setTitle()).toBe("[[b;red;#000]Hello World]");
		});

		it("Command format", function() {
			expect(this.exampleText.setFormat(StyleEnum.COMMAND)).toBe("[[i;white;#000]Hello World]");
			expect(this.exampleText.setCommand()).toBe("[[i;white;#000]Hello World]");
		});

		it("Name format", function() {
			expect(this.exampleText.setFormat(StyleEnum.NAME)).toBe("[[b;green;#000]Hello World]");
			expect(this.exampleText.setName()).toBe("[[b;green;#000]Hello World]");
		});

		it("PGP format", function() {
			expect(this.exampleText.setFormat(StyleEnum.PGP)).toBe("[[i;white;#000]Hello World]");
			expect(this.exampleText.setPGP()).toBe("[[i;white;#000]Hello World]");
		});

		it("Accepts empty string", function() {
			expect(this.exampleText.setFormat("")).toBe("[[;white;#000]Hello World]");
		});

		it("Accepts null format", function() {
			expect(this.exampleText.setFormat(null)).toBe("[[;white;#000]Hello World]");
		});

		it("Accepts empty style and text", function() {
			expect("".setFormat("")).toBe("");
		});
		
		it("Accepts invalid styles", function() {
			defaultStyles.title.color = "cat";
			expect(this.exampleText.setFormat(StyleEnum.TITLE)).toBe("[[b;white;#000]Hello World]");
			expect(this.exampleText.setTitle()).toBe("[[b;white;#000]Hello World]");
		});
		
		it("Accepts empty default styles", function() {
			defaultStyles.name.color = null;
			expect(this.exampleText.setFormat(StyleEnum.NAME)).toBe("[[b;white;#000]Hello World]");
			expect(this.exampleText.setName()).toBe("[[b;white;#000]Hello World]");
		});
	});



	describe("Styles", function() {
		beforeEach(function() {
			this.defaultStyles = {
				standard: {
					color: "white",
					bold: false,
					italic: false,
					backgroundColor: "#000"
				},
				title: {
					color: "red",
					bold: true
				},
				command: {
					color: "white",
					bold: false,
					italic: true
				},
				pgp: {
					color: "white",
					bold: false,
					italic: true
				},
				name: {
					color: "green",
					bold: true
				}
			};
		});

		it("Completely overrides styles", function() {
			var options = {
				standard: {
					color: "red",
					bold: true,
					italic: true,
					backgroundColor: "blue"
				},
				title: {
					color: "purple",
					bold: false
				},
				command: {
					color: "black",
					bold: true,
					italic: false
				},
				pgp: {
					color: "red",
					bold: true,
					italic: false
				},
				name: {
					color: "red",
					bold: false
				}
			};

			expect(initStyles(this.defaultStyles, options)).toEqual(options);
		});

		it("Doesn\"t override any styles", function() {
			expect(initStyles(this.defaultStyles, {})).toEqual(this.defaultStyles);
		});

		it("Overrides some styles", function() {
			var options = {
				title: {
					color: "purple"
				},
				command: {
					bold: true
				},
				pgp: {
					italic: false
				},
				name: {
					backgroundColor: "blue"
				}
			};

			var result = initStyles(this.defaultStyles, options);

			var expectedResult = jQuery.extend(true, {}, this.defaultStyles);
			expectedResult.title.color = "purple";
			expectedResult.command.bold = true;
			expectedResult.pgp.italic = false;
			expectedResult.name.backgroundColor = "blue";

			expect(result).toEqual(expectedResult);

		});
	});
});