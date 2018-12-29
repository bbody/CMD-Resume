describe("User Commands", function() {
	beforeEach(function() {
		var div = $("<div id='cmd-resume'></div>");
		$("body").append(div);
		jasmine.Ajax.install();
		spyOn(console, "error");

		jasmine.Ajax.stubRequest("json").andReturn(successResponse("details"));
		jasmine.Ajax.stubRequest("extra-commands.json").andReturn(successResponse("extraDetails/extraDataForCommands"));
	});

	afterEach(function() {
		$("#cmd-resume").remove();
		jasmine.Ajax.uninstall();
	});

	describe("No Commands", function() {
		it("handles empty array", function() {
			$("#cmd-resume").CMDResume("json", {customCommands: []});

			expect(console.error).not.toHaveBeenCalled();
		});

		it("handles array with empty object", function() {
			$("#cmd-resume").CMDResume("json", {customCommands: [{}]});

			expect(console.error).toHaveBeenCalled();
			expect(console.error).toHaveBeenCalledWith("Command must have a name");
		});

		it("handles empty object", function() {
			$("#cmd-resume").CMDResume("json", {customCommands: {}});

			expect(console.error).not.toHaveBeenCalled();
		});

		it("handles no user commands", function() {
			$("#cmd-resume").CMDResume("json", {});

			expect(console.error).not.toHaveBeenCalled();
		});

		it("handles null object", function() {
			$("#cmd-resume").CMDResume("json", {customCommands: null});

			expect(console.error).not.toHaveBeenCalled();
		});

		it("handles undefined object", function() {
			$("#cmd-resume").CMDResume("json", {customCommands: undefined});

			expect(console.error).not.toHaveBeenCalled();
		});
	});

	it("handles basic command", function() {
		var commands = [
			{
				name: "spiritanimal",
				title: "Spirit Animal",
				description: "the animal I most identify with",
				type: "basic",
				data: ["extra", "spiritanimal"]
			}
		];

		$("#cmd-resume").CMDResume("json", {customCommands: commands, extraDetails: "extra-commands.json"});

		expect(console.error).not.toHaveBeenCalled();

		// Check command
		enterCommand("spiritanimal");
		var output = getSimpleOutput();
		expect(output.summary).toEqual("Spirit Animal");
		expect(output.value).toEqual("Cassowary");

		// Check Description
		enterCommand("man spiritanimal");
		var manOutput = manCommandOutput();
		expect(manOutput.command).toEqual("spiritanimal");
		expect(manOutput.message).toEqual(" - the animal I most identify with");
	});

	it("handles system command", function() {
		var geolocation = navigator.geolocation;
		navigator.geolocation = true;
		var commands = [
			{
				name: "geolocation",
				title: "Geolocation",
				description: "checks if geolocation is enabled",
				type: "system",
				handler: function() {
					return "Geolocation is " + (navigator.geolocation ?  "" : "not ") + "supported for this browser";
				}
			}
		];

		$("#cmd-resume").CMDResume("json", {customCommands: commands, extraDetails: "extra-commands.json"});

		expect(console.error).not.toHaveBeenCalled();

		// Check command
		enterCommand("geolocation");
		var output = getSingleOutput();
		expect(output).toEqual("Geolocation is supported for this browser");

		// Check Description
		enterCommand("man geolocation");
		var manOutput = manCommandOutput();
		expect(manOutput.command).toEqual("geolocation");
		expect(manOutput.message).toEqual(" - checks if geolocation is enabled");

		navigator.geolocation = geolocation;
	});

	it("handles calculated command", function() {
		jasmine.clock().mockDate(new Date(2018,12,7));

		var commands = [
			{
				name: "projectyears",
				title: "Project Years",
				description: "years since the project started",
				type: "calculated",
				data: ["extra", "project_start"],
				dataIsObject: true,
				handler: function(value) {
					var startYear = (new Date(value.unixtime)).getFullYear();
					var endYear = (new Date()).getFullYear();
					return "Started " + (endYear - startYear) + " years ago to " + value.motivation;
				}
			}
		];

		$("#cmd-resume").CMDResume("json", {customCommands: commands, extraDetails: "extra-commands.json"});

		expect(console.error).not.toHaveBeenCalled();

		// Check command
		enterCommand("projectyears");
		var output = getSimpleOutput();
		expect(output.summary).toEqual("Project Years");
		expect(output.value).toEqual("Started 6 years ago to try and find a job");

		// Check Description
		enterCommand("man projectyears");
		var manOutput = manCommandOutput();
		expect(manOutput.command).toEqual("projectyears");
		expect(manOutput.message).toEqual(" - years since the project started");
	});

	it("handles array command", function() {
		jasmine.clock().mockDate(new Date(2018,12,7));

		var commands = [
			{
				name: "countries",
				title: "Countries",
				description: "countries that I've been to",
				type: "array",
				data: ["extra", "countriestravelledto"],
				handlers: {
					organisation: function(value) {
						return value.name;
					},
					title: function(value) {
						return value.cities.join(", ");
					},
					date: function(value) {
						return value.timeperiod;
					}
				}
			}
		];

		$("#cmd-resume").CMDResume("json", {customCommands: commands, extraDetails: "extra-commands.json"});

		expect(console.error).not.toHaveBeenCalled();

		// Check command
		enterCommand("countries");
		var output = fullCommandOutput();
		expect(output.command).toEqual("Countries");
		expect(output.values.length).toEqual(3);
		expect(output.values[0]).toEqual("USA    Chicago, New York, Los Angeles    2018");
		expect(output.values[1]).toEqual("Canada    Toronto, Vancouver    2017");
		expect(output.values[2]).toEqual("Australia    Brisbane, Sydney, Melbourne    All my life");

		// Check Description
		enterCommand("man countries");
		var manOutput = manCommandOutput();
		expect(manOutput.command).toEqual("countries");
		expect(manOutput.message).toEqual(" - countries that I've been to");
	});
});
