import $ from "jquery";
import { CONSTANTS } from "./constants.js";

// Get Github URI based on username
export var getGithubUri = function(username) {
	// Return empty is username is empty
	if (username) {
		return "https://api.github.com/users/" + username + "/repos";
	} else {
		return CONSTANTS.EMPTY;
	}
};

// Go through Github array (Split to make testing easier)
export var filterGithubFork = function(repos, ownRepo, showForks) {
	var result = [];

	repos.forEach(function(value) {
		if (value &&
			(value.name !== ownRepo) &&
			(showForks === value.fork || !value.fork)) {
			result.push(value);
		}
	});

	return result;
};

// Get the Github information
export var getGithub = function(uri, username, showForks, callback) {
	var ownRepo = username.toLowerCase() + ".github.com";

	$.getJSON(uri, function(response) {
		// Run callback
		if (response && response.length > 0) {
			callback(filterGithubFork(response, ownRepo, showForks));
		}
	});
};

// Format Github response
export var formatGithub = function(repository, first) {
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
