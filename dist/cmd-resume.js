/*! cmd-resume v5.4.7 | MIT */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.jQuery));
})(this, (function ($) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

	var $__default = /*#__PURE__*/_interopDefaultLegacy($);

	// Default styles for displaying text (mutable via styleState.defaults)
	var styleState = {
	  defaults: {
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
	  }
	};
	var CONSTANTS = {
	  NEW_LINE: "\n",
	  SEMI_COLON: ";",
	  EMPTY: "",
	  TAB: "    ",
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
	  toString: function toString(styleEnumValue) {
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

	// Check if something is undefined or null
	var isUndefinedOrNull = function isUndefinedOrNull(value) {
	  return typeof value === "undefined" || value === null;
	};

	// Update HTML title
	var updateTitle = function updateTitle(name) {
	  // Check if a name exists, if not make title default
	  document.title = name ? name + "'s Résumé" : "Command Line Résumé";
	};

	// Check if a valid color
	var isValidColor = function isValidColor(color) {
	  if (color) {
	    // Disable style checking on external function
	    // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	    return $__default["default"].terminal.valid_color(color);
	    // jscs:enable
	  } else {
	    return false;
	  }
	};

	// Get key array
	var getKeyArray = function getKeyArray(key) {
	  if (Array.isArray(key)) {
	    return key;
	  } else {
	    return [key];
	  }
	};

	// Get value
	var getDataFromArrayKey = function getDataFromArrayKey(data, keys) {
	  keys = getKeyArray(keys);
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (typeof data[key] === "undefined") {
	      return false;
	    }
	    data = data[key];
	  }
	  return data;
	};

	// Check if an object has key and has length
	var isDefinedNotEmpty = function isDefinedNotEmpty(object, key, isObject) {
	  if (!key || !object) {
	    return false;
	  }
	  var data = getDataFromArrayKey(object, getKeyArray(key));
	  return data && (!!isObject || data.length);
	};

	// Checks is hosted on JSON Resume
	var isJsonResumeHosted = function isJsonResumeHosted(url) {
	  if (!url || url.length === 0) {
	    return false;
	  }

	  // jscs:disable maximumLineLength
	  var match = url.match(/((http|https):\/\/)registry.jsonresume\.org\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi);
	  // jscs:enable maximumLineLength

	  return !!match && match.length > 0;
	};

	// Checks if URL ends with JSON
	var isJsonFormat = function isJsonFormat(url) {
	  if (!url || url.length === 0) {
	    return false;
	  }
	  var match = url.match(/.json$/);
	  return !!match && match.length > 0;
	};

	// Get HTML Version of URL
	var getHtmlVersion = function getHtmlVersion(url) {
	  return url.replace(/.json$/, ".html");
	};

	// Calculate the formatting
	var mergeFormatting = function mergeFormatting(baseStyle, overRideStyle) {
	  if (overRideStyle.color && isValidColor(overRideStyle.color)) {
	    baseStyle.color = overRideStyle.color;
	  }
	  if (overRideStyle.bold) {
	    baseStyle.bold = overRideStyle.bold;
	  }
	  if (overRideStyle.italic) {
	    baseStyle.italic = overRideStyle.italic;
	  }
	  if (overRideStyle.backgroundColor && isValidColor(overRideStyle.backgroundColor)) {
	    baseStyle.backgroundColor = overRideStyle.backgroundColor;
	  }
	  return baseStyle;
	};

	// Wrap around styling
	var wrappedFormatting = function wrappedFormatting(style, content) {
	  // Check if content null, then ignore
	  if (!content) {
	    return CONSTANTS.EMPTY;
	  }

	  // Blank out style in case of undefined
	  style = style ? style : CONSTANTS.EMPTY;
	  return "[[" + style + "]" + content + "]";
	};

	// Side effects: extend String with terminal styling helpers (used across the plugin).
	String.prototype.setFormat = function (styleEnumValue) {
	  var result = CONSTANTS.EMPTY;
	  if (this.length === 0) {
	    return result;
	  }
	  var type = StyleEnum.toString(styleEnumValue);
	  var style = $__default["default"].extend({}, styleState.defaults.standard);
	  if (type && styleEnumValue !== StyleEnum.STANDARD) {
	    style = mergeFormatting(style, styleState.defaults[type]);
	  }
	  if (style.bold) {
	    result += "b";
	  }
	  if (style.italic) {
	    result += "i";
	  }
	  result += CONSTANTS.SEMI_COLON;
	  result += style.color;
	  result += CONSTANTS.SEMI_COLON;
	  result += style.backgroundColor;
	  return wrappedFormatting(result, this);
	};

	// Title formatter
	String.prototype.setTitle = function () {
	  return this.setFormat(StyleEnum.TITLE);
	};

	// Command formatter
	String.prototype.setCommand = function () {
	  return this.setFormat(StyleEnum.COMMAND);
	};

	// Name formatter
	String.prototype.setName = function () {
	  return this.setFormat(StyleEnum.NAME);
	};

	// PGP formatter
	String.prototype.setPGP = function () {
	  return this.setFormat(StyleEnum.PGP);
	};

	// Intiate styles with custom added options
	var initStyles = function initStyles(defaultStyles, options) {
	  // Copy the object
	  var styles = $__default["default"].extend(true, {}, defaultStyles);
	  $__default["default"].each(options, function (key, value) {
	    if (defaultStyles[key]) {
	      if (value.color) {
	        styles[key].color = value.color;
	      }
	      if (!isUndefinedOrNull(value.bold)) {
	        styles[key].bold = value.bold;
	      }
	      if (!isUndefinedOrNull(value.italic)) {
	        styles[key].italic = value.italic;
	      }
	      if (value.backgroundColor) {
	        styles[key].backgroundColor = value.backgroundColor;
	      }
	    }
	  });
	  return styles;
	};

	// Basic command handlers
	var basicHandlerFunction = function basicHandlerFunction(command) {
	  var result = CONSTANTS.NEW_LINE;
	  result += command ? command.data ? command.data : CONSTANTS.EMPTY : CONSTANTS.EMPTY;
	  return result;
	};

	// System commmand handler
	var systemHandlerFunction = function systemHandlerFunction(command) {
	  if (command) {
	    if (command.handler) {
	      return command.handler(command.data);
	    } else if (command.data) {
	      return command.data;
	    }
	  }
	  return CONSTANTS.EMPTY;
	};

	// Calculated command handler
	var calculatedHandlerFunction = function calculatedHandlerFunction(command) {
	  return CONSTANTS.NEW_LINE + systemHandlerFunction(command);
	};

	// Array function handler
	var arrayHandlerFunction = function arrayHandlerFunction(command, top) {
	  var result = CONSTANTS.EMPTY;
	  if (!command.handlers) {
	    return result;
	  }
	  command.data.some(function (value) {
	    var resultArray = [];
	    if (command.handlers.organisation) {
	      var organisationValue = command.handlers.organisation(value);
	      if (organisationValue) {
	        resultArray.push(organisationValue);
	      }
	    }
	    if (command.handlers.title) {
	      var titleValue = command.handlers.title(value);
	      if (titleValue) {
	        resultArray.push(titleValue);
	      }
	    }
	    if (command.handlers.date) {
	      var dateValue = command.handlers.date(value);
	      if (dateValue) {
	        resultArray.push(dateValue);
	      }
	    }
	    if (!top && resultArray.length) {
	      result += CONSTANTS.NEW_LINE;
	    }
	    result += resultArray.join(CONSTANTS.TAB);

	    // Break after the first command
	    return top;
	  });
	  return result;
	};
	var commandProcessor = {
	  basic: basicHandlerFunction,
	  array: arrayHandlerFunction,
	  calculated: calculatedHandlerFunction,
	  system: systemHandlerFunction
	};
	var CMD = {
	  BASIC: "basic",
	  ARRAY: "array",
	  CALCULATED: "calculated",
	  SYSTEM: "system",
	  getCommand: function getCommand(cmd) {
	    return commandProcessor[cmd];
	  }
	};

	// Format date
	var getDate = function getDate(startDate, endDate) {
	  if (!endDate && !startDate) {
	    return CONSTANTS.EMPTY;
	  } else if (!endDate) {
	    return startDate + " - Present";
	  } else if (!startDate) {
	    return "Until " + endDate;
	  }
	  return startDate + CONSTANTS.DASH + endDate;
	};

	// Get degree name
	var getFullDegree = function getFullDegree(studyType, area) {
	  if (!studyType && !area) {
	    return CONSTANTS.EMPTY;
	  } else if (!studyType) {
	    return area;
	  } else if (!area) {
	    return studyType;
	  }
	  return studyType + " of " + area;
	};

	// Build URL based on social media username
	var buildUrl = function buildUrl(network, username) {
	  if (!network || !username) {
	    return CONSTANTS.EMPTY;
	  }
	  switch (network.toLowerCase()) {
	    case "twitter":
	      return "https://www.twitter.com/" + username;
	    case "github":
	      return "https://www.github.com/" + username;
	    case "linkedin":
	      return "https://www.linkedin.com/in/" + username;
	    case "facebook":
	      return "https://www.facebook.com/" + username;
	    case "reddit":
	      return "https://www.reddit.com/user/" + username;
	    case "hackernews":
	      return "https://news.ycombinator.com/user?id=" + username;
	    default:
	      return CONSTANTS.EMPTY;
	  }
	};
	var parseEmail = function parseEmail(email) {
	  return email.replace("mailto:", "");
	};
	var buildEmail = function buildEmail(email, username) {
	  var address = "";
	  if (email) {
	    address = parseEmail(email);
	  } else if (username) {
	    address = parseEmail(username);
	  }
	  if (address) {
	    return address;
	  }
	  return false;
	};
	var buildSocialNetworkAddress = function buildSocialNetworkAddress(network, url, username) {
	  if (network.toLowerCase() === "email") {
	    return buildEmail(url, username);
	  } else if (url) {
	    return url;
	  } else if (username) {
	    url = buildUrl(network, username);
	    if (url) {
	      return url;
	    }
	  }
	  return false;
	};
	String.prototype.upperCaseFirstLetter = function () {
	  if (!this || !this.length) {
	    return "";
	  }
	  return this.charAt(0).toUpperCase() + this.slice(1);
	};
	var buildSocialNetwork = function buildSocialNetwork(value) {
	  if (value.network) {
	    var address = buildSocialNetworkAddress(value.network, value.url, value.username);
	    if (address) {
	      return value.network.upperCaseFirstLetter() + CONSTANTS.DASH + address;
	    }
	    return false;
	  }
	  return value.url ? value.url : false;
	};
	var isValidCommandType = function isValidCommandType(commandType) {
	  return !!commandType && commandProcessor.hasOwnProperty(commandType);
	};
	var commandValidators = {
	  basic: function basic(command) {
	    if (!command.data) {
	      console.error("'basic' command type requires 'data'");
	      return false;
	    }
	    return true;
	  },
	  system: function system(command) {
	    if (!command.handler) {
	      console.error("'system' command type requires 'handler'");
	      return false;
	    }
	    return true;
	  },
	  calculated: function calculated(command) {
	    if (!command.data) {
	      console.error("'calculated' command type requires 'data'");
	      return false;
	    }
	    if (!command.handler) {
	      console.error("'calculated' command type requires 'handler'");
	      return false;
	    }
	    return true;
	  },
	  array: function array(command) {
	    if (!command.data) {
	      console.error("'array' command type requires 'data'");
	      return false;
	    }
	    if (!command.handlers) {
	      console.error("'array' command type requires 'handlers'");
	      return false;
	    }
	    return true;
	  }
	};
	var isValidCommand = function isValidCommand(command) {
	  if (!command.name) {
	    console.error("Command must have a name");
	    return false;
	  }
	  command.name = command.name.toLowerCase();
	  if (!command.description) {
	    console.error("'" + command.name + "' does not have a 'description'");
	    return false;
	  }
	  if (!isValidCommandType(command.type)) {
	    console.error("'" + command.name + "' does not have a valid type [basic, system, array, calculated]");
	    return false;
	  }
	  return commandValidators[command.type](command);
	};

	// Get Github URI based on username
	var getGithubUri = function getGithubUri(username) {
	  // Return empty is username is empty
	  if (username) {
	    return "https://api.github.com/users/" + username + "/repos";
	  } else {
	    return CONSTANTS.EMPTY;
	  }
	};

	// Go through Github array (Split to make testing easier)
	var filterGithubFork = function filterGithubFork(repos, ownRepo, showForks) {
	  var result = [];
	  repos.forEach(function (value) {
	    if (value && value.name !== ownRepo && (showForks === value.fork || !value.fork)) {
	      result.push(value);
	    }
	  });
	  return result;
	};

	// Get the Github information
	var getGithub = function getGithub(uri, username, showForks, callback) {
	  var ownRepo = username.toLowerCase() + ".github.com";
	  $__default["default"].getJSON(uri, function (response) {
	    // Run callback
	    if (response && response.length > 0) {
	      callback(filterGithubFork(response, ownRepo, showForks));
	    }
	  });
	};

	// Format Github response
	var formatGithub = function formatGithub(repository, first) {
	  var repoCache = CONSTANTS.EMPTY;
	  if (!repository || !repository.name) {
	    return repoCache;
	  }
	  if (!first) {
	    repoCache += CONSTANTS.NEW_LINE;
	  }
	  repoCache += repository.name.setName();
	  if (repository.description) {
	    repoCache += CONSTANTS.DASH + repository.description;
	  }
	  return repoCache;
	};

	$__default["default"].fn.CMDResume = function (primaryEndpoint, options) {
	  // Get element
	  var element = this;
	  options = options || {};
	  var __nextDefaults = initStyles(styleState.defaults, options);
	  Object.keys(__nextDefaults).forEach(function (k) {
	    styleState.defaults[k] = __nextDefaults[k];
	  });
	  var self = {};
	  self.commands = {};

	  // Set background colour to black
	  $__default["default"](element).css("background-color", "black");
	  if (isJsonResumeHosted(primaryEndpoint) && !isJsonFormat(primaryEndpoint)) {
	    primaryEndpoint += ".json";
	  }
	  self.allCommands = [{
	    name: "man",
	    title: "man".setCommand(),
	    description: "describes what each command does",
	    type: CMD.SYSTEM,
	    handler: function handler(command) {
	      if (!command) {
	        return "man:".setCommand() + " No command entered.";
	      } else if (self.hasCommand(command)) {
	        return command.setCommand() + CONSTANTS.DASH + self.commands[command].description;
	      } else {
	        return "man".setCommand() + ": " + command.setCommand() + " is an unknown command.";
	      }
	    }
	  }, {
	    name: "Help",
	    description: "lists help for all the commands",
	    type: CMD.SYSTEM,
	    handler: function handler() {
	      var commands = "Available Commands:".setTitle();
	      $__default["default"].map(self.commands, function (value, key) {
	        commands += CONSTANTS.NEW_LINE;
	        commands += key.setCommand();
	        commands += CONSTANTS.DASH;
	        commands += value.description;
	      });
	      return commands;
	    }
	  }, {
	    name: "Name",
	    description: "owner of the résumé",
	    data: ["basics", "name"],
	    type: CMD.BASIC
	  }, {
	    name: "About",
	    description: "about me",
	    data: ["basics", "summary"],
	    type: CMD.BASIC
	  }, {
	    name: "pdf",
	    title: "Résumé PDF",
	    description: "pdf version of the résumé",
	    data: ["basics", "pdfLink"],
	    type: CMD.CALCULATED,
	    handler: function handler(data) {
	      return decodeURIComponent(escape(data));
	    }
	  }, {
	    name: "Location",
	    description: "current location",
	    data: ["basics", "location"],
	    dataIsObject: true,
	    type: CMD.CALCULATED,
	    handler: function handler(data) {
	      var results = [];
	      if (data.city) {
	        results.push(data.city);
	      }
	      if (data.region) {
	        results.push(data.region);
	      }
	      if (data.countryCode) {
	        results.push(data.countryCode);
	      }
	      return results.join(CONSTANTS.COMA);
	    }
	  }, {
	    name: "Label",
	    description: "title",
	    data: ["basics", "label"],
	    type: CMD.BASIC
	  }, {
	    name: "Education",
	    description: "education history",
	    type: CMD.ARRAY,
	    handlers: {
	      organisation: function organisation(value) {
	        return value.institution;
	      },
	      title: function title(value) {
	        return getFullDegree(value.studyType, value.area);
	      },
	      date: function date(value) {
	        return getDate(value.startDate, value.endDate);
	      }
	    }
	  }, {
	    name: "Employment",
	    description: "employment history",
	    data: "work",
	    type: CMD.ARRAY,
	    handlers: {
	      organisation: function organisation(value) {
	        return value.company;
	      },
	      title: function title(value) {
	        return value.position;
	      },
	      date: function date(value) {
	        return getDate(value.startDate, value.endDate);
	      }
	    }
	  }, {
	    name: "Volunteering",
	    description: "volunteering history",
	    data: "volunteer",
	    type: CMD.ARRAY,
	    handlers: {
	      organisation: function organisation(value) {
	        return value.organization;
	      },
	      title: function title(value) {
	        return value.position;
	      },
	      date: function date(value) {
	        return getDate(value.startDate, value.endDate);
	      }
	    }
	  }, {
	    name: "socialmedia",
	    title: "Social Media",
	    description: "social media profiles",
	    data: ["basics", "profiles"],
	    dataIsObject: true,
	    type: CMD.CALCULATED,
	    handler: function handler(data) {
	      var resultArray = [];
	      data.forEach(function (value) {
	        var socialMediaProfile = buildSocialNetwork(value);
	        if (!socialMediaProfile) {
	          return true;
	        }
	        resultArray.push(socialMediaProfile);
	      });
	      return resultArray.join(CONSTANTS.NEW_LINE);
	    }
	  }, {
	    name: "Skills",
	    description: "skills obtained",
	    type: CMD.CALCULATED,
	    handler: function handler(data) {
	      var result = CONSTANTS.EMPTY;
	      data.forEach(function (value, index) {
	        if (value.level) {
	          result += value.level;
	          if (value.name) {
	            result += " in ";
	          }
	        }
	        if (value.name) {
	          result += value.name;
	        }

	        // Make sure not the last entry
	        if (index !== data.length - 1) {
	          result += CONSTANTS.NEW_LINE;
	        }
	      });
	      return result;
	    }
	  }, {
	    name: "Awards",
	    description: "awards obtained",
	    type: CMD.ARRAY,
	    handlers: {
	      organisation: function organisation(value) {
	        return value.awarder;
	      },
	      title: function title(value) {
	        return value.title;
	      },
	      date: function date(value) {
	        return value.date;
	      }
	    }
	  }, {
	    name: "Publications",
	    description: "publications produced",
	    type: CMD.ARRAY,
	    handlers: {
	      organisation: function organisation(value) {
	        return value.publisher;
	      },
	      title: function title(value) {
	        return value.name;
	      },
	      date: function date(value) {
	        return value.releaseDate;
	      }
	    }
	  }, {
	    name: "Languages",
	    description: "languages",
	    type: CMD.ARRAY,
	    handlers: {
	      organisation: function organisation(value) {
	        return value.language;
	      },
	      title: function title(value) {
	        return value.fluency;
	      }
	    }
	  }, {
	    name: "Interests",
	    description: "interests",
	    type: CMD.ARRAY,
	    handlers: {
	      organisation: function organisation(value) {
	        return value.name ? value.name.setName() : "";
	      },
	      title: function title(value) {
	        return value.keywords ? value.keywords.join(CONSTANTS.COMA) : "";
	      }
	    }
	  }, {
	    name: "References",
	    description: "references",
	    type: CMD.ARRAY,
	    handlers: {
	      organisation: function organisation(value) {
	        return value.name ? value.name.setName() : "";
	      },
	      title: function title(value) {
	        return value.reference;
	      }
	    }
	  }, {
	    name: "splash",
	    title: "Splash Screen",
	    description: "print the welcome screen",
	    type: CMD.SYSTEM,
	    handler: function handler() {
	      var results = CONSTANTS.EMPTY;

	      // Return custom splash if it exists
	      if (self.data.customSplash) {
	        results += self.data.customSplash;
	      } else {
	        if (self.data.basics.name) {
	          results += "Welcome to " + self.data.basics.name.setName() + "'s résumé.";
	        } else {
	          results += "Welcome to my résumé.";
	        }
	      }
	      results += CONSTANTS.NEW_LINE;
	      results += CONSTANTS.NEW_LINE;
	      results += "Type ";
	      results += "help".setCommand();
	      results += " for commands";
	      return results;
	    }
	  }, {
	    name: "pgpkey",
	    title: "PGP Key",
	    description: "public PGP key",
	    type: CMD.CALCULATED,
	    handler: function handler() {
	      var results = CONSTANTS.EMPTY;
	      for (var i = 0; i < self.data.pgpkey.length; i++) {
	        results += self.data.pgpkey[i];
	        if (i !== self.data.pgpkey.length - 1) {
	          results += CONSTANTS.NEW_LINE;
	        }
	      }
	      return results.setPGP();
	    }
	  }, {
	    name: "resume",
	    title: "Résumé",
	    description: "prints résumé",
	    type: CMD.SYSTEM,
	    handler: function handler() {
	      var results = [];
	      var commands = ["name", "label", "about", "socialmedia", "employment", "volunteering", "education", "awards", "publications", "skills", "languages", "interests", "references"];
	      for (var i = 0; i < commands.length; i++) {
	        var command = commands[i];
	        if (Object.keys(self.commands).indexOf(command) !== -1) {
	          results.push(self.commandLineParse(command, []));
	        }
	      }
	      return results.join(CONSTANTS.NEW_LINE + CONSTANTS.NEW_LINE);
	    }
	  }];
	  self.initTerminal = function () {
	    self.term = element.terminal(function (command, term) {
	      // jscs:disable requireCamelCaseOrUpperCaseIdentifiers
	      var splitCommand = $__default["default"].terminal.split_command(command);
	      // jscs:enable
	      term.echo(self.commandLineParse(splitCommand.name, splitCommand.args) + CONSTANTS.NEW_LINE);
	    }, self.settings);
	  };
	  self.initGithubForks = function (options) {
	    self.showForks = options.showForks || options.showForks === "true";
	  };
	  self.init = function (options) {
	    self.initGithubForks(options);
	    self.initVariables();
	    self.initCommands();
	    self.initSettings();
	    self.initHTMLTitle();
	    self.initTerminal();
	  };

	  // Parse command line
	  self.commandLineParse = function (rootCommand, commandList) {
	    var stemCommand = !isUndefinedOrNull(commandList[0]) && commandList[0].length > 0 ? commandList[0] : false;
	    var command = self.commands[rootCommand];
	    if (rootCommand === "man") {
	      return self.commands.man.handler(stemCommand);
	    } else if (command) {
	      var top = stemCommand === "-top" ? true : false;
	      return self.processCommand(command, top);
	    } else {
	      if (rootCommand.length > 0) {
	        return rootCommand.setCommand() + " is an unknown command.";
	      } else {
	        return "No command entered.";
	      }
	    }
	  };
	  self.showTitle = function (commandType, top) {
	    if (commandType === CMD.SYSTEM) {
	      return false;
	    } else if (top && commandType === CMD.ARRAY) {
	      return false;
	    }
	    return true;
	  };
	  self.processCommand = function (command, top) {
	    var result = CONSTANTS.EMPTY;

	    // Don't show title for system or -top array command
	    if (self.showTitle(command.type, top)) {
	      result += command.title.setTitle();
	    }
	    result += CMD.getCommand(command.type)(command, top);
	    return result;
	  };

	  // Get list of commands for autocomplete
	  self.getCommandList = function () {
	    var commands = [];
	    $__default["default"].map(self.commands, function (value, key) {
	      commands.push(key);
	    });
	    return commands;
	  };
	  self.hasCommand = function (command) {
	    return self.commandList.indexOf(command) >= 0;
	  };
	  self.initClear = function () {
	    self.commands.clear = {
	      description: "clear command history from screen"
	    };
	  };
	  self.addUserCommands = function (commands) {
	    commands.forEach(function (command) {
	      if (isValidCommand(command)) {
	        self.addCommand(command);
	      }
	    });
	  };
	  self.addCommand = function (command) {
	    if (command.type === CMD.SYSTEM || isDefinedNotEmpty(self.data, command.data ? command.data : command.name.toLowerCase(), !!command.dataIsObject)) {
	      var tempCommand = {
	        title: command.title ? command.title : command.name,
	        description: command.description,
	        type: command.type
	      };
	      if (command.type !== CMD.SYSTEM) {
	        tempCommand.data = getDataFromArrayKey(self.data, command.data ? command.data : command.name.toLowerCase());
	      }
	      if (command.handlers) {
	        tempCommand.handlers = command.handlers;
	      }
	      if (command.handler) {
	        tempCommand.handler = command.handler;
	      }
	      self.commands[command.name.toLowerCase()] = tempCommand;
	    }
	  };
	  self.addCommands = function () {
	    self.allCommands.forEach(function (command) {
	      self.addCommand(command);
	    });
	  };
	  self.initCommands = function () {
	    self.initClear();
	    self.addCommands();
	    if (options.customCommands && Array.isArray(options.customCommands) && options.customCommands.length) {
	      self.addUserCommands(options.customCommands);
	    }
	  };
	  self.initSocialMedia = function () {
	    self.data.basics.profiles.forEach(function (value) {
	      if (!value.network) {
	        // Ensure has network
	        return;
	      }
	      if (!self.data.basics.githubUsername && value.network.toLowerCase() === "github") {
	        if (value.username) {
	          self.data.basics.githubUsername = value.username;
	        }
	      } else if (value.network.toLowerCase() === "resume") {
	        self.data.basics.pdfLink = value.url;
	      }
	    });
	    if (!!!self.data.basics.pdfLink && isJsonResumeHosted(primaryEndpoint)) {
	      self.data.basics.pdfLink = getHtmlVersion(primaryEndpoint);
	    }
	  };
	  self.initGithub = function () {
	    getGithub(getGithubUri(self.data.basics.githubUsername), self.data.basics.githubUsername, self.showForks, function (result) {
	      var formattedString = CONSTANTS.EMPTY;
	      result.forEach(function (value, key) {
	        formattedString += formatGithub(value, key === 0);
	      });
	      self.data.githubCache = formattedString;
	      self.addCommand({
	        name: "Github",
	        title: "Github Repositories",
	        description: "list Github repositories",
	        type: CMD.BASIC,
	        data: "githubCache"
	      });
	    });
	  };

	  // Initialize variables
	  self.initVariables = function () {
	    self.data.commands = {};
	    if (self.data.basics.profiles) {
	      self.initSocialMedia();
	    }
	    if (self.data.basics.githubUsername) {
	      self.initGithub();
	    }
	  };
	  self.initSettings = function () {
	    self.commandList = self.getCommandList();
	    self.settings = {
	      greetings: self.commands.splash.handler(),
	      completion: self.commandList
	    };
	  };
	  self.initHTMLTitle = function () {
	    updateTitle(self.data.basics.name);
	  };
	  $__default["default"].getJSON(primaryEndpoint, function (response) {
	    self.data = response;
	    if (!self.data.basics) {
	      self.data.basics = {};
	    }
	    if (options.extraDetails) {
	      $__default["default"].getJSON(options.extraDetails, function (extraResponse) {
	        self.data.pgpkey = extraResponse.pgpkey;
	        if (extraResponse.github) {
	          self.data.basics.githubUsername = extraResponse.github;
	          self.data.githubCache = CONSTANTS.EMPTY;
	        }
	        if (extraResponse.splash) {
	          if (typeof extraResponse.splash === "string") {
	            self.data.customSplash = extraResponse.splash + CONSTANTS.NEW_LINE;
	          } else {
	            self.data.customSplash = extraResponse.splash.join(CONSTANTS.NEW_LINE);
	          }
	        }
	        self.data.extra = extraResponse;
	        self.init(options);
	      });
	    } else {
	      self.init(options);
	    }
	  });
	  this.CMDResume = self;
	  return this;
	};

}));
//# sourceMappingURL=cmd-resume.js.map
