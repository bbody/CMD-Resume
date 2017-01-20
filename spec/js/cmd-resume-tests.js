QUnit.module( "Helper function tests", {
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

QUnit.module( "Helper function tests", {
  beforeEach: function() {
    // prepare something for all following tests
  },
  afterEach: function() {
    // clean up after each test
  }
});

QUnit.test("Color is valid", function(assert){
	assert.ok(isValidColor("#FFF"));
	assert.ok(isValidColor("white"));
	assert.notOk(isValidColor("test"));
	assert.notOk(isValidColor(""));
	assert.notOk(isValidColor(null));
	assert.notOk(isValidColor());
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

QUnit.module( "Helper function tests", {
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

QUnit.module( "Helper function tests", {
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


QUnit.test("Github username", function(assert){
	assert.equal(getGithubUri("test"), "https://api.github.com/users/test/repos");
	assert.equal(getGithubUri(""), "");
	assert.equal(getGithubUri(null), "");
	assert.equal(getGithubUri(), "");
});

QUnit.module( "Helper function tests", {
  beforeEach: function() {
    // prepare something for all following tests
    self.response = [
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
  },
  afterEach: function() {
    // clean up after each test
  }
});

QUnit.test("Github without forks", function(assert){
	var result = filterGithubFork(self.response, "test.github.com", false);
	assert.equal(result.length, 4);
});

QUnit.test("Github with forks", function(assert){
	var result = filterGithubFork(self.response, "test.github.com", true);
	assert.equal(result.length, 5);
});
