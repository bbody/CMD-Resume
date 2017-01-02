QUnit.module( "Static tests", {
  beforeEach: function() {
    // prepare something for all following tests
    QUnit.config.altertitle = false;
    self.title = document.title;
  },
  afterEach: function() {
    // clean up after each test
    QUnit.config.altertitle = true;
    document.title = self.title;
  }
});

QUnit.test("Title changed with name", function(assert){
	updateTitle("John Doe");
	assert.equal(document.title, "John Doe's Résumé");
});

QUnit.test("Title changed without a name", function(assert){
	updateTitle();
	assert.equal(document.title, "Command Line Résumé");
});

QUnit.test("Title changed with a blank name", function(assert){
	updateTitle("");
	assert.equal(document.title, "Command Line Résumé");
});

QUnit.test("Title changed with a null name", function(assert){
	updateTitle(null);
	assert.equal(document.title, "Command Line Résumé");
});

QUnit.test("Title changed with an undefined name", function(assert){
	updateTitle(undefined);
	assert.equal(document.title, "Command Line Résumé");
});

QUnit.test("Title changed with an undefined name", function(assert){
	updateTitle(undefined);
	assert.equal(document.title, "Command Line Résumé");
});

QUnit.module( "Static tests", {
  beforeEach: function() {
    // prepare something for all following tests
  },
  afterEach: function() {
    // clean up after each test
  }
});

QUnit.test("Wrap formatting", function(assert){
	var result = wrappedFormatting("style", "text");
	assert.equal(result, "[[style]text]");
});

QUnit.test("Wrap formatting without style", function(assert){
	var result = wrappedFormatting("", "text");
	assert.equal(result, "[[]text]");
});

QUnit.test("Wrap formatting without text", function(assert){
	var result = wrappedFormatting("style", "");
	assert.equal(result, "[[style]]");
});

QUnit.test("Wrap formatting with null style", function(assert){
	var result = wrappedFormatting(null, "text");
	assert.equal(result, "[[]text]");
});

QUnit.test("Wrap formatting with null text", function(assert){
	var result = wrappedFormatting("style", null);
	assert.equal(result, "[[style]]");
});

QUnit.test("Wrap formatting with null style and text", function(assert){
	var result = wrappedFormatting();
	assert.equal(result, "");
});

QUnit.test("Title test setFormat", function(assert){
	var result = "Hello World".setFormat("title");
	assert.equal(result, "[[b;red;#000]Hello World]");
});

QUnit.test("Title test format", function(assert){
	var result = "Hello World".setTitle();
	assert.equal(result, "[[b;red;#000]Hello World]");
});

QUnit.test("Command test setFormat", function(assert){
	var result = "Hello World".setFormat("command");
	assert.equal(result, "[[i;white;#000]Hello World]");
});

QUnit.test("Command test format", function(assert){
	var result = "Hello World".setCommand();
	assert.equal(result, "[[i;white;#000]Hello World]");
});

QUnit.test("Name test setFormat", function(assert){
	var result = "Hello World".setFormat("name");
	assert.equal(result, "[[b;green;#000]Hello World]");
});

QUnit.test("Name test format", function(assert){
	var result = "Hello World".setName();
	assert.equal(result, "[[b;green;#000]Hello World]");
});


QUnit.test("PGP test setFormat", function(assert){
	var result = "Hello World".setFormat("pgp");
	assert.equal(result, "[[i;white;#000]Hello World]");
});

QUnit.test("PGP test format", function(assert){
	var result = "Hello World".setPGP();
	assert.equal(result, "[[i;white;#000]Hello World]");
});

QUnit.test("Standard empty format", function(assert){
	var result = "Hello World".setFormat("");
	assert.equal(result, "[[;white;#000]Hello World]");
});

QUnit.test("Standard null format", function(assert){
	var result = "Hello World".setFormat(null);
	assert.equal(result, "[[;white;#000]Hello World]");
});

QUnit.test("Standard format empty text", function(assert){
	var result = "".setFormat("");
	assert.equal(result, "[[;white;#000]]");
});

QUnit.test("Get a formatted to and from dates", function(assert){
	var result = getDate("19/10/2014", "20/02/2016");
	assert.equal(result, "19/10/2014 - 20/02/2016");
});

QUnit.test("Get a formatted to present dates", function(assert){
	var result = getDate("19/10/2014");
	assert.equal(result, "19/10/2014 - Present");
});

QUnit.test("Get a formatted date when none is provided", function(assert){
	var result = getDate();
	assert.equal(result, "");
});

QUnit.test("Get full degree name", function(assert){
	var result = getFullDegree("Bachelor", "Engineering");
	assert.equal(result, "Bachelor of Engineering");
});

