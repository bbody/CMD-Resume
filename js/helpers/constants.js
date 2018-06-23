// Default styles for displaying text
var defaultStyles = {
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

var CONSTANTS = {
	NEW_LINE: "\n",
	SEMI_COLON: ";",
	EMPTY: "",
	TAB: "\t",
	COLON: ":",
	COMA: ", ",
	DASH: " - ",
	SPACE: " "
};

var StyleEnum = {
	STANDARD: 0,
	TITLE: 1,
	COMMAND: 2,
	NAME: 3,
	PGP: 4,
	toString: function(styleEnumValue) {
		switch (styleEnumValue) {
			case StyleEnum.TITLE:
				return "title";
			case StyleEnum.COMMAND:
				return "command";
			case StyleEnum.NAME:
				return "name";
			case StyleEnum.PGP:
				return "pgp";
			case StyleEnum.STANDARD:
				return "standard";
			default:
				return false;
		}
	}
};
