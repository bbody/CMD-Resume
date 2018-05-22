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
		expect(StyleEnum.toString(-100)).toBe("");
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

describe("Social Network URL builder", function() {
	it("Twitter", function() {
		expect(buildUrl("TWITTER", "test")).toBe("https://www.twitter.com/test");
	});

	it("Facebook", function() {
		expect(buildUrl("Facebook", "test")).toBe("https://www.facebook.com/test");
	});

	it("Github", function() {
		expect(buildUrl("github", "test")).toBe("https://www.github.com/test");
	});

	it("LinkedIn", function() {
		expect(buildUrl("linkedin", "test")).toBe("https://www.linkedin.com/in/test");
	});

	it("Reddit", function() {
		expect(buildUrl("reddit", "test")).toBe("https://www.reddit.com/user/test");
	});

	it("Hacker News", function() {
		expect(buildUrl("hackernews", "test")).toBe("https://news.ycombinator.com/user?id=test");
	});

	it("MySpace", function() {
		expect(buildUrl("myspace", "test")).toBe("");
	});

	it("Empty string", function() {
		expect(buildUrl("", "test")).toBe("");
	});

	it("No username", function() {
		expect(buildUrl("Twitter", "")).toBe("");
	});

	it("Null social media", function() {
		expect(buildUrl(null, "test")).toBe("");
	});

	it("Null username", function() {
		expect(buildUrl("twitter", null)).toBe("");
	});

	it("Undefined social media", function() {
		expect(buildUrl(undefined, "test")).toBe("");
	});

	it("Undefined username", function() {
		expect(buildUrl("twitter", undefined)).toBe("");
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

describe("Date formatting", function() {
	it("To and from dates", function() {
		expect(getDate("19/10/2014", "20/02/2016")).toBe("19/10/2014 - 20/02/2016");
	});

	it("To present date", function() {
		expect(getDate("19/10/2014")).toBe("19/10/2014 - Present");
	});

	it("Has no date", function() {
		expect(getDate()).toBe("");
	});
});

describe("Degree name formatting", function() {
	it("Formats full degree name", function() {
		expect(getFullDegree("Bachelor", "Engineering")).toBe("Bachelor of Engineering");
	});

	it("Formats degree without type", function() {
		expect(getFullDegree("Engineering")).toBe("Engineering");
	});

	it("Has no variables", function() {
		expect(getFullDegree()).toBe("");
	});
});

describe("Basic command handler", function() {
	it("Returns base case", function() {
		var command = {
			data: "Test"
		};

		expect(basicHandlerFunction(command)).toBe("\nTest");
	});

	it("Handles null input", function() {
		expect(basicHandlerFunction(null)).toBe("\n");
	});

	it("Handles no command", function() {
		expect(basicHandlerFunction({})).toBe("\n");
	});
});

describe("System command handler", function() {
	it("Handles valid input", function() {
		var command = {
			data: "Test",
			handler: function(data) {
				return data;
			}
		};

		expect(systemHandlerFunction(command)).toBe("Test");
	});

	it("Handles null input", function() {
		expect(systemHandlerFunction(null)).toBe("");
	});

	it("Handles no handle but data", function() {
		expect(systemHandlerFunction({data: "Test"})).toBe("Test");
	});

	it("Handles no handle and no data", function() {
		expect(systemHandlerFunction({})).toBe("");
	});
});

describe("Calculated command handler", function() {
	it("Handles valid input", function() {
		var command = {
			data: "Test",
			handler: function(data) {
				return data;
			}
		};

		expect(calculatedHandlerFunction(command)).toBe("\nTest");
	});

	it("Handles a null command", function() {
		expect(calculatedHandlerFunction(null)).toBe("\n");
	});

	it("Handles no handle but data", function() {
		expect(calculatedHandlerFunction({data: "Test"})).toBe("\nTest");
	});

	it("Handles undefined handler and no data", function() {
		expect(calculatedHandlerFunction({})).toBe("\n");
	});
});

describe("Calculated command handler", function() {
	beforeEach(function() {
		this.data = [
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
	});

	it("Returns back the sent data", function() {
		var command = {
			data: this.data,
			handlers: {
				organisation: function(value) {
					return value.organisation;
				},
				title: function(value) {
					return value.title;
				},
				date: function(value) {
					return value.date;
				}
			}
		};

		expect(arrayHandlerFunction(command, false)).toBe("\nOrganisation 1\tTitle 1\tDate 1\nOrganisation 2\tTitle 2\tDate 2");
	});

	it("Top returns back first row", function() {
		var command = {
			data: this.data,
			handlers: {
				organisation: function(value) {
					return value.organisation;
				},
				title: function(value) {
					return value.title;
				},
				date: function(value) {
					return value.date;
				}
			}
		};

		expect(arrayHandlerFunction(command, true)).toBe("Organisation 1\tTitle 1\tDate 1");
	});

	it("Returns nothing when there are no handlers", function() {
		var command = {
			data: this.data
		};

		expect(arrayHandlerFunction(command)).toBe("");
	});

	it("Returns nothing when there are no handlers", function() {
		var command = {
			data: this.data,
			handlers: {}
		};

		expect(arrayHandlerFunction(command)).toBe("");
	});

	it("Returns without any organisation", function() {
		var command = {
			data: this.data,
			handlers: {
				title: function(value) {
					return value.title;
				},
				date: function(value) {
					return value.date;
				}
			}
		};

		expect(arrayHandlerFunction(command)).toBe("\nTitle 1\tDate 1\nTitle 2\tDate 2");
	});

	it("Returns without any organisation with top", function() {
		var command = {
			data: this.data,
			handlers: {
				title: function(value) {
					return value.title;
				},
				date: function(value) {
					return value.date;
				}
			}
		};

		expect(arrayHandlerFunction(command, true)).toBe("Title 1\tDate 1");
	});

	it("Returns without any title", function() {
		var command = {
			data: this.data,
			handlers: {
				organisation: function(value) {
					return value.organisation;
				},
				date: function(value) {
					return value.date;
				}
			}
		};

		expect(arrayHandlerFunction(command)).toBe("\nOrganisation 1\tDate 1\nOrganisation 2\tDate 2");
	});

	it("Returns without any title with top", function() {
		var command = {
			data: this.data,
			handlers: {
				organisation: function(value) {
					return value.organisation;
				},
				date: function(value) {
					return value.date;
				}
			}
		};

		expect(arrayHandlerFunction(command, true)).toBe("Organisation 1\tDate 1");
	});

	it("Returns without any date", function() {
		var command = {
			data: this.data,
			handlers: {
				title: function(value) {
					return value.title;
				},
				organisation: function(value) {
					return value.organisation;
				}
			}
		};

		expect(arrayHandlerFunction(command), "\nOrganisation 1\tTitle 1\nOrganisation 2\tTitle 2");
	});

	it("Returns without any date with top", function() {
		var command = {
			data: this.data,
			handlers: {
				organisation: function(value) {
					return value.organisation;
				},
				title: function(value) {
					return value.title;
				}
			}
		};

		expect(arrayHandlerFunction(command, true)).toBe("Organisation 1\tTitle 1");
	});

	it("Returns with only date", function() {
		var command = {
			data: this.data,
			handlers: {
				date: function(value) {
					return value.date;
				}
			}
		};

		expect(arrayHandlerFunction(command)).toBe("\nDate 1\nDate 2");
	});

	it("Returns with only date with top", function() {
		var command = {
			data: this.data,
			handlers: {
				date: function(value) {
					return value.date;
				}
			}
		};

		expect(arrayHandlerFunction(command, true)).toBe("Date 1");
	});

	it("Returns with only organisation", function() {
		var command = {
			data: this.data,
			handlers: {
				organisation: function(value) {
					return value.organisation;
				}
			}
		};

		expect(arrayHandlerFunction(command)).toBe("\nOrganisation 1\nOrganisation 2");
	});

	it("Returns with only organisation with top", function() {
		var command = {
			data: this.data,
			handlers: {
				organisation: function(value) {
					return value.organisation;
				}
			}
		};

		expect(arrayHandlerFunction(command, true)).toBe("Organisation 1");
	});

	it("Returns with only title", function() {
		var command = {
			data: this.data,
			handlers: {
				title: function(value) {
					return value.title;
				}
			}
		};

		expect(arrayHandlerFunction(command)).toBe("\nTitle 1\nTitle 2");
	});

	it("Returns with only title with top", function() {
		var command = {
			data: this.data,
			handlers: {
				title: function(value) {
					return value.title;
				}
			}
		};

		expect(arrayHandlerFunction(command, true)).toBe("Title 1");
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

describe("Github Uri generator", function() {
	it("Produces a valid URI", function() {
		expect(getGithubUri("test")).toBe("https://api.github.com/users/test/repos");
	});

	it("Handles a blank string", function() {
		expect(getGithubUri("")).toBe("");
	});

	it("Handles null", function() {
		expect(getGithubUri(null)).toBe("");
	});

	it("Handles undefined", function() {
		expect(getGithubUri()).toBe("");
	});
});

describe("Github filtering and formatting", function() {
	beforeEach(function() {
		// jscs:disable maximumLineLength
		this.response = [
		{
			"id": 12196274,
			"name": "HelloWorld",
			"full_name": "test/HelloWorld",
			"owner": {
				"login": "test",
				"id": 383316,
				"avatar_url": "https://avatars.githubusercontent.com/u/383316?v=3",
				"gravatar_id": "",
				"url": "https://api.github.com/users/test",
				"html_url": "https://github.com/test",
				"followers_url": "https://api.github.com/users/test/followers",
				"following_url": "https://api.github.com/users/test/following{/other_user}",
				"gists_url": "https://api.github.com/users/test/gists{/gist_id}",
				"starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
				"subscriptions_url": "https://api.github.com/users/test/subscriptions",
				"organizations_url": "https://api.github.com/users/test/orgs",
				"repos_url": "https://api.github.com/users/test/repos",
				"events_url": "https://api.github.com/users/test/events{/privacy}",
				"received_events_url": "https://api.github.com/users/test/received_events",
				"type": "User",
				"site_admin": false
			},
			"private": false,
			"html_url": "https://github.com/test/HelloWorld",
			"description": "Create hello world",
			"fork": false,
			"url": "https://api.github.com/repos/test/HelloWorld",
			"forks_url": "https://api.github.com/repos/test/HelloWorld/forks",
			"keys_url": "https://api.github.com/repos/test/HelloWorld/keys{/key_id}",
			"collaborators_url": "https://api.github.com/repos/test/HelloWorld/collaborators{/collaborator}",
			"teams_url": "https://api.github.com/repos/test/HelloWorld/teams",
			"hooks_url": "https://api.github.com/repos/test/HelloWorld/hooks",
			"issue_events_url": "https://api.github.com/repos/test/HelloWorld/issues/events{/number}",
			"events_url": "https://api.github.com/repos/test/HelloWorld/events",
			"assignees_url": "https://api.github.com/repos/test/HelloWorld/assignees{/user}",
			"branches_url": "https://api.github.com/repos/test/HelloWorld/branches{/branch}",
			"tags_url": "https://api.github.com/repos/test/HelloWorld/tags",
			"blobs_url": "https://api.github.com/repos/test/HelloWorld/git/blobs{/sha}",
			"git_tags_url": "https://api.github.com/repos/test/HelloWorld/git/tags{/sha}",
			"git_refs_url": "https://api.github.com/repos/test/HelloWorld/git/refs{/sha}",
			"trees_url": "https://api.github.com/repos/test/HelloWorld/git/trees{/sha}",
			"statuses_url": "https://api.github.com/repos/test/HelloWorld/statuses/{sha}",
			"languages_url": "https://api.github.com/repos/test/HelloWorld/languages",
			"stargazers_url": "https://api.github.com/repos/test/HelloWorld/stargazers",
			"contributors_url": "https://api.github.com/repos/test/HelloWorld/contributors",
			"subscribers_url": "https://api.github.com/repos/test/HelloWorld/subscribers",
			"subscription_url": "https://api.github.com/repos/test/HelloWorld/subscription",
			"commits_url": "https://api.github.com/repos/test/HelloWorld/commits{/sha}",
			"git_commits_url": "https://api.github.com/repos/test/HelloWorld/git/commits{/sha}",
			"comments_url": "https://api.github.com/repos/test/HelloWorld/comments{/number}",
			"issue_comment_url": "https://api.github.com/repos/test/HelloWorld/issues/comments{/number}",
			"contents_url": "https://api.github.com/repos/test/HelloWorld/contents/{+path}",
			"compare_url": "https://api.github.com/repos/test/HelloWorld/compare/{base}...{head}",
			"merges_url": "https://api.github.com/repos/test/HelloWorld/merges",
			"archive_url": "https://api.github.com/repos/test/HelloWorld/{archive_format}{/ref}",
			"downloads_url": "https://api.github.com/repos/test/HelloWorld/downloads",
			"issues_url": "https://api.github.com/repos/test/HelloWorld/issues{/number}",
			"pulls_url": "https://api.github.com/repos/test/HelloWorld/pulls{/number}",
			"milestones_url": "https://api.github.com/repos/test/HelloWorld/milestones{/number}",
			"notifications_url": "https://api.github.com/repos/test/HelloWorld/notifications{?since,all,participating}",
			"labels_url": "https://api.github.com/repos/test/HelloWorld/labels{/name}",
			"releases_url": "https://api.github.com/repos/test/HelloWorld/releases{/id}",
			"deployments_url": "https://api.github.com/repos/test/HelloWorld/deployments",
			"created_at": "2013-08-18T14:16:21Z",
			"updated_at": "2016-12-06T10:55:24Z",
			"pushed_at": "2013-08-18T14:42:31Z",
			"git_url": "git://github.com/test/HelloWorld.git",
			"ssh_url": "git@github.com:test/HelloWorld.git",
			"clone_url": "https://github.com/test/HelloWorld.git",
			"svn_url": "https://github.com/test/HelloWorld",
			"homepage": null,
			"size": 136,
			"stargazers_count": 0,
			"watchers_count": 0,
			"language": null,
			"has_issues": true,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 9,
			"mirror_url": null,
			"open_issues_count": 1,
			"forks": 9,
			"open_issues": 1,
			"watchers": 0,
			"default_branch": "master"
		},
		{
			"id": 9872654,
			"name": "rokehan",
			"full_name": "test/rokehan",
			"owner": {
				"login": "test",
				"id": 383316,
				"avatar_url": "https://avatars.githubusercontent.com/u/383316?v=3",
				"gravatar_id": "",
				"url": "https://api.github.com/users/test",
				"html_url": "https://github.com/test",
				"followers_url": "https://api.github.com/users/test/followers",
				"following_url": "https://api.github.com/users/test/following{/other_user}",
				"gists_url": "https://api.github.com/users/test/gists{/gist_id}",
				"starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
				"subscriptions_url": "https://api.github.com/users/test/subscriptions",
				"organizations_url": "https://api.github.com/users/test/orgs",
				"repos_url": "https://api.github.com/users/test/repos",
				"events_url": "https://api.github.com/users/test/events{/privacy}",
				"received_events_url": "https://api.github.com/users/test/received_events",
				"type": "User",
				"site_admin": false
			},
			"private": false,
			"html_url": "https://github.com/test/rokehan",
			"description": null,
			"fork": false,
			"url": "https://api.github.com/repos/test/rokehan",
			"forks_url": "https://api.github.com/repos/test/rokehan/forks",
			"keys_url": "https://api.github.com/repos/test/rokehan/keys{/key_id}",
			"collaborators_url": "https://api.github.com/repos/test/rokehan/collaborators{/collaborator}",
			"teams_url": "https://api.github.com/repos/test/rokehan/teams",
			"hooks_url": "https://api.github.com/repos/test/rokehan/hooks",
			"issue_events_url": "https://api.github.com/repos/test/rokehan/issues/events{/number}",
			"events_url": "https://api.github.com/repos/test/rokehan/events",
			"assignees_url": "https://api.github.com/repos/test/rokehan/assignees{/user}",
			"branches_url": "https://api.github.com/repos/test/rokehan/branches{/branch}",
			"tags_url": "https://api.github.com/repos/test/rokehan/tags",
			"blobs_url": "https://api.github.com/repos/test/rokehan/git/blobs{/sha}",
			"git_tags_url": "https://api.github.com/repos/test/rokehan/git/tags{/sha}",
			"git_refs_url": "https://api.github.com/repos/test/rokehan/git/refs{/sha}",
			"trees_url": "https://api.github.com/repos/test/rokehan/git/trees{/sha}",
			"statuses_url": "https://api.github.com/repos/test/rokehan/statuses/{sha}",
			"languages_url": "https://api.github.com/repos/test/rokehan/languages",
			"stargazers_url": "https://api.github.com/repos/test/rokehan/stargazers",
			"contributors_url": "https://api.github.com/repos/test/rokehan/contributors",
			"subscribers_url": "https://api.github.com/repos/test/rokehan/subscribers",
			"subscription_url": "https://api.github.com/repos/test/rokehan/subscription",
			"commits_url": "https://api.github.com/repos/test/rokehan/commits{/sha}",
			"git_commits_url": "https://api.github.com/repos/test/rokehan/git/commits{/sha}",
			"comments_url": "https://api.github.com/repos/test/rokehan/comments{/number}",
			"issue_comment_url": "https://api.github.com/repos/test/rokehan/issues/comments{/number}",
			"contents_url": "https://api.github.com/repos/test/rokehan/contents/{+path}",
			"compare_url": "https://api.github.com/repos/test/rokehan/compare/{base}...{head}",
			"merges_url": "https://api.github.com/repos/test/rokehan/merges",
			"archive_url": "https://api.github.com/repos/test/rokehan/{archive_format}{/ref}",
			"downloads_url": "https://api.github.com/repos/test/rokehan/downloads",
			"issues_url": "https://api.github.com/repos/test/rokehan/issues{/number}",
			"pulls_url": "https://api.github.com/repos/test/rokehan/pulls{/number}",
			"milestones_url": "https://api.github.com/repos/test/rokehan/milestones{/number}",
			"notifications_url": "https://api.github.com/repos/test/rokehan/notifications{?since,all,participating}",
			"labels_url": "https://api.github.com/repos/test/rokehan/labels{/name}",
			"releases_url": "https://api.github.com/repos/test/rokehan/releases{/id}",
			"deployments_url": "https://api.github.com/repos/test/rokehan/deployments",
			"created_at": "2013-05-05T18:29:26Z",
			"updated_at": "2013-12-16T14:22:43Z",
			"pushed_at": "2013-05-20T13:41:08Z",
			"git_url": "git://github.com/test/rokehan.git",
			"ssh_url": "git@github.com:test/rokehan.git",
			"clone_url": "https://github.com/test/rokehan.git",
			"svn_url": "https://github.com/test/rokehan",
			"homepage": null,
			"size": 9035,
			"stargazers_count": 0,
			"watchers_count": 0,
			"language": "PHP",
			"has_issues": true,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 1,
			"mirror_url": null,
			"open_issues_count": 0,
			"forks": 1,
			"open_issues": 0,
			"watchers": 0,
			"default_branch": "master"
		},
		{
			"id": 11883972,
			"name": "SDWebImage",
			"full_name": "test/SDWebImage",
			"owner": {
				"login": "test",
				"id": 383316,
				"avatar_url": "https://avatars.githubusercontent.com/u/383316?v=3",
				"gravatar_id": "",
				"url": "https://api.github.com/users/test",
				"html_url": "https://github.com/test",
				"followers_url": "https://api.github.com/users/test/followers",
				"following_url": "https://api.github.com/users/test/following{/other_user}",
				"gists_url": "https://api.github.com/users/test/gists{/gist_id}",
				"starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
				"subscriptions_url": "https://api.github.com/users/test/subscriptions",
				"organizations_url": "https://api.github.com/users/test/orgs",
				"repos_url": "https://api.github.com/users/test/repos",
				"events_url": "https://api.github.com/users/test/events{/privacy}",
				"received_events_url": "https://api.github.com/users/test/received_events",
				"type": "User",
				"site_admin": false
			},
			"private": false,
			"html_url": "https://github.com/test/SDWebImage",
			"description": "Asynchronous image downloader with cache support with an UIImageView category",
			"fork": true,
			"url": "https://api.github.com/repos/test/SDWebImage",
			"forks_url": "https://api.github.com/repos/test/SDWebImage/forks",
			"keys_url": "https://api.github.com/repos/test/SDWebImage/keys{/key_id}",
			"collaborators_url": "https://api.github.com/repos/test/SDWebImage/collaborators{/collaborator}",
			"teams_url": "https://api.github.com/repos/test/SDWebImage/teams",
			"hooks_url": "https://api.github.com/repos/test/SDWebImage/hooks",
			"issue_events_url": "https://api.github.com/repos/test/SDWebImage/issues/events{/number}",
			"events_url": "https://api.github.com/repos/test/SDWebImage/events",
			"assignees_url": "https://api.github.com/repos/test/SDWebImage/assignees{/user}",
			"branches_url": "https://api.github.com/repos/test/SDWebImage/branches{/branch}",
			"tags_url": "https://api.github.com/repos/test/SDWebImage/tags",
			"blobs_url": "https://api.github.com/repos/test/SDWebImage/git/blobs{/sha}",
			"git_tags_url": "https://api.github.com/repos/test/SDWebImage/git/tags{/sha}",
			"git_refs_url": "https://api.github.com/repos/test/SDWebImage/git/refs{/sha}",
			"trees_url": "https://api.github.com/repos/test/SDWebImage/git/trees{/sha}",
			"statuses_url": "https://api.github.com/repos/test/SDWebImage/statuses/{sha}",
			"languages_url": "https://api.github.com/repos/test/SDWebImage/languages",
			"stargazers_url": "https://api.github.com/repos/test/SDWebImage/stargazers",
			"contributors_url": "https://api.github.com/repos/test/SDWebImage/contributors",
			"subscribers_url": "https://api.github.com/repos/test/SDWebImage/subscribers",
			"subscription_url": "https://api.github.com/repos/test/SDWebImage/subscription",
			"commits_url": "https://api.github.com/repos/test/SDWebImage/commits{/sha}",
			"git_commits_url": "https://api.github.com/repos/test/SDWebImage/git/commits{/sha}",
			"comments_url": "https://api.github.com/repos/test/SDWebImage/comments{/number}",
			"issue_comment_url": "https://api.github.com/repos/test/SDWebImage/issues/comments{/number}",
			"contents_url": "https://api.github.com/repos/test/SDWebImage/contents/{+path}",
			"compare_url": "https://api.github.com/repos/test/SDWebImage/compare/{base}...{head}",
			"merges_url": "https://api.github.com/repos/test/SDWebImage/merges",
			"archive_url": "https://api.github.com/repos/test/SDWebImage/{archive_format}{/ref}",
			"downloads_url": "https://api.github.com/repos/test/SDWebImage/downloads",
			"issues_url": "https://api.github.com/repos/test/SDWebImage/issues{/number}",
			"pulls_url": "https://api.github.com/repos/test/SDWebImage/pulls{/number}",
			"milestones_url": "https://api.github.com/repos/test/SDWebImage/milestones{/number}",
			"notifications_url": "https://api.github.com/repos/test/SDWebImage/notifications{?since,all,participating}",
			"labels_url": "https://api.github.com/repos/test/SDWebImage/labels{/name}",
			"releases_url": "https://api.github.com/repos/test/SDWebImage/releases{/id}",
			"deployments_url": "https://api.github.com/repos/test/SDWebImage/deployments",
			"created_at": "2013-08-04T19:48:19Z",
			"updated_at": "2015-11-10T04:47:08Z",
			"pushed_at": "2013-07-31T20:55:32Z",
			"git_url": "git://github.com/test/SDWebImage.git",
			"ssh_url": "git@github.com:test/SDWebImage.git",
			"clone_url": "https://github.com/test/SDWebImage.git",
			"svn_url": "https://github.com/test/SDWebImage",
			"homepage": "http://hackemist.com/SDWebImage/doc",
			"size": 3379,
			"stargazers_count": 1,
			"watchers_count": 1,
			"language": "Objective-C",
			"has_issues": false,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 2,
			"mirror_url": null,
			"open_issues_count": 0,
			"forks": 2,
			"open_issues": 0,
			"watchers": 1,
			"default_branch": "master"
		},
		{
			"id": 1116383,
			"name": "sNews",
			"full_name": "test/sNews",
			"owner": {
				"login": "test",
				"id": 383316,
				"avatar_url": "https://avatars.githubusercontent.com/u/383316?v=3",
				"gravatar_id": "",
				"url": "https://api.github.com/users/test",
				"html_url": "https://github.com/test",
				"followers_url": "https://api.github.com/users/test/followers",
				"following_url": "https://api.github.com/users/test/following{/other_user}",
				"gists_url": "https://api.github.com/users/test/gists{/gist_id}",
				"starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
				"subscriptions_url": "https://api.github.com/users/test/subscriptions",
				"organizations_url": "https://api.github.com/users/test/orgs",
				"repos_url": "https://api.github.com/users/test/repos",
				"events_url": "https://api.github.com/users/test/events{/privacy}",
				"received_events_url": "https://api.github.com/users/test/received_events",
				"type": "User",
				"site_admin": false
			},
			"private": false,
			"html_url": "https://github.com/test/sNews",
			"description": null,
			"fork": false,
			"url": "https://api.github.com/repos/test/sNews",
			"forks_url": "https://api.github.com/repos/test/sNews/forks",
			"keys_url": "https://api.github.com/repos/test/sNews/keys{/key_id}",
			"collaborators_url": "https://api.github.com/repos/test/sNews/collaborators{/collaborator}",
			"teams_url": "https://api.github.com/repos/test/sNews/teams",
			"hooks_url": "https://api.github.com/repos/test/sNews/hooks",
			"issue_events_url": "https://api.github.com/repos/test/sNews/issues/events{/number}",
			"events_url": "https://api.github.com/repos/test/sNews/events",
			"assignees_url": "https://api.github.com/repos/test/sNews/assignees{/user}",
			"branches_url": "https://api.github.com/repos/test/sNews/branches{/branch}",
			"tags_url": "https://api.github.com/repos/test/sNews/tags",
			"blobs_url": "https://api.github.com/repos/test/sNews/git/blobs{/sha}",
			"git_tags_url": "https://api.github.com/repos/test/sNews/git/tags{/sha}",
			"git_refs_url": "https://api.github.com/repos/test/sNews/git/refs{/sha}",
			"trees_url": "https://api.github.com/repos/test/sNews/git/trees{/sha}",
			"statuses_url": "https://api.github.com/repos/test/sNews/statuses/{sha}",
			"languages_url": "https://api.github.com/repos/test/sNews/languages",
			"stargazers_url": "https://api.github.com/repos/test/sNews/stargazers",
			"contributors_url": "https://api.github.com/repos/test/sNews/contributors",
			"subscribers_url": "https://api.github.com/repos/test/sNews/subscribers",
			"subscription_url": "https://api.github.com/repos/test/sNews/subscription",
			"commits_url": "https://api.github.com/repos/test/sNews/commits{/sha}",
			"git_commits_url": "https://api.github.com/repos/test/sNews/git/commits{/sha}",
			"comments_url": "https://api.github.com/repos/test/sNews/comments{/number}",
			"issue_comment_url": "https://api.github.com/repos/test/sNews/issues/comments{/number}",
			"contents_url": "https://api.github.com/repos/test/sNews/contents/{+path}",
			"compare_url": "https://api.github.com/repos/test/sNews/compare/{base}...{head}",
			"merges_url": "https://api.github.com/repos/test/sNews/merges",
			"archive_url": "https://api.github.com/repos/test/sNews/{archive_format}{/ref}",
			"downloads_url": "https://api.github.com/repos/test/sNews/downloads",
			"issues_url": "https://api.github.com/repos/test/sNews/issues{/number}",
			"pulls_url": "https://api.github.com/repos/test/sNews/pulls{/number}",
			"milestones_url": "https://api.github.com/repos/test/sNews/milestones{/number}",
			"notifications_url": "https://api.github.com/repos/test/sNews/notifications{?since,all,participating}",
			"labels_url": "https://api.github.com/repos/test/sNews/labels{/name}",
			"releases_url": "https://api.github.com/repos/test/sNews/releases{/id}",
			"deployments_url": "https://api.github.com/repos/test/sNews/deployments",
			"created_at": "2010-11-27T07:02:22Z",
			"updated_at": "2013-08-18T15:55:36Z",
			"pushed_at": null,
			"git_url": "git://github.com/test/sNews.git",
			"ssh_url": "git@github.com:test/sNews.git",
			"clone_url": "https://github.com/test/sNews.git",
			"svn_url": "https://github.com/test/sNews",
			"homepage": "http://www.snewscms.com/",
			"size": 48,
			"stargazers_count": 1,
			"watchers_count": 1,
			"language": null,
			"has_issues": true,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 0,
			"mirror_url": null,
			"open_issues_count": 0,
			"forks": 0,
			"open_issues": 0,
			"watchers": 1,
			"default_branch": "master"
		},
		{
			"id": 11322620,
			"name": "Test--01",
			"full_name": "test/Test--01",
			"owner": {
				"login": "test",
				"id": 383316,
				"avatar_url": "https://avatars.githubusercontent.com/u/383316?v=3",
				"gravatar_id": "",
				"url": "https://api.github.com/users/test",
				"html_url": "https://github.com/test",
				"followers_url": "https://api.github.com/users/test/followers",
				"following_url": "https://api.github.com/users/test/following{/other_user}",
				"gists_url": "https://api.github.com/users/test/gists{/gist_id}",
				"starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
				"subscriptions_url": "https://api.github.com/users/test/subscriptions",
				"organizations_url": "https://api.github.com/users/test/orgs",
				"repos_url": "https://api.github.com/users/test/repos",
				"events_url": "https://api.github.com/users/test/events{/privacy}",
				"received_events_url": "https://api.github.com/users/test/received_events",
				"type": "User",
				"site_admin": false
			},
			"private": false,
			"html_url": "https://github.com/test/Test--01",
			"description": null,
			"fork": false,
			"url": "https://api.github.com/repos/test/Test--01",
			"forks_url": "https://api.github.com/repos/test/Test--01/forks",
			"keys_url": "https://api.github.com/repos/test/Test--01/keys{/key_id}",
			"collaborators_url": "https://api.github.com/repos/test/Test--01/collaborators{/collaborator}",
			"teams_url": "https://api.github.com/repos/test/Test--01/teams",
			"hooks_url": "https://api.github.com/repos/test/Test--01/hooks",
			"issue_events_url": "https://api.github.com/repos/test/Test--01/issues/events{/number}",
			"events_url": "https://api.github.com/repos/test/Test--01/events",
			"assignees_url": "https://api.github.com/repos/test/Test--01/assignees{/user}",
			"branches_url": "https://api.github.com/repos/test/Test--01/branches{/branch}",
			"tags_url": "https://api.github.com/repos/test/Test--01/tags",
			"blobs_url": "https://api.github.com/repos/test/Test--01/git/blobs{/sha}",
			"git_tags_url": "https://api.github.com/repos/test/Test--01/git/tags{/sha}",
			"git_refs_url": "https://api.github.com/repos/test/Test--01/git/refs{/sha}",
			"trees_url": "https://api.github.com/repos/test/Test--01/git/trees{/sha}",
			"statuses_url": "https://api.github.com/repos/test/Test--01/statuses/{sha}",
			"languages_url": "https://api.github.com/repos/test/Test--01/languages",
			"stargazers_url": "https://api.github.com/repos/test/Test--01/stargazers",
			"contributors_url": "https://api.github.com/repos/test/Test--01/contributors",
			"subscribers_url": "https://api.github.com/repos/test/Test--01/subscribers",
			"subscription_url": "https://api.github.com/repos/test/Test--01/subscription",
			"commits_url": "https://api.github.com/repos/test/Test--01/commits{/sha}",
			"git_commits_url": "https://api.github.com/repos/test/Test--01/git/commits{/sha}",
			"comments_url": "https://api.github.com/repos/test/Test--01/comments{/number}",
			"issue_comment_url": "https://api.github.com/repos/test/Test--01/issues/comments{/number}",
			"contents_url": "https://api.github.com/repos/test/Test--01/contents/{+path}",
			"compare_url": "https://api.github.com/repos/test/Test--01/compare/{base}...{head}",
			"merges_url": "https://api.github.com/repos/test/Test--01/merges",
			"archive_url": "https://api.github.com/repos/test/Test--01/{archive_format}{/ref}",
			"downloads_url": "https://api.github.com/repos/test/Test--01/downloads",
			"issues_url": "https://api.github.com/repos/test/Test--01/issues{/number}",
			"pulls_url": "https://api.github.com/repos/test/Test--01/pulls{/number}",
			"milestones_url": "https://api.github.com/repos/test/Test--01/milestones{/number}",
			"notifications_url": "https://api.github.com/repos/test/Test--01/notifications{?since,all,participating}",
			"labels_url": "https://api.github.com/repos/test/Test--01/labels{/name}",
			"releases_url": "https://api.github.com/repos/test/Test--01/releases{/id}",
			"deployments_url": "https://api.github.com/repos/test/Test--01/deployments",
			"created_at": "2013-07-10T19:58:05Z",
			"updated_at": "2014-03-03T12:54:34Z",
			"pushed_at": "2013-07-19T09:03:22Z",
			"git_url": "git://github.com/test/Test--01.git",
			"ssh_url": "git@github.com:test/Test--01.git",
			"clone_url": "https://github.com/test/Test--01.git",
			"svn_url": "https://github.com/test/Test--01",
			"homepage": null,
			"size": 120,
			"stargazers_count": 0,
			"watchers_count": 0,
			"language": "Matlab",
			"has_issues": true,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 0,
			"mirror_url": null,
			"open_issues_count": 0,
			"forks": 0,
			"open_issues": 0,
			"watchers": 0,
			"default_branch": "master"
		}
		];
		// jscs:enable maximumLineLength
	});

it("Without forks", function() {
	expect(filterGithubFork(this.response, "test.github.com", false).length).toBe(4);
});

it("With forks", function() {
	expect(filterGithubFork(this.response, "test.github.com", true).length).toBe(5);
});

it("Formatting first item", function() {
	expect(formatGithub(this.response[0], true)).toBe("[[b;green;#000]HelloWorld] - Create hello world");
});

it("Formatting other items", function() {
	expect(formatGithub(this.response[0], false)).toBe("\n[[b;green;#000]HelloWorld] - Create hello world");
});

it("Formatting empty string", function() {
	expect(formatGithub("", true)).toBe("");
});

it("Formatting null item", function() {
	expect(formatGithub(null, true)).toBe("");
});

it("Formatting empty item", function() {
	expect(formatGithub({}, true)).toBe("");
});
});

describe("", function() {
	beforeEach(function() {
		// jscs:disable maximumLineLength
		this.response = [
		{
			"id": 12196274,
			"name": "HelloWorld",
			"full_name": "test/HelloWorld",
			"owner": {
				"login": "test",
				"id": 383316,
				"avatar_url": "https://avatars.githubusercontent.com/u/383316?v=3",
				"gravatar_id": "",
				"url": "https://api.github.com/users/test",
				"html_url": "https://github.com/test",
				"followers_url": "https://api.github.com/users/test/followers",
				"following_url": "https://api.github.com/users/test/following{/other_user}",
				"gists_url": "https://api.github.com/users/test/gists{/gist_id}",
				"starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
				"subscriptions_url": "https://api.github.com/users/test/subscriptions",
				"organizations_url": "https://api.github.com/users/test/orgs",
				"repos_url": "https://api.github.com/users/test/repos",
				"events_url": "https://api.github.com/users/test/events{/privacy}",
				"received_events_url": "https://api.github.com/users/test/received_events",
				"type": "User",
				"site_admin": false
			},
			"private": false,
			"html_url": "https://github.com/test/HelloWorld",
			"description": "Create hello world",
			"fork": false,
			"url": "https://api.github.com/repos/test/HelloWorld",
			"forks_url": "https://api.github.com/repos/test/HelloWorld/forks",
			"keys_url": "https://api.github.com/repos/test/HelloWorld/keys{/key_id}",
			"collaborators_url": "https://api.github.com/repos/test/HelloWorld/collaborators{/collaborator}",
			"teams_url": "https://api.github.com/repos/test/HelloWorld/teams",
			"hooks_url": "https://api.github.com/repos/test/HelloWorld/hooks",
			"issue_events_url": "https://api.github.com/repos/test/HelloWorld/issues/events{/number}",
			"events_url": "https://api.github.com/repos/test/HelloWorld/events",
			"assignees_url": "https://api.github.com/repos/test/HelloWorld/assignees{/user}",
			"branches_url": "https://api.github.com/repos/test/HelloWorld/branches{/branch}",
			"tags_url": "https://api.github.com/repos/test/HelloWorld/tags",
			"blobs_url": "https://api.github.com/repos/test/HelloWorld/git/blobs{/sha}",
			"git_tags_url": "https://api.github.com/repos/test/HelloWorld/git/tags{/sha}",
			"git_refs_url": "https://api.github.com/repos/test/HelloWorld/git/refs{/sha}",
			"trees_url": "https://api.github.com/repos/test/HelloWorld/git/trees{/sha}",
			"statuses_url": "https://api.github.com/repos/test/HelloWorld/statuses/{sha}",
			"languages_url": "https://api.github.com/repos/test/HelloWorld/languages",
			"stargazers_url": "https://api.github.com/repos/test/HelloWorld/stargazers",
			"contributors_url": "https://api.github.com/repos/test/HelloWorld/contributors",
			"subscribers_url": "https://api.github.com/repos/test/HelloWorld/subscribers",
			"subscription_url": "https://api.github.com/repos/test/HelloWorld/subscription",
			"commits_url": "https://api.github.com/repos/test/HelloWorld/commits{/sha}",
			"git_commits_url": "https://api.github.com/repos/test/HelloWorld/git/commits{/sha}",
			"comments_url": "https://api.github.com/repos/test/HelloWorld/comments{/number}",
			"issue_comment_url": "https://api.github.com/repos/test/HelloWorld/issues/comments{/number}",
			"contents_url": "https://api.github.com/repos/test/HelloWorld/contents/{+path}",
			"compare_url": "https://api.github.com/repos/test/HelloWorld/compare/{base}...{head}",
			"merges_url": "https://api.github.com/repos/test/HelloWorld/merges",
			"archive_url": "https://api.github.com/repos/test/HelloWorld/{archive_format}{/ref}",
			"downloads_url": "https://api.github.com/repos/test/HelloWorld/downloads",
			"issues_url": "https://api.github.com/repos/test/HelloWorld/issues{/number}",
			"pulls_url": "https://api.github.com/repos/test/HelloWorld/pulls{/number}",
			"milestones_url": "https://api.github.com/repos/test/HelloWorld/milestones{/number}",
			"notifications_url": "https://api.github.com/repos/test/HelloWorld/notifications{?since,all,participating}",
			"labels_url": "https://api.github.com/repos/test/HelloWorld/labels{/name}",
			"releases_url": "https://api.github.com/repos/test/HelloWorld/releases{/id}",
			"deployments_url": "https://api.github.com/repos/test/HelloWorld/deployments",
			"created_at": "2013-08-18T14:16:21Z",
			"updated_at": "2016-12-06T10:55:24Z",
			"pushed_at": "2013-08-18T14:42:31Z",
			"git_url": "git://github.com/test/HelloWorld.git",
			"ssh_url": "git@github.com:test/HelloWorld.git",
			"clone_url": "https://github.com/test/HelloWorld.git",
			"svn_url": "https://github.com/test/HelloWorld",
			"homepage": null,
			"size": 136,
			"stargazers_count": 0,
			"watchers_count": 0,
			"language": null,
			"has_issues": true,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 9,
			"mirror_url": null,
			"open_issues_count": 1,
			"forks": 9,
			"open_issues": 1,
			"watchers": 0,
			"default_branch": "master"
		},
		{
			"id": 9872654,
			"name": "rokehan",
			"full_name": "test/rokehan",
			"owner": {
				"login": "test",
				"id": 383316,
				"avatar_url": "https://avatars.githubusercontent.com/u/383316?v=3",
				"gravatar_id": "",
				"url": "https://api.github.com/users/test",
				"html_url": "https://github.com/test",
				"followers_url": "https://api.github.com/users/test/followers",
				"following_url": "https://api.github.com/users/test/following{/other_user}",
				"gists_url": "https://api.github.com/users/test/gists{/gist_id}",
				"starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
				"subscriptions_url": "https://api.github.com/users/test/subscriptions",
				"organizations_url": "https://api.github.com/users/test/orgs",
				"repos_url": "https://api.github.com/users/test/repos",
				"events_url": "https://api.github.com/users/test/events{/privacy}",
				"received_events_url": "https://api.github.com/users/test/received_events",
				"type": "User",
				"site_admin": false
			},
			"private": false,
			"html_url": "https://github.com/test/rokehan",
			"description": null,
			"fork": false,
			"url": "https://api.github.com/repos/test/rokehan",
			"forks_url": "https://api.github.com/repos/test/rokehan/forks",
			"keys_url": "https://api.github.com/repos/test/rokehan/keys{/key_id}",
			"collaborators_url": "https://api.github.com/repos/test/rokehan/collaborators{/collaborator}",
			"teams_url": "https://api.github.com/repos/test/rokehan/teams",
			"hooks_url": "https://api.github.com/repos/test/rokehan/hooks",
			"issue_events_url": "https://api.github.com/repos/test/rokehan/issues/events{/number}",
			"events_url": "https://api.github.com/repos/test/rokehan/events",
			"assignees_url": "https://api.github.com/repos/test/rokehan/assignees{/user}",
			"branches_url": "https://api.github.com/repos/test/rokehan/branches{/branch}",
			"tags_url": "https://api.github.com/repos/test/rokehan/tags",
			"blobs_url": "https://api.github.com/repos/test/rokehan/git/blobs{/sha}",
			"git_tags_url": "https://api.github.com/repos/test/rokehan/git/tags{/sha}",
			"git_refs_url": "https://api.github.com/repos/test/rokehan/git/refs{/sha}",
			"trees_url": "https://api.github.com/repos/test/rokehan/git/trees{/sha}",
			"statuses_url": "https://api.github.com/repos/test/rokehan/statuses/{sha}",
			"languages_url": "https://api.github.com/repos/test/rokehan/languages",
			"stargazers_url": "https://api.github.com/repos/test/rokehan/stargazers",
			"contributors_url": "https://api.github.com/repos/test/rokehan/contributors",
			"subscribers_url": "https://api.github.com/repos/test/rokehan/subscribers",
			"subscription_url": "https://api.github.com/repos/test/rokehan/subscription",
			"commits_url": "https://api.github.com/repos/test/rokehan/commits{/sha}",
			"git_commits_url": "https://api.github.com/repos/test/rokehan/git/commits{/sha}",
			"comments_url": "https://api.github.com/repos/test/rokehan/comments{/number}",
			"issue_comment_url": "https://api.github.com/repos/test/rokehan/issues/comments{/number}",
			"contents_url": "https://api.github.com/repos/test/rokehan/contents/{+path}",
			"compare_url": "https://api.github.com/repos/test/rokehan/compare/{base}...{head}",
			"merges_url": "https://api.github.com/repos/test/rokehan/merges",
			"archive_url": "https://api.github.com/repos/test/rokehan/{archive_format}{/ref}",
			"downloads_url": "https://api.github.com/repos/test/rokehan/downloads",
			"issues_url": "https://api.github.com/repos/test/rokehan/issues{/number}",
			"pulls_url": "https://api.github.com/repos/test/rokehan/pulls{/number}",
			"milestones_url": "https://api.github.com/repos/test/rokehan/milestones{/number}",
			"notifications_url": "https://api.github.com/repos/test/rokehan/notifications{?since,all,participating}",
			"labels_url": "https://api.github.com/repos/test/rokehan/labels{/name}",
			"releases_url": "https://api.github.com/repos/test/rokehan/releases{/id}",
			"deployments_url": "https://api.github.com/repos/test/rokehan/deployments",
			"created_at": "2013-05-05T18:29:26Z",
			"updated_at": "2013-12-16T14:22:43Z",
			"pushed_at": "2013-05-20T13:41:08Z",
			"git_url": "git://github.com/test/rokehan.git",
			"ssh_url": "git@github.com:test/rokehan.git",
			"clone_url": "https://github.com/test/rokehan.git",
			"svn_url": "https://github.com/test/rokehan",
			"homepage": null,
			"size": 9035,
			"stargazers_count": 0,
			"watchers_count": 0,
			"language": "PHP",
			"has_issues": true,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 1,
			"mirror_url": null,
			"open_issues_count": 0,
			"forks": 1,
			"open_issues": 0,
			"watchers": 0,
			"default_branch": "master"
		},
		{
			"id": 11883972,
			"name": "SDWebImage",
			"full_name": "test/SDWebImage",
			"owner": {
				"login": "test",
				"id": 383316,
				"avatar_url": "https://avatars.githubusercontent.com/u/383316?v=3",
				"gravatar_id": "",
				"url": "https://api.github.com/users/test",
				"html_url": "https://github.com/test",
				"followers_url": "https://api.github.com/users/test/followers",
				"following_url": "https://api.github.com/users/test/following{/other_user}",
				"gists_url": "https://api.github.com/users/test/gists{/gist_id}",
				"starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
				"subscriptions_url": "https://api.github.com/users/test/subscriptions",
				"organizations_url": "https://api.github.com/users/test/orgs",
				"repos_url": "https://api.github.com/users/test/repos",
				"events_url": "https://api.github.com/users/test/events{/privacy}",
				"received_events_url": "https://api.github.com/users/test/received_events",
				"type": "User",
				"site_admin": false
			},
			"private": false,
			"html_url": "https://github.com/test/SDWebImage",
			"description": "Asynchronous image downloader with cache support with an UIImageView category",
			"fork": true,
			"url": "https://api.github.com/repos/test/SDWebImage",
			"forks_url": "https://api.github.com/repos/test/SDWebImage/forks",
			"keys_url": "https://api.github.com/repos/test/SDWebImage/keys{/key_id}",
			"collaborators_url": "https://api.github.com/repos/test/SDWebImage/collaborators{/collaborator}",
			"teams_url": "https://api.github.com/repos/test/SDWebImage/teams",
			"hooks_url": "https://api.github.com/repos/test/SDWebImage/hooks",
			"issue_events_url": "https://api.github.com/repos/test/SDWebImage/issues/events{/number}",
			"events_url": "https://api.github.com/repos/test/SDWebImage/events",
			"assignees_url": "https://api.github.com/repos/test/SDWebImage/assignees{/user}",
			"branches_url": "https://api.github.com/repos/test/SDWebImage/branches{/branch}",
			"tags_url": "https://api.github.com/repos/test/SDWebImage/tags",
			"blobs_url": "https://api.github.com/repos/test/SDWebImage/git/blobs{/sha}",
			"git_tags_url": "https://api.github.com/repos/test/SDWebImage/git/tags{/sha}",
			"git_refs_url": "https://api.github.com/repos/test/SDWebImage/git/refs{/sha}",
			"trees_url": "https://api.github.com/repos/test/SDWebImage/git/trees{/sha}",
			"statuses_url": "https://api.github.com/repos/test/SDWebImage/statuses/{sha}",
			"languages_url": "https://api.github.com/repos/test/SDWebImage/languages",
			"stargazers_url": "https://api.github.com/repos/test/SDWebImage/stargazers",
			"contributors_url": "https://api.github.com/repos/test/SDWebImage/contributors",
			"subscribers_url": "https://api.github.com/repos/test/SDWebImage/subscribers",
			"subscription_url": "https://api.github.com/repos/test/SDWebImage/subscription",
			"commits_url": "https://api.github.com/repos/test/SDWebImage/commits{/sha}",
			"git_commits_url": "https://api.github.com/repos/test/SDWebImage/git/commits{/sha}",
			"comments_url": "https://api.github.com/repos/test/SDWebImage/comments{/number}",
			"issue_comment_url": "https://api.github.com/repos/test/SDWebImage/issues/comments{/number}",
			"contents_url": "https://api.github.com/repos/test/SDWebImage/contents/{+path}",
			"compare_url": "https://api.github.com/repos/test/SDWebImage/compare/{base}...{head}",
			"merges_url": "https://api.github.com/repos/test/SDWebImage/merges",
			"archive_url": "https://api.github.com/repos/test/SDWebImage/{archive_format}{/ref}",
			"downloads_url": "https://api.github.com/repos/test/SDWebImage/downloads",
			"issues_url": "https://api.github.com/repos/test/SDWebImage/issues{/number}",
			"pulls_url": "https://api.github.com/repos/test/SDWebImage/pulls{/number}",
			"milestones_url": "https://api.github.com/repos/test/SDWebImage/milestones{/number}",
			"notifications_url": "https://api.github.com/repos/test/SDWebImage/notifications{?since,all,participating}",
			"labels_url": "https://api.github.com/repos/test/SDWebImage/labels{/name}",
			"releases_url": "https://api.github.com/repos/test/SDWebImage/releases{/id}",
			"deployments_url": "https://api.github.com/repos/test/SDWebImage/deployments",
			"created_at": "2013-08-04T19:48:19Z",
			"updated_at": "2015-11-10T04:47:08Z",
			"pushed_at": "2013-07-31T20:55:32Z",
			"git_url": "git://github.com/test/SDWebImage.git",
			"ssh_url": "git@github.com:test/SDWebImage.git",
			"clone_url": "https://github.com/test/SDWebImage.git",
			"svn_url": "https://github.com/test/SDWebImage",
			"homepage": "http://hackemist.com/SDWebImage/doc",
			"size": 3379,
			"stargazers_count": 1,
			"watchers_count": 1,
			"language": "Objective-C",
			"has_issues": false,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 2,
			"mirror_url": null,
			"open_issues_count": 0,
			"forks": 2,
			"open_issues": 0,
			"watchers": 1,
			"default_branch": "master"
		},
		{
			"id": 1116383,
			"name": "sNews",
			"full_name": "test/sNews",
			"owner": {
				"login": "test",
				"id": 383316,
				"avatar_url": "https://avatars.githubusercontent.com/u/383316?v=3",
				"gravatar_id": "",
				"url": "https://api.github.com/users/test",
				"html_url": "https://github.com/test",
				"followers_url": "https://api.github.com/users/test/followers",
				"following_url": "https://api.github.com/users/test/following{/other_user}",
				"gists_url": "https://api.github.com/users/test/gists{/gist_id}",
				"starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
				"subscriptions_url": "https://api.github.com/users/test/subscriptions",
				"organizations_url": "https://api.github.com/users/test/orgs",
				"repos_url": "https://api.github.com/users/test/repos",
				"events_url": "https://api.github.com/users/test/events{/privacy}",
				"received_events_url": "https://api.github.com/users/test/received_events",
				"type": "User",
				"site_admin": false
			},
			"private": false,
			"html_url": "https://github.com/test/sNews",
			"description": null,
			"fork": false,
			"url": "https://api.github.com/repos/test/sNews",
			"forks_url": "https://api.github.com/repos/test/sNews/forks",
			"keys_url": "https://api.github.com/repos/test/sNews/keys{/key_id}",
			"collaborators_url": "https://api.github.com/repos/test/sNews/collaborators{/collaborator}",
			"teams_url": "https://api.github.com/repos/test/sNews/teams",
			"hooks_url": "https://api.github.com/repos/test/sNews/hooks",
			"issue_events_url": "https://api.github.com/repos/test/sNews/issues/events{/number}",
			"events_url": "https://api.github.com/repos/test/sNews/events",
			"assignees_url": "https://api.github.com/repos/test/sNews/assignees{/user}",
			"branches_url": "https://api.github.com/repos/test/sNews/branches{/branch}",
			"tags_url": "https://api.github.com/repos/test/sNews/tags",
			"blobs_url": "https://api.github.com/repos/test/sNews/git/blobs{/sha}",
			"git_tags_url": "https://api.github.com/repos/test/sNews/git/tags{/sha}",
			"git_refs_url": "https://api.github.com/repos/test/sNews/git/refs{/sha}",
			"trees_url": "https://api.github.com/repos/test/sNews/git/trees{/sha}",
			"statuses_url": "https://api.github.com/repos/test/sNews/statuses/{sha}",
			"languages_url": "https://api.github.com/repos/test/sNews/languages",
			"stargazers_url": "https://api.github.com/repos/test/sNews/stargazers",
			"contributors_url": "https://api.github.com/repos/test/sNews/contributors",
			"subscribers_url": "https://api.github.com/repos/test/sNews/subscribers",
			"subscription_url": "https://api.github.com/repos/test/sNews/subscription",
			"commits_url": "https://api.github.com/repos/test/sNews/commits{/sha}",
			"git_commits_url": "https://api.github.com/repos/test/sNews/git/commits{/sha}",
			"comments_url": "https://api.github.com/repos/test/sNews/comments{/number}",
			"issue_comment_url": "https://api.github.com/repos/test/sNews/issues/comments{/number}",
			"contents_url": "https://api.github.com/repos/test/sNews/contents/{+path}",
			"compare_url": "https://api.github.com/repos/test/sNews/compare/{base}...{head}",
			"merges_url": "https://api.github.com/repos/test/sNews/merges",
			"archive_url": "https://api.github.com/repos/test/sNews/{archive_format}{/ref}",
			"downloads_url": "https://api.github.com/repos/test/sNews/downloads",
			"issues_url": "https://api.github.com/repos/test/sNews/issues{/number}",
			"pulls_url": "https://api.github.com/repos/test/sNews/pulls{/number}",
			"milestones_url": "https://api.github.com/repos/test/sNews/milestones{/number}",
			"notifications_url": "https://api.github.com/repos/test/sNews/notifications{?since,all,participating}",
			"labels_url": "https://api.github.com/repos/test/sNews/labels{/name}",
			"releases_url": "https://api.github.com/repos/test/sNews/releases{/id}",
			"deployments_url": "https://api.github.com/repos/test/sNews/deployments",
			"created_at": "2010-11-27T07:02:22Z",
			"updated_at": "2013-08-18T15:55:36Z",
			"pushed_at": null,
			"git_url": "git://github.com/test/sNews.git",
			"ssh_url": "git@github.com:test/sNews.git",
			"clone_url": "https://github.com/test/sNews.git",
			"svn_url": "https://github.com/test/sNews",
			"homepage": "http://www.snewscms.com/",
			"size": 48,
			"stargazers_count": 1,
			"watchers_count": 1,
			"language": null,
			"has_issues": true,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 0,
			"mirror_url": null,
			"open_issues_count": 0,
			"forks": 0,
			"open_issues": 0,
			"watchers": 1,
			"default_branch": "master"
		},
		{
			"id": 11322620,
			"name": "Test--01",
			"full_name": "test/Test--01",
			"owner": {
				"login": "test",
				"id": 383316,
				"avatar_url": "https://avatars.githubusercontent.com/u/383316?v=3",
				"gravatar_id": "",
				"url": "https://api.github.com/users/test",
				"html_url": "https://github.com/test",
				"followers_url": "https://api.github.com/users/test/followers",
				"following_url": "https://api.github.com/users/test/following{/other_user}",
				"gists_url": "https://api.github.com/users/test/gists{/gist_id}",
				"starred_url": "https://api.github.com/users/test/starred{/owner}{/repo}",
				"subscriptions_url": "https://api.github.com/users/test/subscriptions",
				"organizations_url": "https://api.github.com/users/test/orgs",
				"repos_url": "https://api.github.com/users/test/repos",
				"events_url": "https://api.github.com/users/test/events{/privacy}",
				"received_events_url": "https://api.github.com/users/test/received_events",
				"type": "User",
				"site_admin": false
			},
			"private": false,
			"html_url": "https://github.com/test/Test--01",
			"description": null,
			"fork": false,
			"url": "https://api.github.com/repos/test/Test--01",
			"forks_url": "https://api.github.com/repos/test/Test--01/forks",
			"keys_url": "https://api.github.com/repos/test/Test--01/keys{/key_id}",
			"collaborators_url": "https://api.github.com/repos/test/Test--01/collaborators{/collaborator}",
			"teams_url": "https://api.github.com/repos/test/Test--01/teams",
			"hooks_url": "https://api.github.com/repos/test/Test--01/hooks",
			"issue_events_url": "https://api.github.com/repos/test/Test--01/issues/events{/number}",
			"events_url": "https://api.github.com/repos/test/Test--01/events",
			"assignees_url": "https://api.github.com/repos/test/Test--01/assignees{/user}",
			"branches_url": "https://api.github.com/repos/test/Test--01/branches{/branch}",
			"tags_url": "https://api.github.com/repos/test/Test--01/tags",
			"blobs_url": "https://api.github.com/repos/test/Test--01/git/blobs{/sha}",
			"git_tags_url": "https://api.github.com/repos/test/Test--01/git/tags{/sha}",
			"git_refs_url": "https://api.github.com/repos/test/Test--01/git/refs{/sha}",
			"trees_url": "https://api.github.com/repos/test/Test--01/git/trees{/sha}",
			"statuses_url": "https://api.github.com/repos/test/Test--01/statuses/{sha}",
			"languages_url": "https://api.github.com/repos/test/Test--01/languages",
			"stargazers_url": "https://api.github.com/repos/test/Test--01/stargazers",
			"contributors_url": "https://api.github.com/repos/test/Test--01/contributors",
			"subscribers_url": "https://api.github.com/repos/test/Test--01/subscribers",
			"subscription_url": "https://api.github.com/repos/test/Test--01/subscription",
			"commits_url": "https://api.github.com/repos/test/Test--01/commits{/sha}",
			"git_commits_url": "https://api.github.com/repos/test/Test--01/git/commits{/sha}",
			"comments_url": "https://api.github.com/repos/test/Test--01/comments{/number}",
			"issue_comment_url": "https://api.github.com/repos/test/Test--01/issues/comments{/number}",
			"contents_url": "https://api.github.com/repos/test/Test--01/contents/{+path}",
			"compare_url": "https://api.github.com/repos/test/Test--01/compare/{base}...{head}",
			"merges_url": "https://api.github.com/repos/test/Test--01/merges",
			"archive_url": "https://api.github.com/repos/test/Test--01/{archive_format}{/ref}",
			"downloads_url": "https://api.github.com/repos/test/Test--01/downloads",
			"issues_url": "https://api.github.com/repos/test/Test--01/issues{/number}",
			"pulls_url": "https://api.github.com/repos/test/Test--01/pulls{/number}",
			"milestones_url": "https://api.github.com/repos/test/Test--01/milestones{/number}",
			"notifications_url": "https://api.github.com/repos/test/Test--01/notifications{?since,all,participating}",
			"labels_url": "https://api.github.com/repos/test/Test--01/labels{/name}",
			"releases_url": "https://api.github.com/repos/test/Test--01/releases{/id}",
			"deployments_url": "https://api.github.com/repos/test/Test--01/deployments",
			"created_at": "2013-07-10T19:58:05Z",
			"updated_at": "2014-03-03T12:54:34Z",
			"pushed_at": "2013-07-19T09:03:22Z",
			"git_url": "git://github.com/test/Test--01.git",
			"ssh_url": "git@github.com:test/Test--01.git",
			"clone_url": "https://github.com/test/Test--01.git",
			"svn_url": "https://github.com/test/Test--01",
			"homepage": null,
			"size": 120,
			"stargazers_count": 0,
			"watchers_count": 0,
			"language": "Matlab",
			"has_issues": true,
			"has_downloads": true,
			"has_wiki": true,
			"has_pages": false,
			"forks_count": 0,
			"mirror_url": null,
			"open_issues_count": 0,
			"forks": 0,
			"open_issues": 0,
			"watchers": 0,
			"default_branch": "master"
		}
		];
		// jscs:disable maximumLineLength

		jasmine.Ajax.install();
	});

	afterEach(function() {
		jasmine.Ajax.uninstall();
	});

	it("URL is handed to XHR", function() {
		getGithub("http://localhost:8000/spec/responses/github_response.json", "test", false, function() {});
		var request = jasmine.Ajax.requests.mostRecent();

		expect(request.url).toBe("http://localhost:8000/spec/responses/github_response.json");
	});

	it("Handles XHR call", function() {
		var callback = jasmine.createSpy();
		getGithub("http://localhost:8000/spec/responses/github_response.json", "test", false, callback);

		var request = jasmine.Ajax.requests.mostRecent();
		request.respondWith({status: 200, responseText: JSON.stringify(this.response)});

		expect(callback).toHaveBeenCalled();
	});

	it("Handles empty response", function() {
		var callback = jasmine.createSpy();
		getGithub("http://localhost:8000/spec/responses/github_response.json", "test", false, callback);

		var request = jasmine.Ajax.requests.mostRecent();
		request.respondWith({status: 200, responseText: JSON.stringify([])});

		expect(callback).not.toHaveBeenCalled();
	});

	it("Handles no response", function() {
		var callback = jasmine.createSpy();
		getGithub("http://localhost:8000/spec/responses/github_response.json", "test", false, callback);

		expect(callback).not.toHaveBeenCalled();
	});
});