QUnit.test("Get full degree name without type", function(assert){
	var result = getFullDegree("Engineering");
	assert.equal(result, "Engineering");
});

QUnit.test("Get full degree name without any variables", function(assert){
	var result = getFullDegree();
	assert.equal(result, "");
});

QUnit.test("Get full url for Twitter", function(assert){
	var result = buildUrl("Twitter", "test");
	assert.equal(result, "https://www.twitter.com/test");
});

QUnit.test("Get full url for Github", function(assert){
	var result = buildUrl("Github", "test");
	assert.equal(result, "https://www.github.com/test");
});

QUnit.test("Get full url for an unknown network", function(assert){
	var result = buildUrl("something", "test");
	assert.equal(result, "");
});

QUnit.test("Basic handler function", function(assert){
	var command = {
		data: "Test"
	};
	var result = basicHandlerFunction(command);

	assert.equal(result, "\nTest");
});

QUnit.test("Basic handler function with a null command", function(assert){
	var command = null;
	var result = basicHandlerFunction(command);

	assert.equal(result, "\n");
});

QUnit.test("Basic handler function with no data in command", function(assert){
	var command = {};
	var result = basicHandlerFunction(command);

	assert.equal(result, "\n");
});

QUnit.test("System handler function", function(assert){
	var command = {
		data: "Test",
		handler: function(data){
			return data;
		}
	};
	var result = systemHandlerFunction(command);

	assert.equal(result, "Test");
});

QUnit.test("System handler function with a null command", function(assert){
	var result = systemHandlerFunction(null);

	assert.equal(result, "");
});

QUnit.test("System handler function with an undefined handler but with data", function(assert){
	var result = systemHandlerFunction({data: "Test"});

	assert.equal(result, "Test");
});

QUnit.test("System handler function with an undefined handler and data", function(assert){
	var result = systemHandlerFunction({});

	assert.equal(result, "");
});

QUnit.test("Calculated handler function", function(assert){
	var command = {
		data: "Test",
		handler: function(data){
			return data;
		}
	};
	var result = calculatedHandlerFunction(command);

	assert.equal(result, "\nTest");
});

QUnit.test("Calculated handler function with a null command", function(assert){
	var result = calculatedHandlerFunction(null);

	assert.equal(result, "\n");
});

QUnit.test("Calculated handler function with an undefined handler but with data", function(assert){
	var result = calculatedHandlerFunction({data: "Test"});

	assert.equal(result, "\nTest");
});

QUnit.test("Calculated handler function with an undefined handler and data", function(assert){
	var result = calculatedHandlerFunction({});

	assert.equal(result, "\n");
});

QUnit.module( "Static tests", {
  beforeEach: function() {
    // prepare something for all following tests
    self.data = [
		{
			title: "Title 1",
			organisation: "Organisation 1",
			date: "Date 1"
		},
		{
			title: "Title 2",
			organisation: "Organisation 2",
			date: "Date 2"
		}
	];
  },
  afterEach: function() {
    // clean up after each test
  }
});

QUnit.test("Array handler function", function(assert){
	var command = {
		data: self.data,
		handlers:{
			organisation: function(value){
				return value.organisation;
			},
			title: function(value){
				return value.title
			},
			date: function(value){
				return value.date;
			}
		}
	};

	var result = arrayHandlerFunction(command, false);

	assert.equal(result, "\nOrganisation 1\tTitle 1\tDate 1\nOrganisation 2\tTitle 2\tDate 2");
});

QUnit.test("Array handler function without top set", function(assert){
	var command = {
		data: self.data,
		handlers:{
			organisation: function(value){
				return value.organisation;
			},
			title: function(value){
				return value.title
			},
			date: function(value){
				return value.date;
			}
		}
	};

	var result = arrayHandlerFunction(command);

	assert.equal(result, "\nOrganisation 1\tTitle 1\tDate 1\nOrganisation 2\tTitle 2\tDate 2");
});

QUnit.test("Array handler function with top", function(assert){
	var command = {
		data: self.data,
		handlers:{
			organisation: function(value){
				return value.organisation;
			},
			title: function(value){
				return value.title
			},
			date: function(value){
				return value.date;
			}
		}
	};

	var result = arrayHandlerFunction(command, true);

	assert.equal(result, "Organisation 1\tTitle 1\tDate 1");
});

QUnit.test("Array handler function without handlers", function(assert){
	var command = {
		data: self.data
	};

	var result = arrayHandlerFunction(command);

	assert.equal(result, "");
});

QUnit.test("Array handler function without handler callbacks", function(assert){
	var command = {
		data: self.data,
		handlers: {}
	};

	var result = arrayHandlerFunction(command);

	assert.equal(result, "");
});

QUnit.test("Array handler function without organisation", function(assert){
	var command = {
		data: self.data,
		handlers:{
			title: function(value){
				return value.title
			},
			date: function(value){
				return value.date;
			}
		}
	};

	var result = arrayHandlerFunction(command);

	assert.equal(result, "\nTitle 1\tDate 1\nTitle 2\tDate 2");
});

QUnit.test("Array handler function without organisation with top", function(assert){
	var command = {
		data: self.data,
		handlers:{
			title: function(value){
				return value.title
			},
			date: function(value){
				return value.date;
			}
		}
	};

	var result = arrayHandlerFunction(command, true);

	assert.equal(result, "Title 1\tDate 1");
});

QUnit.test("Array handler function without title", function(assert){
	var command = {
		data: self.data,
		handlers:{
			organisation: function(value){
				return value.organisation;
			},
			date: function(value){
				return value.date;
			}
		}
	};

	var result = arrayHandlerFunction(command);

	assert.equal(result, "\nOrganisation 1\tDate 1\nOrganisation 2\tDate 2");
});

QUnit.test("Array handler function without title with top", function(assert){
	var command = {
		data: self.data,
		handlers:{
			organisation: function(value){
				return value.organisation;
			},
			date: function(value){
				return value.date;
			}
		}
	};

	var result = arrayHandlerFunction(command, true);

	assert.equal(result, "Organisation 1\tDate 1");
});

QUnit.test("Array handler function without date", function(assert){
	var command = {
		data: self.data,
		handlers:{
			title: function(value){
				return value.title
			},
			organisation: function(value){
				return value.organisation;
			}
		}
	};

	var result = arrayHandlerFunction(command);

	assert.equal(result, "\nOrganisation 1\tTitle 1\nOrganisation 2\tTitle 2");
});

QUnit.test("Array handler function without date with top", function(assert){
	var command = {
		data: self.data,
		handlers:{
			organisation: function(value){
				return value.organisation;
			},
			title: function(value){
				return value.title
			}
		}
	};

	var result = arrayHandlerFunction(command, true);

	assert.equal(result, "Organisation 1\tTitle 1");
});

QUnit.test("Array handler function with only date", function(assert){
	var command = {
		data: self.data,
		handlers:{
			date: function(value){
				return value.date;
			}
		}
	};

	var result = arrayHandlerFunction(command);

	assert.equal(result, "\nDate 1\nDate 2");
});

QUnit.test("Array handler function with only date with top", function(assert){
	var command = {
		data: self.data,
		handlers:{
			date: function(value){
				return value.date;
			}
		}
	};

	var result = arrayHandlerFunction(command, true);

	assert.equal(result, "Date 1");
});

QUnit.test("Array handler function with only organisation", function(assert){
	var command = {
		data: self.data,
		handlers:{
			organisation: function(value){
				return value.organisation;
			}
		}
	};

	var result = arrayHandlerFunction(command);

	assert.equal(result, "\nOrganisation 1\nOrganisation 2");
});

QUnit.test("Array handler function with only organisation with top", function(assert){
	var command = {
		data: self.data,
		handlers:{
			organisation: function(value){
				return value.organisation;
			}
		}
	};

	var result = arrayHandlerFunction(command, true);

	assert.equal(result, "Organisation 1");
});

QUnit.test("Array handler function with only title", function(assert){
	var command = {
		data: self.data,
		handlers:{
			title: function(value){
				return value.title;
			}
		}
	};

	var result = arrayHandlerFunction(command);

	assert.equal(result, "\nTitle 1\nTitle 2");
});

QUnit.test("Array handler function with only title with top", function(assert){
	var command = {
		data: self.data,
		handlers:{
			title: function(value){
				return value.title;
			}
		}
	};

	var result = arrayHandlerFunction(command, true);

	assert.equal(result, "Title 1");
});

QUnit.module( "Static tests", {
  beforeEach: function() {
    // prepare something for all following tests
    self.defaultStyles = {
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
  },
  afterEach: function() {
    // clean up after each test
  }
});

QUnit.test("Completely override the styles", function(assert){
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

	var result = self.initStyles(self.defaultStyles, options)

	assert.deepEqual(result, options);
});

QUnit.test("Don't override anything", function(assert){
	var options = {};

	var result = self.initStyles(self.defaultStyles, options)

	assert.deepEqual(result, self.defaultStyles);
});

QUnit.test("Override some styles", function(assert){
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

	var result = self.initStyles(self.defaultStyles, options)

	var expectedResult = jQuery.extend(true, {}, self.defaultStyles);
	expectedResult.title.color = "purple";
	expectedResult.command.bold = true;
	expectedResult.pgp.italic = false;
	expectedResult.name.backgroundColor = "blue";

	assert.deepEqual(result, expectedResult);
});
